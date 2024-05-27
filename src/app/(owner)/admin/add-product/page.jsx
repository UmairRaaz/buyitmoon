"use client";

import Link from "next/link";
import UploadProduct from "../../../components/UploadProduct";
import AddAdmin from "../../../components/AddAdmin";
import ShowSales from "../../../components/ShowSales";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter()
  const [loading, setloading] = useState(true)
  const [isAdmin, setisAdmin] = useState(false);
  const getUserData = async () => {
    try {
      const response = await axios.get("/api/isAdmin");
      console.log("response: ", response.data.data.isAdmin);
      if (response.data.data.isAdmin) {
        setisAdmin(true);
        setloading(false)
      } else {
        setisAdmin(false);
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("isAdmin", isAdmin);
  useEffect(() => {
    getUserData();
  }, [isAdmin]);
  return (
    <>
      <div>
        {loading && "Loading"}
      </div>
      <div className={`bg-white shadow-lg ${isAdmin ? "block" : "hidden"}`}>
        <UploadProduct  />
      </div>
    </>
  );
};

export default AdminPage;
