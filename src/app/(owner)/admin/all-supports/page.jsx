'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllSupports = () => {
    const [supports, setsupport] = useState([])
    const getSupportMessages = async () => {
        try {
            const response = await axios.get("/api/getSupportMessages");
            setsupport(response.data.supports);
            console.log(response.data.supports)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getSupportMessages()
        console.log(supports)
    }, [])
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this message?');

        if (confirmed) {
            try {
                const response = await axios.delete(`/api/deleteSupportMessage/${id}`);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Support Messages</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                {supports.map((message, index) => (
                    <div className="bg-white rounded-lg shadow-md p-6" key={index}>
                        <h2 className="text-xl font-semibold mb-2">Order ID: {message.orderId}</h2>
                        <p className="text-gray-700 mb-2">Customer Name: {message.customerName}</p>
                        <p className="text-gray-700 mb-2">Customer Email: {message.customerEmail}</p>
                        <p className="text-gray-700 mb-2">Customer Message: {message.customerMessage}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={() => handleDelete(message._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AllSupports;
