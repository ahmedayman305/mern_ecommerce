import User from "../models/user.model.js";
import { generateToken, throwError } from "../utils/utils.js";

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(throwError(400, "All fields are required"));
        }

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return next(throwError(404, "User not found"));
        }

        const isPasswordMatch = await foundUser.comparePassword(password);

        if (!isPasswordMatch) {
            return next(throwError(401, "Incorrect password"));
        }

        const token = generateToken(res, foundUser._id);

        res.status(200).json({
            message: "User signed in successfully",
            user: foundUser,
        });
    } catch (error) {
        next(error);
    }
};

export const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(throwError(400, "All fields are required"));
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return next(throwError(409, "Email already Taken"));
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });

        generateToken(res, newUser._id);

        res.status(201).json({
            newUser,
            message: "User created successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const checkAuth = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
};
