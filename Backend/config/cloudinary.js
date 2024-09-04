import { v2 as cloudinary } from "cloudinary";
import ENV from "./global.js";

export default cloudinary.config({
    cloud_name: ENV.cloudinaryCloudName,
    api_key: ENV.cloudinaryCloudKey,
    api_secret: ENV.cloudinaryCloudSecret,
});
