import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected")
    } catch (error) {
        console.log(error.message)
        // process.exit(1)
    }
}