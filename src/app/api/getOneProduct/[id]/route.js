import { connect } from "@/helpers/dbConfig";
import { Product } from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req, {params}) {
    try {
        const id = params.id;
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ message: "product not found",  success: false }, { status: 400 });
        }
        return NextResponse.json({ message: "user found successfully", product : product, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 400 });
    }
}
