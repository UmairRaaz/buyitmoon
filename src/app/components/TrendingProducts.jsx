'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductComponent from './ProductComponent';

const TrendingProducts = () => {
  const [mostSelled, setMostSelled] = useState([]);
  const [products, setproducts] = useState([])

  useEffect(() => {
    axios.get("/api/order")
      .then((response) => {
        let orderData = response.data.newIds;
        const slicedData = orderData.slice(0, 3)
        setMostSelled(slicedData);
      })
      .catch((error) => {
        console.error("Error fetching most sold items:", error);
      });
  }, []);

  return (
    <div className="min-h-[50vh] w-[80%] mx-auto ">
      <h1 className='text-3xl text-gray-700  my-4 font-semibold text-center'><span className='border-b-2 pb-2 border-gray-500 mb-8 '>Most Sold Items</span></h1>
      <div className='grid grid-cols-1 mt-8 place-items-center place-content-center  gap-y-10 md:grid-cols-2 lg:grid-cols-3'>
        {mostSelled.length > 0 && mostSelled.map((product) => (
          <ProductComponent
            productId={product.id}
            productImage={product.image}
            productName={product.name}
            productPrice={product.price}
            key={product.id} 
            productRating={((Math.random() * 0.5) + 4.5).toFixed(1)}
            />
        ))}
      </div>
    </div>

  )
}

export default TrendingProducts