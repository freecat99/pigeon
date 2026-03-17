import mongoose from "mongoose";
import { config } from 'dotenv';
config();

export const connectDB = async() => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGODBURL);
        console.log("DB connected successfully", conn.connection.host);

    } catch (error) {
        console.log("Error in connecting with DB", error);
    }
}