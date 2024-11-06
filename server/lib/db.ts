import * as mongoose from "mongoose";
import "dotenv/config"

const MONGO_URI = process.env.MONGO_URI as string;

export  const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to database")
    }
    catch (error: any | Error) {
        throw new Error(error)
    }
}

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect()
        console.log("Disconnected from database")
    }
    catch (error: any | Error) {
        throw new Error(error)
    }
}