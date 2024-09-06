import express from "express";
import {
    createCheckoutSession,
    checkSuccess,
} from "../controller/payment.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-checkout-session", isAuth, createCheckoutSession);
paymentRoutes.post("/checkout-success", isAuth, checkSuccess);

export default paymentRoutes;
