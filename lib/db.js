import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/smaller";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;