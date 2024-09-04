import jwt from "jsonwebtoken";
import ENV from "../config/global.js";

export const generateToken = (res, id) => {
    const token = jwt.sign({ id }, ENV.jwt_secret, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    return token;
};

export const throwError = (code, msg) => {
    const err = new Error(msg);
    err.statuesCode = code;
    return err;
};
