import express from "express";

import { isAuth, adminRoute } from "../middleware/auth.middleware.js";
import {
    index,
    getFeaturedProducts,
    store,
    destroy,
    update,
    getRecommendedProduct,
    getCategory,
} from "../controller/products.controller.js";

const productsRoutes = express.Router();

// GET METHOD
productsRoutes.get("/", isAuth, adminRoute, index);
productsRoutes.get("/featured", getFeaturedProducts);
productsRoutes.get("/recommended", getRecommendedProduct);
productsRoutes.get("/category/:category", getCategory);

// POST METHOD
productsRoutes.post("/", isAuth, adminRoute, store);

// PATCH METHOD
productsRoutes.patch("/:id", isAuth, adminRoute, update);

// DELETE METHOD
productsRoutes.delete("/", isAuth, adminRoute, destroy);

export default productsRoutes;
