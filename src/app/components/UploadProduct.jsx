"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
const UploadProduct = () => {
  const [loading, setloading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "shirts",
    productPrice: "",
    productFor: "Male",
    productRating : 4.8
  });
  const [image, setimage] = useState(null);

  const onChangeHandler = (e) => {
    if (e.target.files) {
      setimage(e.target.files[0]);
    }
  };
  // console.log(image);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProductSave = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }

      const formData = new FormData();
      formData.append("productImage", image);
      formData.append("productName", productData.productName);
      formData.append("productDescription", productData.productDescription);
      formData.append("productCategory", productData.productCategory);
      formData.append("productPrice", productData.productPrice);
      formData.append("productFor", productData.productFor);
      formData.append("productRating", productData.productRating);

      setloading(true);
      const response = await axios.post("/api/uploadProduct", formData);
      setloading(false);
      console.log(response);
      if (response.data.success) {
        alert("Product saved Successfully");
        setProductData({
          productName: "",
          productDescription: "",
          productCategory: "shirts",
          productPrice: "",
          productFor: "Male",
        });
        setimage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full rounded-md shadow-lg ">
      <h1 className="text-2xl text-gray-800 px-4 py-4 m-4">Add Product</h1>
      <div className="px-8">
        <form
          onSubmit={handleProductSave}
          className="py-4 flex md:flex-row flex-col"
          encType="multipart/form-data"
        >
          <div className="md:w-1/2 w-full">
            <div className="max-w-60 mx-auto">
              <label htmlFor="productImage" className="">
                Upload Image
              </label>
              <input
                type="file"
                name="productImage"
                id="productImage"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mt-8 flex items-center justify-center w-full">
              <Image
                src={
                  image ? URL.createObjectURL(image) : "/productPlaceholder.jpg"
                }
                width={300}
                height={300}
                alt="Image"
              />
            </div>
          </div>
          <div className="md:w-1/2 w-full flex flex-col  min-h-48 ">
            <label htmlFor="productname">Product Name</label>
            <input
              type="text"
              id="productname"
              name="productName"
              value={productData.productName}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md mb-4 p-2 outline-none"
            />

            <label htmlFor="product_desc">Product Description</label>
            <textarea
              id="product_desc"
              name="productDescription"
              value={productData.productDescription}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md mb-4 p-2 outline-none"
            />

            <label htmlFor="product_category">Category</label>
            <select
              id="product_category"
              name="productCategory"
              value={productData.productCategory}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md p-2 outline-none mb-4"
            >
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="glasses">Glasses</option>
              <option value="caps">Caps</option>
            </select>

            <label htmlFor="product_for">Product Gender</label>
            <select
              id="product_for"
              name="productFor"
              value={productData.productFor}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md p-2 outline-none mb-4"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label htmlFor="product_price">Product Price</label>
            <input
              type="text"
              id="product_price"
              name="productPrice"
              value={productData.productPrice}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md mb-4 p-2 outline-none"
            />
            
            <label htmlFor="product_rating">Product Rating</label>
            <input
              type="text"
              id="product_rating"
              name="productRating"
              value={productData.productRating}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md mb-4 p-2 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-700 rounded-3xl text-white px-4 py-2 max-w-3xl mx-auto"
            >
              {loading ? "Saving" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
