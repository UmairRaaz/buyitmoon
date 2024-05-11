"use client";

import axios from "axios";
import { useState } from "react";

const AddAdmin = () => {
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await axios.post("/api/addAdmin", { email });
      setloading(false);
      seterror(false);
      alert("Admin Added");
      console.log(response);
    } catch (error) {
      setloading(false);
      if (!error.response.data.success) {
        seterror(true);
      }
      console.log(error);
    }
  };
  return (
    <div className='className="max-w-6xl min-h-[80vh] rounded-md mx-auto mt-10 '>
      <div className="max-w-2xl  mx-auto border border-gray-200 rounded-xl px-4 py-4">
        <h1 className="text-2xl mb-4">
          Enter email of a user to give role of admin
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleAddAdmin}>
          <input
            type="email"
            className="bg-gray-100 border mb-1 outline-none border-white w-72 h-10 rounded-md px-2"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            placeholder="Enter Email"
          />
          <p className="text-sm text-gray-400 italic">
            {error && "Email not found"}
          </p>
          <button
            disabled={setloading}
            type="submit"
            className="border w-32 p-1 rounded-full"
          >
            {loading ? "Adding" : "Add Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
