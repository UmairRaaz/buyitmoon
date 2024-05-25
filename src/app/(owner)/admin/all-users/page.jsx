'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AllSupports = () => {
    const [customers, setcustomers] = useState([])
    const router = useRouter()
    const getAllUsers = async () => {
        try {
            const response = await axios.get("/api/getAllusers");
            setcustomers(response.data.customer);
            console.log(response.data.customer)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getAllUsers()
        console.log(customers)
    }, [])
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');

        if (confirmed) {
            try {
                const response = await axios.delete(`/api/deleteUser/${id}`);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEdit = (id) => {
        router.push(`/admin/edit/${id}`)
    } 
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">All Users</h1>
            <div className="flex flex-col gap-4">
                {customers.map((customer, index) => (
                    <div key={index} className="bg-white grid place-content-center place-items-center grid-cols-4 p-4 rounded shadow">
                        <div className="mb-4">
                            <h2 className="text-lg ">Name: {customer.customerName}</h2>
                        </div>
                        <div className="mb-2">
                            <h2 className="text-lg ">Email: {customer.email}</h2>
                        </div>
                        <div className="mb-2">
                            <p className="text-gray-700">Is Admin: {customer.isAdmin.toString()}</p>
                        </div>
                        <div className='flex gap-2'>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => handleDelete(customer._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                            </div>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => handleEdit(customer._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AllSupports;
