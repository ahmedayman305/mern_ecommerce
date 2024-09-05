import Stripe from "stripe";
import ENV from "./global.js";

export const stripe = new Stripe(ENV.stripeSecret);
