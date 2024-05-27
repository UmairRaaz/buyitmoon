// import { uploads } from "@/helpers/cloudinary";
import { uploads } from "@/helpers/cloudinary";
import { connect } from "@/helpers/dbConfig";
import { Product } from "@/models/productModel";
import { NextResponse, NextRequest } from "next/server";
connect()
export async function POST(NextRequest) {
    try {
        const formData = await NextRequest.formData();
        const productData = {
            productName: formData.get("productName"),
            productDescription: formData.get("productDescription"),
            productCategory: formData.get("productCategory"),
            productPrice: formData.get("productPrice"),
            productFor: formData.get("productFor"),
            productRating: formData.get("productRating"),
        };
        const image = formData.get("productImage");

        const uploadedImage = await uploads(image, "products-image")

        // console.log(uploadedImage)

        const productSaved = new Product({
            productName: productData.productName,
            productDescription: productData.productDescription,
            productImage: uploadedImage.secure_url,
            productPrice: productData.productPrice,
            productCategory: productData.productCategory,
            productFor: productData.productFor,
            productRating: productData.productRating,
        });

        await productSaved.save()
        console.log(productSaved)
        return NextResponse.json({ message: "product uploaded successfully", success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error, success: false }, { status: 400 })
    }
}
