'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const AllProductsPage = () => {
    const [products, setproducts] = useState([])
    const getProducts = async () => {
        try {
            const response = await axios.get("/api/getAllProducts");
            setproducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getProducts()

    }, [])
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this product?');
        
        if (confirmed) {
            try {
                const response = await axios.delete(`/api/deleteProduct/${id}`);
                console.log(response); 
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Product List</h1>
        <div className="flex flex-col gap-4">
            {products.map((product, index) => (
                <div key={index} className="bg-white grid place-content-center place-items-center grid-cols-4 p-4 rounded shadow">
                    {/* Product Image */}
                    <div className="mb-4">
                        <Image src={product.productImage} width={100} height={100} alt={product.productName} className=" rounded" />
                    </div>
                    {/* Product Name */}
                    <div className="mb-2">
                        <h2 className="text-lg font-bold">{product.productName}</h2>
                    </div>
                    {/* Product Price */}
                    <div className="mb-2">
                        <p className="text-gray-700">${product.productPrice}</p>
                    </div>
                    {/* Delete Button */}
                    <div>
                        <button
                        type='button'
                        onClick={()=>handleDelete(product._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default AllProductsPage;
