'use client'

import ProductContext from "@/context/ProductContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosStar } from "react-icons/io";
import { TbTagStarred } from "react-icons/tb";

const ProductDetails = ({ params }) => {
    const [product, setproduct] = useState(null)
    const [firstSelection, setFirstSelection] = useState('');
    const [secondSelection, setSecondSelection] = useState('');

    const { productData, wishlist, setWishlist, cart, setCart } =
        useContext(ProductContext);
    const id = params.id.toString();
    const getProductDetails = async (id) => {
        const response = await axios.get(`/api/getOneProduct/${id}`)
        setproduct(response.data.product)
        console.log(response.data.product)
    }

    const handleWishList = (id) => {
        const productToAdd = productData.find(
            (prod) => prod?._id === product._id
        );
        setWishlist((prev) => [...prev, productToAdd]);
        toast("Added To WishList", { icon: '❤️' })
    };
    // window.localStorage.setItem("wishlist", JSON.stringify(wishlist))
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    const handleAddToCart = (id) => {
        const productToAdd = productData.find(
            (prod) => prod?._id === product._id
        );
        setCart((prev) => [...prev, productToAdd]);
        toast("Added To Cart", { icon: '🛒' })
    };
    const handleRemoveWishList = (id) => {
        setWishlist((prev) => prev.filter((product) => product?._id !== id));
        toast("Removed From WishList", { icon: '❌' })
    };

    window.localStorage.setItem("cart", JSON.stringify(cart))
    const isInWishlist = wishlist.some(
        (prod) => prod?._id === product._id
    );
    const isInCartList = cart.some(
        (prod) => prod?._id === product._id
    );


   
    useEffect(() => {
        getProductDetails(id)
    }, [id])
    if (!product) {
        return <div className="h-screen w-full fex items-center justify-center mt-20">Loading...</div>;
    }
    return (
        <div className="max-w-[80%] mx-auto">
            <div className="flex gap-8 items-center p-6 mt-20 min-h-[70vh]">
                <div className="w-1/2 h-full ">
                    <Image src={product.productImage} width={300} height={300} alt="product"
                    className="rounded-xl" />
                </div>
                <div className="w-1/2 h-full py-4 px-8 bg-gray-100">
                    <h1 className="font-semibold text-2xl mb-4">{product.productName}</h1>
                    <p className="text-gray-700 mb-4">{product.productDescription}</p>
                    <div className="flex items-center gap-1 mb-4">
                        <div className="flex gap-1">
                            <IoIosStar className="text-yellow-900" />
                            <IoIosStar className="text-yellow-900" />
                            <IoIosStar className="text-yellow-900" />
                            <IoIosStar className="text-yellow-900" />
                            <IoIosStar className="text-yellow-900" />
                        </div>
                        <span className="text-sm text-gray-700">Rating</span>
                        <span className="text-sm text-gray-700"> ({product.productRating})</span>
                    </div>
                    <div>Price : <span className="text-xl text-yellow-900">Rs {product.productPrice}</span></div>
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
                                onClick={() => handleAddToCart(product.productId)}
                                className="border border-black rounded-2xl px-2 py-1"
                            >
                                Add to Cart
                            </button>
                        )}

                        <div className="cursor-pointer">
                            {isInWishlist ? (
                                // If product is in wishlist, show filled star icon
                                <TbTagStarred
                                    onClick={() => handleRemoveWishList(product.productId)}
                                    size={30}
                                    className="text-yellow-700"
                                />
                            ) : (
                                // If product is not in wishlist, show empty star icon
                                <TbTagStarred
                                    onClick={() => handleWishList(product.productId)}
                                    size={30}
                                    className="text-gray-700"
                                />
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails