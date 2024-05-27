import { uploads } from "@/helpers/cloudinary";
import { connect } from "@/helpers/dbConfig";
import { Product } from "@/models/productModel";
import { NextResponse } from "next/server";

connect();


export async function PUT(req, { params }) {
    try {
        const formData = await req.formData();
        const productData = {
            productName: formData.get("productName"),
            productDescription: formData.get("productDescription"),
            productCategory: formData.get("productCategory"),
            productPrice: formData.get("productPrice"),
            productFor: formData.get("productFor"),
            productRating: formData.get("productRating"),
        };
        const image = formData.get("productImage");
        console.log(image instanceof Object)
        let imageLink;
        if (image instanceof Object) {
                const uploadedImage = await uploads(image, "products-image");
                console.log(uploadedImage)
                imageLink = uploadedImage.secure_url
        }else{
            imageLink = image;
        }
        console.log(imageLink)
        const updatedProduct = await Product.findByIdAndUpdate(
            params.id,
            {
                ...productData,
                productImage: imageLink,
            },
            { new: true }
        );

        await updatedProduct.save()
        console.log(updatedProduct)
        return NextResponse.json({ message: "product edited successfully", success: true }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message, success: false }, { status: 400 });
    }
}
