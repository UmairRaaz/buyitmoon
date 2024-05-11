"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [signingLoading, setsigningLoading] = useState(false)
  const [emailUsed, setemailUsed] = useState(false)
  const [signupUser, setsignupUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSignUpUser = async (e) => {
    e.preventDefault();

    try {
      setsigningLoading(true)
      const response = await axios.post("/api/signup", signupUser);
      setsigningLoading(false)
      console.log(response);
      if (response.data.success) {
        alert("User registered successfully");
        router.push("/login");
        setsignupUser({
          name: "",
          email: "",
          password: "",
        });
      }
      
    } catch (error) {
      console.log(error);
      if(!error.response.data.success){
        setemailUsed(true)
      }
    }
  };
  return (
    <div className="min-h-screen w-full bg-white text-gray-700 flex items-center justify-center">
      <div className="w-[80%] md:w-80 h-auto flex bg-white flex-col text-black bg-zinc-300 py-8 pb-16 px-6 shadow-md rounded-xl">
        <h1 className="text-3xl text-center font-semibold">
          Create a account!
        </h1>
        <h1 className="text-md text-center mt-2 text-gray-800">
          Signup to become a customer
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSignUpUser}>
          <input
            type="text"
            placeholder="Enter Name"
            className="h-10 rounded-sm px-4 border border-gray-400"
            value={signupUser.name}
            onChange={(e) =>
              setsignupUser({ ...signupUser, name: e.target.value })
            }
          />
           {emailUsed && (
            <p className="text-md text-gray-700 -my-3">Email is already regitered...</p>
          )}
          <input
            type="email"
            placeholder="Enter Email"
            className="h-10 rounded-sm px-4 border border-gray-400"
            value={signupUser.email}
            onChange={(e) =>
              setsignupUser({ ...signupUser, email: e.target.value })
            }
          />
          
          <input
            type="password"
            placeholder="Choose a Password"
            className="h-10 rounded-sm px-4 border border-gray-400"
            value={signupUser.password}
            onChange={(e) =>
              setsignupUser({ ...signupUser, password: e.target.value })
            }
          />
          <button
            type="submit"
            disabled={signingLoading}
            className="bg-blue-600 text-white w-full h-12 rounded-md"
          >
            {signingLoading ? "Loading" : "Sign Up"}
          </button>
         
        </form>
        <div className="flex gap-1 mt-4">
          <p>Already a member?</p>{" "}
          <Link href={"/login"} className="text-blue-700">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
