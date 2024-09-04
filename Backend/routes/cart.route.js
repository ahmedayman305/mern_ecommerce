import express from "express";
import {
    store,
    destroy,
    update,
    index,
} from "../controller/cart.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

const cartRoutes = express.Router();

// GET METHOD
cartRoutes.get("/", isAuth, index);

// POST METHOD
cartRoutes.post("/", isAuth, store);

// DELETE METHOD
cartRoutes.delete("/", isAuth, destroy);

// PATCH METHOD
cartRoutes.patch("/:id", isAuth, update);

export default cartRoutes;
