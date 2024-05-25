'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const AllOrders = () => {
    const [orders, setorders] = useState([])
    const getOrders = async () => {
        try {
            const response = await axios.get("/api/getAllOrders");
            setorders(response.data.orders);
            console.log(response.data.orders)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getOrders()
        console.log(orders)
    }, [])
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this order?');

        if (confirmed) {
            try {
                const response = await axios.delete(`/api/deleteOrder/${id}`);
                console.log(response); 
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleDeilver = async (id) => {
        const confirmed = window.confirm('Are you sure you want to deliver this order?');

        if (confirmed) {
            try {
                const response = await axios.put(`/api/deliverOrder/${id}`);
                console.log(response); 
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Orders List</h1>
            <div className="flex flex-col gap-4">
                {orders?.map((order, index) => (
                    <div key={index} className="bg-white grid place-content-center place-items-center grid-cols-4 p-4 rounded shadow">
                        {/* Order Id */}
                        <div className="">
                            <h2 className="text-sm">Order Id : {order._id}</h2>
                        </div>
                        {/* Order Status */}
                        <div className="text-sm">
                            <h2 className="">Order Status : {order.orderStatus}</h2>
                        </div>
                        {/* Total Bill */}
                        <div className="">
                            <p className="text-gray-700">Total Bill : Rs{order.totalBill}</p>
                        </div>
                        {/* Action Buttons */}
                        <div className='flex gap-4 '>
                            {/* Delete Button */}
                            <div className=''>
                                <button
                                    type='button'
                                    onClick={() => handleDelete(order._id)} // Corrected here
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                            </div>
                            {/* Deliverd Button */}
                            {order.orderStatus === "pending" && (
                                <div>
                                    <button
                                        type='button'
                                        onClick={() => handleDeilver(order._id)} // Corrected here
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Delivered</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AllOrders;
