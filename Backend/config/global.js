import dotenv from "dotenv";
dotenv.config();

const ENV = {
    port: process.env.PORT,
    dbLink: process.env.DB,
    jwt_secret: process.env.JWT_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryCloudKey: process.env.CLOUDINARY_CLOUD_KEY,
    cloudinaryCloudSecret: process.env.CLOUDINARY_CLOUD_SECRET,
    stripeSecret: process.env.STRIPE_SECRET_KEY,
    clientUrl: process.env.CLIENT_URL,
};

export default ENV;
