import express from "express";
import { isAuth } from "../middleware/auth.middleware.js";
import { show, validateCode } from "../controller/coupon.contoller.js";

const couponRoutes = express.Router();

couponRoutes.get("/", isAuth, show);
couponRoutes.get("/validate", isAuth, validateCode);

export default couponRoutes;
