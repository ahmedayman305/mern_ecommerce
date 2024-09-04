import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";
import { throwError } from "../utils/utils.js";

// GET METHOD
export const index = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json({ products });
    } catch (error) {
        next(error);
    }
};

export const getFeaturedProducts = async (req, res, next) => {
    try {
        const featuredProducts = await Product.find({
            isFeatured: true,
        }).lean();

        if (!featuredProducts) res.json({ message: "no featured Products" });

        res.json({ featuredProducts });
    } catch (error) {
        next(error);
    }
};

export const getRecommendedProduct = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                },
            },
        ]);

        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const getCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        if (!products || products.length < 1)
            next(throwError(404, "not found"));
        res.status(201).json(products);
    } catch (error) {
        next(error);
    }
};

// POST METHOD
export const store = async (req, res, next) => {
    try {
        const { name, description, image, category, price } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, {
                folder: "products",
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse.scure_url
                ? cloudinaryResponse.scure_url
                : "",
            category,
        });

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// PATCH METHOD
export const update = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) next(throwError(404, "not found"));
        product.isFeatured = !product.isFeatured;
        await product.save();
        res.status(201).json({ message: "updated..." });
    } catch (error) {
        next(error);
    }
};

// DELETE METHOD
export const destroy = async (req, res, next) => {
    try {
        const foundProduct = await Product.findById(req.params.id);

        if (!foundProduct) return next(throwError(404, "Product not found"));

        if (foundProduct.image) {
            const publicId = foundProduct.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
            } catch (error) {
                next(error);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        next(error);
    }
};
