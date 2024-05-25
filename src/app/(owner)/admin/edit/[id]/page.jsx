'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const UserDetails = ({ params }) => {
    const [user, setuser] = useState({})
    const id = params.id.toString();
    const router = useRouter()
    const getUserDetails = async () => {
        const response = await axios.get(`/api/getOneUser/${id}`)
        setuser(response.data.user)
        console.log(response.data.user)
    }
    useEffect(() => {
        getUserDetails()
        console.log(user)
    }, [])
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: async () => {
            const response = await axios.get(`/api/getOneUser/${id}`)
            setuser(response.data.user)
            return {
                customerName : response.data.user.customerName,
                customerEmail : response.data.user.email,
                isAdmin : response.data.user.isAdmin,
            }
        }
    });

    const onSubmit = async (data) => {
        console.log(data)
        const response = await axios.put("/api/updateCustomerDetails",{id, ...data})
        if(response.data.success){
            toast("user edit successfully")
            router.push("/admin/all-users")
        }

    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Update Customer</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="customerName">
                        Customer Name
                    </label>
                    <input
                        id="customerName"
                        {...register("customerName", { required: "Customer Name is required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.customerName && (
                        <p className="text-red-600 text-sm mt-1">{errors.customerName.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="customerEmail">
                        Customer Email
                    </label>
                    <input
                        id="customerEmail"
                        type="email"
                        {...register("customerEmail", { required: "Customer Email is required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.customerEmail && (
                        <p className="text-red-600 text-sm mt-1">{errors.customerEmail.message}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="isAdmin">
                        Admin
                    </label>
                    <select
                        id="isAdmin"
                        {...register("isAdmin", { required: "Admin status is required" })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    {errors.isAdmin && (
                        <p className="text-red-600 text-sm mt-1">{errors.isAdmin.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UserDetails