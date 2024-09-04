//  init express function
import express from "express";

// import global function
import ENV from "./config/global.js";

// database connection function
import DBconnect from "./config/db.js";

// import global middleware
import cookieParser from "cookie-parser";

// routes
import authRoutes from "./routes/auth.route.js";
import productsRoutes from "./routes/products.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";

// init app
const app = express();

// use global middlewares
app.use(express.json());
app.use(cookieParser());

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cart", couponRoutes);

// error middleware
app.use((err, req, res, next) => {
    const statuesCode = err.statuesCode || 500;
    const message = err.message || "INTERNAL SERVER ERROR";
    res.status(statuesCode).json({
        success: false,
        message,
        statuesCode,
    });
});

// run sever
app.listen(ENV.port, async () => {
    await DBconnect();
    console.log("working on port -> " + ENV.port);
});
