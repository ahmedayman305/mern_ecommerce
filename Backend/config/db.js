import mongoose from "mongoose";
import ENV from "./global.js";

const DBconnect = async () => {
    try {
        await mongoose.connect(ENV.dbLink);
        console.log("DB connected...");
    } catch (error) {
        console.log(error);
    }
};

export default DBconnect;
