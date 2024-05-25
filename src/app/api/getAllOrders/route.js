import { connect } from "@/helpers/dbConfig";
import { Order } from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(NextRequest){
    try {
        const orders = await Order.find({})
        // console.log(data)
        if(!orders){
             return NextResponse.json({message: "product doesnot found",orders : [], success : false, status : 400})
        }
        return NextResponse.json({message: "products fetched successfully", orders : orders, success : true, status : 200})
    } catch (error) {
        return NextResponse.json({error: error.message, success : false, status : 400})
    }
}