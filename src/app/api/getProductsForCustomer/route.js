import { connect } from "@/helpers/dbConfig";
import { Product } from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect()
export async function GET(req) {
    try {
       
        const products = await Product.find({})
        console.log(products)
        if (!products) {
            return NextResponse.json({ message: "product doesnot found", products: [], success: false, status: 400 })
        }
        return NextResponse.json({ message: "products fetched successfully", products: products, success: true, status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false, status: 400 })
    }
}