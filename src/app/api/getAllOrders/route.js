import { connect } from "@/helpers/dbConfig";
import { Order } from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(req){
    try {
        const {params} = await req.json(); 
        const { startDate, endDate } = params; 
        const orders = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate) 
                    }
                }
            }
        ]);
        if(!orders){
             return NextResponse.json({message: "product doesnot found",orders : [], success : false, status : 400})
        }
        return NextResponse.json({message: "products fetched successfully", orders : orders, success : true, status : 200})
    } catch (error) {
        return NextResponse.json({error: error.message, success : false, status : 400})
    }
}