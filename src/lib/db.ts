import mongoose from "mongoose";

export default async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("DB Connected!");
        return true;
    } catch (error) {
        console.log(error);
    }
}
