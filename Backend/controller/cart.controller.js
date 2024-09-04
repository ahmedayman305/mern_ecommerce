import { throwError } from "../utils/utils.js";
import Product from "../models/product.model.js";

// GET METHOD
export const index = async (req, res, next) => {
    try {
        const products = await Product.find({
            _id: { $in: req.user.cartItems },
        });

        // add quantity for each product
        const cartItems = products.map((product) => {
            const item = req.user.cartItems.find(
                (cartItem) => cartItem.id === product.id
            );
            return { ...product.toJSON(), quantity: item.quantity };
        });

        res.json(cartItems);
    } catch (error) {
        next(error);
    }
};

// POST METHOD
export const store = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(
            (item) => item.productId === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push({ productId, quantity: 1 });
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        next(error);
    }
};

// DELETE METHOD
export const destroy = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter(
                (item) => item.id !== productId
            );
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        next(error);
    }
};

// PATCH METHOD
export const update = async (req, res, next) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find(
            (item) => item.id === productId
        );

        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter(
                    (item) => item.id !== productId
                );
                await user.save();
                return res.json({
                    cart: user.cartItems,
                    message: "updated...",
                });
            }
            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        } else {
            next(throwError(404, "Product not found"));
        }
    } catch (error) {
        next(error);
    }
};
