import bcrypt from 'bcrypt';
import User from "../models/users.js"
import jwt from "jsonwebtoken";

import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import { sendTokenCookies, clearTokenCookies } from '../utils/tokenCookies.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            status: false,
            message: 'Name, email and password are required.',
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            status: false,
            message: 'Email is already registered.',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();
    sendTokenCookies(res, refreshToken);

    return res.status(201).json({
        success: true,
        message: "Registration successful",
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();
    sendTokenCookies(res, refreshToken);

    return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
}

const getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};

const logout = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;
    if (incomingRefreshToken) {
        const decoded = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        await User.findByIdAndUpdate(decoded.id, {
            refreshToken: null,
        });
    }

    clearTokenCookies(res);
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;
    if (!incomingRefreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token missing",
        });
    }

    const decoded = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);
    if (!user) {
        clearTokenCookies(res);
        return res.status(401).json({
            success: false,
            message: "User not found",
        });
    }

    if (user.refreshToken !== incomingRefreshToken) {
        clearTokenCookies(res);
        return res.status(401).json({
            success: false,
            message: "Invalid refresh token",
        });
    }

    const newAccessToken = generateAccessToken(user._id);
    return res.status(200).json({
        success: true,
        message: "Access token refreshed",
        accessToken: newAccessToken,
    });
}

export { register, login, getMe, logout, refreshAccessToken };