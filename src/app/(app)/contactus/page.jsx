'use client';
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Support = () => {
    const [submmitting, setsubmmitting] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues : {
            orderId : "",
            customerName : "",
            customerEmail: "",
            customerMessage: ""
        }
    });
    console.log(errors)
    const onSubmit = async (data) => {
        setsubmmitting(true)
        try {
            const response = await axios.post("/api/customerSupport", data);
            // console.log(response);
            if(response.data.success){
                setsubmmitting(false)
                toast("Message Sent Successfully")
                reset()
            }
            setsubmmitting(false)
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("Message Not Sent");
            setsubmmitting(false)
            reset()
        }
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen mt-14 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Support Page</h2>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                            Order ID
                        </label>
                        <input
                            type="text"
                            id="orderId"
                            {...register("orderId", {
                                required: "Order ID is required"
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.orderId && <p className="text-xs text-red-400">{errors.orderId.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("customerName", {
                                required: "Name is required"
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.customerName && <p className="text-xs text-red-400">{errors.customerName.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("customerEmail", {
                                required: "Email is required"
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        {errors.customerEmail && <p className="text-xs text-red-400">{errors.customerEmail.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
                            Issue
                        </label>
                        <textarea
                            id="issue"
                            rows="4"
                            {...register("customerMessage", {
                                required: "Issue description is required"
                            })}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                        {errors.customerMessage && <p className="text-xs text-red-400">{errors.customerMessage.message}</p>}
                    </div>
                    <div className="flex justify-center">
                        <button disabled={submmitting}
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Support;
