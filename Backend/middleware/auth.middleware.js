import jwt from "jsonwebtoken";
import ENV from "../config/global.js";
import User from "../models/user.model.js";
import { throwError } from "../utils/utils.js";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return next(throwError(401, "No token provided"));

        const decoded = jwt.verify(token, ENV.jwt_secret);

        const foundUser = await User.findById(decoded.id);

        if (!foundUser) return next(throwError(401, "User not found"));

        req.user = foundUser;

        next();
    } catch (err) {
        next(throwError(401, "Token verification failed"));
    }
};

export const adminRoute = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return next(throwError(403, "Access denied: Admins only"));
        }
        next();
    } catch (error) {
        next(error);
    }
};
