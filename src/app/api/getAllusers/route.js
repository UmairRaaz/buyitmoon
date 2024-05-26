import { connect } from "@/helpers/dbConfig";
import { Customer } from "@/models/customerModel";
import { Order } from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function POST(req){
    try {
        const {params} = await req.json(); 
        const { startDate, endDate } = params; 
        const customer = await Customer.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate) 
                    }
                }
            }
        ]);
        // console.log(customer)
        if(!customer){
             return NextResponse.json({message: "customer doesnot found",customer : [], success : false, status : 400})
        }
        return NextResponse.json({message: "products fetched successfully", customer : customer, success : true, status : 200})
    } catch (error) {
        return NextResponse.json({error: error.message, success : false, status : 400})
    }
}