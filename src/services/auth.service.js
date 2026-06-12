import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";

const registerUser = async ({ name, email, password }) => {
    const existing = await User.findOne({ email });
    if (existing) {
        const error = new Error("Email is already registered.");
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
};

const logoutUser = async (refreshToken) => {
    if (!refreshToken) return;

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await User.findByIdAndUpdate(decoded.id, { refreshToken: null });
};

const refreshToken = async (refreshToken) => {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 401;
        throw error;
    }

    if (user.refreshToken !== refreshToken) {
        const error = new Error("Invalid refresh token");
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken(user._id);
    return { accessToken };
};

export { registerUser, loginUser, logoutUser, refreshToken };
