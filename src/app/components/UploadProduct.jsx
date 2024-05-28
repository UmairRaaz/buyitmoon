"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false);
  const [firstSelection, setFirstSelection] = useState('');
  const [secondSelection, setSecondSelection] = useState('');
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productPrice: "",
    productFor: "",
    productRating: 4.8
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log("First selection:", firstSelection);
    console.log("Second selection:", secondSelection);
  }, [firstSelection, secondSelection]);

  const onChangeHandler = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

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
      formData.append("productCategory", firstSelection);
      formData.append("productFor", secondSelection);
      formData.append("productPrice", productData.productPrice);
      formData.append("productRating", productData.productRating);

      setLoading(true);
      const response = await axios.post("/api/uploadProduct", formData);
      setLoading(false);
      console.log(response);
      if (response.data.success) {
        alert("Product saved Successfully");
        setProductData({
          productName: "",
          productDescription: "",
          productCategory: "",
          productPrice: "",
          productFor: "",
          productRating: 4.8
        });
        setImage(null);
        setFirstSelection('');
        setSecondSelection('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstSelectionChange = (e) => {
    setFirstSelection(e.target.value);
    setSecondSelection('');
  };

  const handleSecondSelectionChange = (e) => {
    setSecondSelection(e.target.value);
  };

  return (
    <div className="max-w-6xl min-h-[80vh] rounded-md mx-auto shadow-lg">
      <h1 className="text-2xl text-gray-800 px-4 py-4 m-4">Add Product</h1>
      <div className="px-8">
        <form
          onSubmit={handleProductSave}
          className="py-4 flex md:flex-row flex-col"
          encType="multipart/form-data"
        >
          <div className="md:w-1/2 w-full">
            <div className="max-w-60 mx-auto">
              <label htmlFor="productImage">Upload Image</label>
              <input
                type="file"
                name="productImage"
                id="productImage"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mt-8 flex items-center justify-center w-full">
              <Image
                src={image ? URL.createObjectURL(image) : "/productPlaceholder.jpg"}
                width={300}
                height={300}
                alt="Image"
              />
            </div>
          </div>
          <div className="md:w-1/2 w-full flex flex-col min-h-48">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productData.productName}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md mb-4 p-2 outline-none"
            />

            <label htmlFor="productDescription">Product Description</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={productData.productDescription}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md mb-4 p-2 outline-none"
            />

            <div className="flex gap-4 items-center my-4 space-y-4">
              <div className="flex flex-col mt-4">
                <label htmlFor="first-select" className="mb-2 text-lg font-medium text-gray-700">
                  Choose a Category:
                </label>
                <select
                  id="first-select"
                  value={firstSelection}
                  onChange={handleFirstSelectionChange}
                  className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="productCategory"
                >
                  <option value="">Select</option>
                  <option value="stoves">Stoves</option>
                  <option value="plates">Plates</option>
                </select>
              </div>

              {firstSelection && (
                <div className="flex flex-col -mt-4">
                  <label htmlFor="second-select" className="mb-2 text-lg font-medium text-gray-700">
                    Choose a {firstSelection === 'stoves' ? 'type' : 'weight'}:
                  </label>
                  <select
                    id="second-select"
                    value={secondSelection}
                    onChange={handleSecondSelectionChange}
                    className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="productFor"
                  >
                    <option value="">Select</option>
                    {firstSelection === 'stoves' ? (
                      <>
                        <option value="domestic">Domestic</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrialization">Industrialization</option>
                      </>
                    ) : (
                      <>
                        <option value="10kg">10kg</option>
                        <option value="50kg">50kg</option>
                        <option value="100kg">100kg</option>
                        <option value="500kg">500kg</option>
                        <option value="1000kg">1000kg</option>
                        <option value="5000kg">5000kg</option>
                        <option value="10000kg">10000kg</option>
                      </>
                    )}
                  </select>
                </div>
              )}
            </div>

            <label htmlFor="productPrice">Product Price</label>
            <input
              type="text"
              id="productPrice"
              name="productPrice"
              value={productData.productPrice}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-md mb-4 p-2 outline-none"
            />

            <label htmlFor="productRating">Product Rating</label>
            <input
              type="text"
              id="productRating"
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
