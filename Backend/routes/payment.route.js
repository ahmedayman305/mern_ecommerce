import express from "express";
import {createCheckoutSession} from "../controller/payment.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const paymentRoutes = express.Router();

paymentRoutes.get("/create-checkout-session", isAuth, createCheckoutSession);

export default paymentRoutes;
