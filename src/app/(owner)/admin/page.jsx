"use client";

import Link from "next/link";
import UploadProduct from "../../components/UploadProduct";
import AddAdmin from "../../components/AddAdmin";
import ShowSales from "../../components/ShowSales";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter()
  const [loading, setloading] = useState(true)
  const [compnentToShow, setCompnentToShow] = useState("upload");
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
        <div className="max-w-5xl mx-auto text-2xl uppercase pt-8 flex gap-8 text-center justify-center ">
          <p
            className="cursor-pointer"
            onClick={() => setCompnentToShow("upload")}
          >
            Upload Product
          </p>
          <p
            className="cursor-pointer"
            onClick={() => setCompnentToShow("admin")}
          >
            Add Admin
          </p>
        </div>
        {compnentToShow === "upload" ? (
          <UploadProduct />
        ) : compnentToShow === "admin" ? (
          <AddAdmin />
        ) : (
          <ShowSales />
        )}
      </div>
    </>
  );
};

export default AdminPage;
