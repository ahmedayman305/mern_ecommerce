import Coupon from "../models/coupon.model.js";
import { throwError } from "../utils/utils.js";

// GET COUPON BY ID
export const show = async (req, res, next) => {
    try {
        const coupon = await Coupon.findOne({
            userId: req.user._id,
            isActive: true,
        });
        res.json(coupon || null);
    } catch (error) {
        next(error);
    }
};

// CHECK IF COUPON VALID
export const validateCode = async (req, res, next) => {
    try {
        const { code } = req.body;
        const foundCoupon = await Coupon.findOne({
            code: code,
            isActive: true,
        });

        if (!foundCoupon) next(throwError(404, "coupon not found"));

        if (foundCoupon.expirationDate < Date.now()) {
            foundCoupon.isActive = false;
            await foundCoupon.save();
            next(throwError(404, "coupon expired"));
        }

        res.json({
            message: "coupon is valid",
            code: foundCoupon.code,
            discountPercentage: foundCoupon.discountPercentage,
        });
    } catch (error) {
        next(error);
    }
};
