import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { clearTokenCookies } from "../utils/tokenCookies.js";

const protect = async (req, res, next) => {
    let accessToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        accessToken = req.headers.authorization.split(" ")[1];
    }

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Access token missing",
        });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found",
        });
    }

    req.user = user;
    next();
}

export { protect };