"use client";
import ProductContext from "@/context/ProductContext";
import React, { useContext, useState } from "react";
import Link from "next/link";
import CartProducts from "../../components/CartProducts";
import Image from "next/image";
const WishListPage = () => {
  const { cart, cartItem } = useContext(ProductContext);
  console.log(cartItem);
  const totalPrice = cartItem.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  if (cart.length <= 0) {
    return (
      <div className="h-screen w-full flex items-center flex-col  ">
        <div className="px-4 md:px-0">
          <Image src={"/emptyCart.png"} alt="emptyCart" width={400} height={400} />
          <h1 className="md:text-xl text-md px-4 md:px-0 text-center mt-4"> Empty Cart Please Add Some Products</h1>
        </div>
      </div>
    )
  }
  return (
    <div className="mt-10 w-[80%] mx-auto">
      <div className=" flex md:flex-row flex-col gap-8">
        <div className="md:w-[65%] bg-[#FFF7F1] rounded-md shadow-xl p-5">
          {cart.map((cartItem, index) => (
            <CartProducts
              key={index}
              productId={cartItem._id}
              productName={cartItem.productName}
              productImage={cartItem.productImage}
              productPrice={cartItem.productPrice}
            />
          ))}
        </div>
        <div className="md:w-[35%]  bg-[#FFF7F1] shadow-lg rounded-md text-gray-700 px-8 py-4">
          <div>
            <h1 className="text-xl font-semibold">Price Details </h1>

            {cartItem.map((item, index) => (
              <div
                key={index}
                className="w-full flex md:flex-row flex-col justify-between mt-4"
              >
                <span>
                  {item.name} ({item.quantity}) item
                </span>
                <span className="font-semibold">
                  Rs {item.price * item.quantity}
                </span>
              </div>
            ))}

            <div className="my-8 bg-gray-300 h-[1px]"></div>

            <div className="w-full flex justify-between items-center mt-4">
              <span>Total</span>
              <span className="font-semibold">{totalPrice}</span>
            </div>

            <button className="bg-gray-700 text-sm text-white rounded-2xl mt-8 px-4 py-1">
              <Link href={"/checkout"}>Proccedd to Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
