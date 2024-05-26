'use client'
import ProductContext from "@/context/ProductContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const LoginPage = () => {
  const router = useRouter()
  const [userNotFound, setuserNotFound] = useState(false)
  const [loginLoading, setloginLoading] = useState(false)
  const [loginUserData, setloginUserData] = useState({
    email: "",
    password: ""
  })
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(loginUserData)
    try {
      setloginLoading(true)
      const response = await axios.post("/api/login", loginUserData)
      console.log("response", response)
      setloginLoading(false)
      console.log(response)
      if (response.data.success) {
        setloginUserData({
          email: "",
          password: "",
        })
        setuserNotFound(false)
        router.push("/checkout")
      }
    } catch (error) {
      console.log("error while login", error)
      if (error) {
        console.log(error)
        setuserNotFound(true)
        setloginLoading(false)
        setloginUserData({
          email: "",
          password: "",
        })
      }
    }
  }
  return (
    <div className="min-h-screen w-full bg-white text-gray-700 flex items-center justify-center">
      <div className="w-[80%] md:w-80 h-auto bg-white flex flex-col  bg-zinc-300 py-8 pb-16 px-6 shadow-2xl rounded-xl">
        <h1 className="text-3xl text-center font-semibold text-gray-700">Welcome Back!</h1>
        <h1 className="text-md text-center mt-2 text-gray-600">
          Login to access your account
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            className="h-10 rounded-sm px-4 border border-gray-400"
            value={loginUserData.email}
            onChange={(e) => setloginUserData({ ...loginUserData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Choose a Password"
            className="h-10 rounded-sm px-4 border border-gray-400"
            value={loginUserData.password}
            onChange={(e) => setloginUserData({ ...loginUserData, password: e.target.value })}
          />
          {userNotFound && (
            <p className="text-sm text-gray-700 -my-2">Please enter correct email and password</p>
          )}
          <button
            type="submit"
            disabled={loginLoading}
            className="bg-blue-600 text-white w-full h-12 rounded-md"
          >
            {loginLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex gap-1 mt-4">
          <p>Not a member?</p>{" "}
          <Link href={"/signup"} className="text-blue-700">
            SignUp Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
