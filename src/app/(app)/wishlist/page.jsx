"use client";
import React, { useContext } from "react";
import ProductComponent from "../../components/ProductComponent";
import ProductContext from "@/context/ProductContext";
import Image from "next/image";

const ProductPage = () => {
  const { wishlist } = useContext(ProductContext);

  if (wishlist.length <= 0) {
    return (
      <div className="h-screen w-full flex items-center flex-col  ">
        <div className="px-4 md:px-0 md:mt-24 mt-24">
          <Image src={"/emptywish.png"} alt="WishListImage" width={400} height={400} />
          <h1 className="md:text-xl text-md px-4 md:px-0 text-center mt-4"> Empty WishList Please Add Some Products</h1>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-[50vh] mt-10 my-10 w-full md:w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold my-4 text-gray-700 text-center">Your WishList</h1>
      <div className="grid grid-cols-1 place-items-center place-content-center  gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {
          wishlist.map((product, index) => (
            <ProductComponent
              key={index}
              productImage={product.productImage}
              productName={product.productName}
              productPrice={product.productPrice}
              productId={product._id}
              productRating={product.productRating}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ProductPage;
