import { throwError } from "../utils/utils.js";

export const createCheckoutSession = async (req, res, next) => {
    try {
        const { products, couponCode } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            next(throwError(400, "invalid or empty product array"));
        }

        let totalAmoount = 0;

        const lineItems = products.map((proudct) => {
            const amount = Math.round(product.price * 100);
            totalAmoount += amount * products.quantity;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount,
                },
                quantity: product.quantity || 1,
            };
        });

        let coupon = null;
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
    } catch (error) {
        next(error);
    }
};
