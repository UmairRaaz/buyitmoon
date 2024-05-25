import mongoose from "mongoose";

const SupportModel = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    customerName : {
        type: String,
        required: true,
    },
    customerEmail : {
        type: String,
        required: true,
    },
    customerMessage: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const Support = mongoose.models.Support || mongoose.model("Support", SupportModel)