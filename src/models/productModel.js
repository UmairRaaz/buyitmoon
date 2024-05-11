import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true,
    },
    productDescription : {
        type : String,
        required : true,
    },
    productImage : {
        type : String,
        required : true,
    },
    productPrice : {
        type : Number,
        required : true,
    },
    productCategory : {
        type : String,
        required : true,
    },
    productAvailability : {
        type : Boolean,
        required : true,
        default : true,
    },
    productFor : {
        type : String,
        required: true
    },
    productRating: {
        type : Number,
    }

},{timestamps: true})

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)