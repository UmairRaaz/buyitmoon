import { connect } from "@/helpers/dbConfig";
import { Product } from "@/models/productModel";
import {NextRequest, NextResponse } from "next/server";


export async function DELETE(request, { params }){
    try {
        await connect()
        const id = params.id
        const response = await Product.findOneAndDelete({_id : id})
        // console.log(response)
        return NextResponse.json(
            {
              success: true,
              message: "Product Deleted Successfully",
            },
            { status: 200 }
          );
    } catch (error) {
        return NextResponse.json(
            {
              success: false,
              message: "Product not Deleted",
            },
            { status: 401 }
          );
    }
}