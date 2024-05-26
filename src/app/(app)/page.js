'use client'
import MainPage from "../components/MainPage";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import ProductContext from '@/context/ProductContext'
import { useParams, usePathname } from "next/navigation";

export default function Home() {
  const { productData, setProductData } = useContext(ProductContext);
  const [localStorages, setlocalStorages] = useState([])
  const path = usePathname()
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("/api/getProductsForCustomer");
        setProductData(response.data.products);
        // window.localStorage.setItem("products", JSON.stringify(response.data.products))
        localStorage.setItem("products", JSON.stringify(response.data.products))
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [setProductData]); 
  return (
    <>
      <MainPage />
    </>
  );
}
