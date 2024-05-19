"use client";
import ProductContext from "@/context/ProductContext";
import { getDataFromCookie } from "@/helpers/getDataFromCookie";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter()
  const { cartItem } = useContext(ProductContext);
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: ""
  })
  const totalPrice = cartItem.reduce((total, item) => {
    // Multiply the price by the quantity for each item and add to the total
    return total + item.price * item.quantity;
  }, 0);
  const totalProducts = cartItem.reduce((total, item) => {
    // Multiply the price by the quantity for each item and add to the total
    return total + 1 * item.quantity;
  }, 0);


  const userDetails = useCallback(async () => {
    try {
      const userData = await axios.get("/api/isAdmin");
      console.log(userData);
      if (!userData.data.success) {
        return router.push("/login");
      }
      const { name, email } = userData.data.data;
      setCustomerData(prevData => ({ ...prevData, fullName: name, email: email }));
    } catch (error) {
      console.error("Error fetching user details", error);
      // router.push("/login");
    }
  }, [router]);
  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post("/api/order", { customerData, cartItem, totalPrice })
    console.log(response)
    if (response.data.success) {
      toast("Order Placed", { icon: '😊' })
      localStorage.removeItem("wishlist");
      localStorage.removeItem("cart");
      localStorage.removeItem("cartItem");
      router.push("/ordercomplete")
    }
  }
  useEffect(() => {
    userDetails();
  }, [userDetails]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);


  return (
    <div className="mt-10 my-10 w-[80%] mx-auto text-gray-700">
      <div className="gap-24 flex md:flex-row flex-col">
        <div className="md:w-[50%] bg-[#FFF7F1] rouded-md shadow-xl border p-5">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Checkout Information</h2>
            <form onSubmit={handleOrderSubmit} className=" rounded mb-4">
              <div onSubmit={handleOrderSubmit} className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="full-name"
                >
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="full-name"
                  type="text"
                  value={customerData.fullName}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  value={customerData.phoneNumber}
                  onChange={(e) => setCustomerData({ ...customerData, phoneNumber: e.target.value })}
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  placeholder="Address"
                  value={customerData.address}
                  onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                ></textarea>
                <button type="submit" className="bg-gray-700 text-white rounded-2xl mt-8 px-4 py-1">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="md:w-[50%] border bg-[#FFF7F1] px-8 py-4">
          <h1 className="text-xl font-semibold mb-4">Order Summary</h1>
          <div className="flex flex-col gap-4">
            {cartItem.map((cart) => (
              <div
                key={cart.id}
                className="flex px-4 py-1 items-center justify-between border-b border-gray-400 pb-4"
              >
                <div className="flex items-center gap-8">
                  <div>
                    <Image
                      src={cart.image}
                      width={100}
                      height={100}
                      alt="image"
                      className="rounded-md"
                    />
                  </div>

                  <div className="w-full">
                    <h1 className="font-semibold">{cart.name}</h1>{" "}
                    {/* Assuming productName is the property name */}
                    <h1>Rs: {cart.price}</h1>
                  </div>
                </div>
                <div className="">x{cart.quantity}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="w-full flex justify-between items-center mt-4">
              <span>Delivery Charges</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="w-full flex justify-between items-center mt-4">
              <span>Total Products</span>
              <span className="font-semibold">{totalProducts}</span>
            </div>
            <div className="w-full flex justify-between items-center mt-4">
              <span>Total</span>
              <span className="font-semibold">{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
