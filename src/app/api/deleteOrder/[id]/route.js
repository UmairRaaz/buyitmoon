import { connect } from "@/helpers/dbConfig";
import { Order } from "@/models/orderModel";
import {NextRequest, NextResponse } from "next/server";


export async function DELETE(request, { params }){
    try {
        await connect()
        const id = params.id
        const response = await Order.findOneAndDelete({_id : id})
        // console.log(response)
        return NextResponse.json(
            {
              success: true,
              message: "Order Deleted Successfully",
            },
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json(
            {
              success: false,
              message: "Order not deleted",
            },
            { status: 401 }
          );
    }
}