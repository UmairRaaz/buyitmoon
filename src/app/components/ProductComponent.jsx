"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { TbTagStarred } from "react-icons/tb";
import ProductContext from "@/context/ProductContext";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const ProductComponent = ({
  productId,
  productImage,
  productName,
  productPrice,
  productRating,
}) => {
  const { productData, wishlist, setWishlist, cart, setCart } =
    useContext(ProductContext);
  const router = useRouter()
  const handleWishList = (id) => {
    const productToAdd = productData.find(
      (product) => product?._id === productId
    );
    setWishlist((prev) => [...prev, productToAdd]);
    toast("Added To WishList", { icon: '❤️' })
  };
  // window.localStorage.setItem("wishlist", JSON.stringify(wishlist))
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  const handleAddToCart = (id) => {
    const productToAdd = productData.find(
      (product) => product?._id === productId
    );
    setCart((prev) => [...prev, productToAdd]);
    toast("Added To Cart", { icon: '🛒' })
  };
  const handleRemoveWishList = (id) => {
    setWishlist((prev) => prev.filter((product) => product?._id !== id));
    toast("Removed From WishList", { icon: '❌' })
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((product) => product?._id !== id));
  };
  window.localStorage.setItem("cart", JSON.stringify(cart))
  const isInWishlist = wishlist.some(
    (wishProduct) => wishProduct?._id === productId
  );
  const isInCartList = cart.some(
    (wishProduct) => wishProduct?._id === productId
  );
  return (
    <div className=" w-64 shadow-xl rounded-2xl flex flex-col"
      onClick={() => router.push(`/product/${productId}`)}
    >
      <div className="w-full">
        <Image
          src={productImage}
          alt="product-image"
          width={100}
          height={50} // Decrease the height here
          className="w-full rounded-t-2xl"
        />
      </div>
      <div className="mt-2 px-4">
        <div className="flex justify-between items-center">
          <h1 className="my-1 text-xl">{productName}</h1>
          <p>Rs.{productPrice}</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold">{productRating}</span>
          <span>
            <IoIosStar className="text-yellow-900" />
          </span>
          <span className="text-sm text-gray-700">Rating</span>
        </div>
        <p className="text-md">Company</p>
      </div>
      <div className="flex justify-between mx-6  mt-4 py-4 border-t border-gray-400">
        {isInCartList ? (
          // If product is in cart, show go to cart
          <Link href={"/cart"}>
            <button

              className="border border-black rounded-2xl px-2 py-1"
            >
              Go to Cart
            </button>
          </Link>

        ) : (
          // If product is not in cart, show add to cart
          <button
            onClick={() => handleAddToCart(productId)}
            className="border border-black rounded-2xl px-2 py-1"
          >
            Add to Cart
          </button>
        )}

        <div className="cursor-pointer">
          {isInWishlist ? (
            // If product is in wishlist, show filled star icon
            <TbTagStarred
              onClick={() => handleRemoveWishList(productId)}
              size={30}
              className="text-yellow-700"
            />
          ) : (
            // If product is not in wishlist, show empty star icon
            <TbTagStarred
              onClick={() => handleWishList(productId)}
              size={30}
              className="text-gray-700"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
