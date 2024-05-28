'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

const OrderDetails = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        // Simulating fetching order details
        const fetchedOrder = {
            customer: {
                fullName: 'Umair',
                email: 'umairgopang123@gmail.com',
                phoneNumber: '03073453439',
                address: 'gopang house, gharibabad muhallah matli'
            },
            products: [
                {
                    id: '66192aa164e9a4a4fad957b2',
                    price: 399,
                    image: 'https://res.cloudinary.com/dj73jnivq/image/upload/v1716803352/products-image/uem9jcinoofc5kdpl00i.jpg',
                    name: 'Urban testFive',
                    quantity: 2,
                    _id: '6655caf202768e36c43b9b51'
                }
            ],
            totalBill: 798,
            deliveryCharges: 0,
            orderStatus: 'pending',
            _id: '6655caf202768e36c43b9b50',
            createdAt: '2024-05-28T12:15:46.660Z',
            updatedAt: '2024-05-28T12:15:46.660Z',
            __v: 0
        };
        setOrder(fetchedOrder);
    }, []);

    if (!order) {
        return <div className="h-screen w-full flex items-center justify-center mt-20">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 mt-20 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Order Details</h1>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
                <p><strong>Name:</strong> {order.customer.fullName}</p>
                <p><strong>Email:</strong> {order.customer.email}</p>
                <p><strong>Phone:</strong> {order.customer.phoneNumber}</p>
                <p><strong>Address:</strong> {order.customer.address}</p>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                {order.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg shadow">
                        <Image src={product.image} width={100} height={100} alt={product.name} className="rounded-lg" />
                        <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p><strong>Price:</strong> Rs {product.price}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Total:</strong> Rs {product.price * product.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                <p><strong>Total Bill:</strong> Rs {order.totalBill}</p>
                <p><strong>Delivery Charges:</strong> Rs {order.deliveryCharges}</p>
                <p><strong>Order Status:</strong> {order.orderStatus}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default OrderDetails;
