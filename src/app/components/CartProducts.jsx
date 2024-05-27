"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductComponent from "./ProductComponent";
import Image from "next/image";
import { GrSubtractCircle } from "react-icons/gr";
import { MdAddCircleOutline } from "react-icons/md";
import { TbTagStarred } from "react-icons/tb";
import ProductContext from "@/context/ProductContext";
import toast from "react-hot-toast";

const CartProducts = ({
  productId,
  productName,
  productImage,
  productPrice,
}) => {
  const {
    productData,
    wishlist,
    setWishlist,
    cartItem,
    setCartItem,
    cart,
    setCart,
  } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);

  const handleWishList = (id) => {
    const productToAdd = productData.find(
      (product) => product?._id === productId
    );
    setWishlist((prev) => [...prev, productToAdd]);
    toast("Added To WishList", { icon: '❤️' })

  };
  const handleRemoveWishList = (id) => {
    setWishlist((prev) => prev.filter((product) => product?._id !== id));
    toast("Removed From WishList", { icon: '❌' })
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((product) => product?._id !== id));
    setCartItem((prev) => prev.filter((product) => product.id !== id));
    toast("Removed From Cart", { icon: '❌' })
  };
  const isInWishlist = wishlist.some(
    (wishProduct) => wishProduct?._id === productId
  );
  useEffect(() => {
    const initialCartItem = [];
    cart.forEach((cartProduct) => {
      initialCartItem.push({
        id: cartProduct?._id,
        price: cartProduct.productPrice,
        name: cartProduct.productName,
        image: cartProduct.productImage,
        quantity: 1, // Default quantity of 1 for each item
      });
    });

    setCartItem(initialCartItem);
  }, []);
  const increaseQuantity = (id) => {
    setQuantity((prev) => prev + 1);
    setCartItem((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseQuantity = (id) => {
    if (quantity <= 1) {
      return handleRemoveFromCart(id);
    }
    setQuantity((prev) => prev - 1);
    setCartItem((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  return (
    <div className="border my-4 bg-white py-4 shadow-lg rounded-md">
      <div className="px-4 py-1  ">

        <div className="w-full gap-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-14 place-content-center place-items-center ">
          <div className="sm:flex sm:items-center sm:justify-center">
            <Image
              src={productImage}
              width={100}
              height={100}
              alt="image"
              className="rounded-md"
            />
          </div>
          <div className="md:row-span-1">
            <div className="w-full">
              <h1 className="font-semibold md:text-left text-center">{productName}</h1>
              <div className="flex items-center justify-center gap-4 mt-2 md:mt-2 ">
                <span>Quantity: </span>
                <div className="flex gap-1 items-center">
                  <MdAddCircleOutline
                    className="cursor-pointer"
                    size={20}
                    onClick={() => increaseQuantity(productId)}
                  />
                  <input
                    type="text"
                    readOnly
                    value={quantity}
                    className="w-8 bg-gray-300 text-center"
                  />
                  <GrSubtractCircle
                    className="cursor-pointer"
                    size={20}
                    onClick={() => decreaseQuantity(productId)}
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-4 md:mt-2  gap-2 items-center ">
              <button
                onClick={() => handleRemoveFromCart(productId)}
                className="border border-gray-400 text-gray-600 whitespace-nowrap rounded-2xl px-2 py-1 text-sm"
              >
                Remove From Cart
              </button>
              <div className="cursor-pointer">
                {isInWishlist ? (
                  // If product is in wishlist, show filled star icon
                  <TbTagStarred
                    onClick={() => handleRemoveWishList(productId)}
                    size={25}
                    className="text-yellow-700"
                  />
                ) : (
                  // If product is not in wishlist, show empty star icon
                  <TbTagStarred
                    onClick={() => handleWishList(productId)}
                    size={25}
                    className="text-gray-700"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="font-semibold underline">
            <h1>Rs: {quantity * productPrice}</h1>
          </div>
        </div>


      </div>
    </div>
  );
};

export default CartProducts;
