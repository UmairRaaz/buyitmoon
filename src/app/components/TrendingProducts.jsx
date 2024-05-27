'use client'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ProductComponent from './ProductComponent';
import ProductContext from '@/context/ProductContext';

const TrendingProducts = () => {
  const [mostSelled, setMostSelled] = useState([]);
  const [products, setproducts] = useState([])
  const { productData, wishlist } = useContext(ProductContext);
  useEffect(() => {

    const filterProduct = productData.slice(0, 3)
    setproducts(filterProduct);


  }, [productData]);
  console.log(productData)
  return (
    <div className="min-h-[50vh] w-[80%] mx-auto ">
      <h1 className='text-3xl text-gray-700  my-4 font-semibold text-center'><span className='border-b-2 pb-2 border-gray-500 mb-8 '>Products</span></h1>
      <div className='grid grid-cols-1 mt-8 place-items-center place-content-center  gap-y-10 md:grid-cols-2 lg:grid-cols-3'>
        {products.length > 0 && products.map((product, index) => (
          <ProductComponent
            key={index}
            productImage={product.productImage}
            productName={product.productName}
            productPrice={product.productPrice}
            productId={product._id}
            productRating={product.productRating}
          />
        ))}
      </div>
    </div>

  )
}

export default TrendingProducts