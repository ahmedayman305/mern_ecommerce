import express from "express";
import { checkAuth, signIn, signUp } from "../controller/auth.controller.js";

import { isAuth } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up", signUp);
authRoutes.post("/sign-in", signIn);
authRoutes.get("/check-auth", isAuth, checkAuth);

export default authRoutes;
