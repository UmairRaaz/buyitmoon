'use client'
import React, { useEffect, useState } from "react";
import ProductContext from "./ProductContext";

const ProductContextProvider = ({ children }) => {
    // const storedProducts =  JSON.parse(window.localStorage.getItem("products"));
    // const wishedProducts =  JSON.parse(window.localStorage.getItem("wishlist"));
    // const cartLocal =  JSON.parse(window.localStorage.getItem("cart"));
    // const cartItemLocal =  JSON.parse(window.localStorage.getItem("cartItem"))
    
    const [productData, setProductData] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [cart, setCart] = useState([])
    const [cartItem, setCartItem] = useState([])
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products"));
        const wishedProducts = JSON.parse(localStorage.getItem("wishlist"));
        const cartLocal = JSON.parse(localStorage.getItem("cart"));
        const cartItemLocal = JSON.parse(localStorage.getItem("cartItem"));

        if (storedProducts) setProductData(storedProducts);
        if (wishedProducts) setWishlist(wishedProducts);
        if (cartLocal) setCart(cartLocal);
        if (cartItemLocal) setCartItem(cartItemLocal);
    }, []);

    return (
        <ProductContext.Provider value={{ productData, setProductData, setWishlist, wishlist, cart, setCart, cartItem, setCartItem, isLoggedIn, setisLoggedIn }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider