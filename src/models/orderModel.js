import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer: {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    products: [{
        id: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        productCategory: {
            type: String,
            required: true,
        },
        productFor: {
            type: String,
            required: true
        },
    }],
    totalBill: {
        type: Number,
        required: true
    },
    deliveryCharges: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'pending'
    }
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
