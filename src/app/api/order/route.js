const { connect } = require("@/helpers/dbConfig");
const { Order } = require("@/models/orderModel");
import { NextRequest, NextResponse } from "next/server";
connect()

export async function POST(req){
    try {
        const orderBody = await req.json()
        // console.log("order", orderBody)
        const sanitizedCartItems = orderBody.cartItem.map(item => {
            const {  ...rest } = item; 
            return rest; 
        });
        console.log("order",sanitizedCartItems)
        const sanitizedOrderBody = {
            customer: orderBody.customerData,
            products: sanitizedCartItems,
            totalBill: orderBody.totalPrice,
            deliveryCharges: 0,
        };
        console.log(sanitizedOrderBody)
        const newOrder = await Order.create(sanitizedOrderBody) 
        // console.log(newOrder)
        return NextResponse.json({message : "order placed successfully",  success : true}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : error.message, success : false },{status: 500})
    }
}


export async function GET(){
    try {
        const allOrder = await Order.find({})
        const newIds = [];
        allOrder.forEach((order) => {
          order.products.forEach((product) => {
            newIds.push(product);
          });
        });
        return NextResponse.json({message : "ordered products fetched successfully", success: true, newIds })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({error : error.message, success : false}, {status: 500})
    }
}