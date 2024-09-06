import { throwError } from "../utils/utils.js";
import { stripe } from "../config/stripe.js";
import Coupon from "../models/coupon.model.js";
import ENV from "../config/global.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res, next) => {
    try {
        const { products, couponCode } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return next(throwError(400, "Invalid or empty product array"));
        }

        let totalAmount = 0;

        // Generate line items and calculate total amount
        const lineItems = products.map((product) => {
            const amount = Math.round(product.price * 100); // Convert price to cents
            totalAmount += amount * (product.quantity || 1); // Multiply by quantity

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount,
                },
                quantity: product.quantity || 1, // Ensure there's always a quantity
            };
        });

        let coupon = null;
        // Find and apply coupon
        if (couponCode) {
            coupon = await Coupon.findOne({
                code: couponCode,
                userId: req.user._id,
                isActive: true,
            });

            if (coupon) {
                totalAmount -= Math.round(
                    (totalAmount * coupon.discountPercentage) / 100
                );
            }
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${ENV.clientUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ENV.clientUrl}/purchase-cancel`,
            discounts: coupon
                ? [
                      {
                          coupon: await createStripeCoupon(
                              coupon.discountPercentage
                          ),
                      },
                  ]
                : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
                products: JSON.stringify(
                    products.map((p) => ({
                        id: p._id,
                        quantity: p.quantity,
                        price: p.price,
                    }))
                ),
            },
        });

        // Create new coupon for future use if totalAmount >= $200 (20000 cents)
        if (totalAmount >= 20000) {
            await createNewCoupon(req.user._id);
        }

        // Respond with session details
        res.status(200).json({
            id: session.id,
            totalAmount: totalAmount / 100, // Convert back to dollars
        });
    } catch (error) {
        next(error);
    }
};

export const checkSuccess = async () => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === "paid") {
            if (session.metadata.couponCode) {
                await Coupon.findByIdAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId: session.metadata.userId,
                    },
                    {
                        isActive: false,
                    }
                );
            }

            const products = JSON.parse(session.metadata.products);

            const order = new Order({
                user: session.metadata.userId,
                products: products.map((product) => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price,
                })),
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId,
            });
            await order.save();

            res.status(200).json({
                success: true,
                message:
                    "Payment successful, order created, and coupon deactivated if used.",
                orderId: newOrder._id,
            });
        }
    } catch (error) {
        next(error);
    }
};

// Function to create a new Stripe coupon
const createStripeCoupon = async (discountPercentage) => {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    });
    return coupon.id;
};

// Function to create a new coupon for the user
const createNewCoupon = async (userId) => {
    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        userId,
    });

    await newCoupon.save();

    return newCoupon;
};
