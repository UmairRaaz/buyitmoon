'use client'

import EditProduct from "@/app/components/EditProductForm";
import UploadProduct from "@/app/components/UploadProduct";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductEdit = ({ params }) => {
  const [product, setproduct] = useState({})
  const id = params.id.toString();
  const getProductDetails = async (id) => {
    const response = await axios.get(`/api/getOneProduct/${id}`)
    setproduct(response.data.product)
    console.log(response.data.product)
  }
  useEffect(() => {
    getProductDetails(id)
  }, [id])
  if (!product) {
    return <div>Loading...</div>; // or a loading spinner component
  }

  return (
    <div>
      <EditProduct product={product} />
    </div>
  );
}

export default ProductEdit