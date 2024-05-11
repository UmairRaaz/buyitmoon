import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    customerName : {
        type: String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    customerPhone : {
        type : String,
    },
    customerAddress : {
        type : String,
    },
    isAdmin : {
        type : Boolean,
        default: false,
    }
}, {timestamps: true})

export const Customer = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema)