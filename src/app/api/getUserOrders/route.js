import { connect } from "@/helpers/dbConfig";
import { Order } from "@/models/orderModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const { userEmail } = await req.json();
        console.log(userEmail)
        const orders = await Order.find({
            "customer.email": userEmail,
            orderStatus: "pending"
        });
        console.log(orders)
        return NextResponse.json({ message : "orders fetched successfully", orders: orders, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 400 });
    }
}
