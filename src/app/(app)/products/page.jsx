"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductComponent from "../../components/ProductComponent";
import ProductContext from "@/context/ProductContext";
import FilterSlider from "../../components/FilterSlider";

const ProductPage = () => {
  const { productData, wishlist, } = useContext(ProductContext)

  const [priceFilter, setpriceFilter] = useState("default")
  const [sortedProducts, setSortedProducts] = useState([])
  const [toggleFilter, settoggleFilter] = useState(false)

  const [genderButtons, setgenderButtons] = useState("")
  const [priceRange, setpriceRange] = useState("")
  const [category, setcategory] = useState([])
  const [rating, setrating] = useState(1)

  useEffect(() => {
    let sortedProductsCopy = [...productData];
    setSortedProducts(productData)
    if (priceFilter === "lth") {
      sortedProductsCopy.sort((a, b) => a.productPrice - b.productPrice);
    } else if (priceFilter === "htl") {
      sortedProductsCopy.sort((a, b) => b.productPrice - a.productPrice);
    }
    setSortedProducts(sortedProductsCopy);

  }, [productData, priceFilter]);
  useEffect(() => {
    // Copy the original products array
    let filteredProducts = [...productData];

    if (genderButtons !== "") {
      filteredProducts = filteredProducts.filter(product => product.productFor === genderButtons);
    }

    // Apply price range filter
    if (priceRange !== "") {
      filteredProducts = filteredProducts.filter(product => priceRange <= product.productPrice);
    }

    // Apply category filter
    if (category.length > 0) {
      filteredProducts = filteredProducts.filter(product => category.includes(product.productCategory));
    }
    if (rating) {
      filteredProducts = filteredProducts.filter(product => product.productRating >= rating);
    }
    console.log(rating)
    // Update the state with the filtered products
    setSortedProducts(filteredProducts);
  }, [productData, genderButtons, priceRange, category, rating]);
  return (
    <div className="min-h-[50vh] mt-10 md:w-[80%] w-full mx-auto ">
      {
        toggleFilter && <FilterSlider
          genderButtons={genderButtons}
          priceRange={priceRange}
          category={category}
          rating={rating}
          setgenderButtons={setgenderButtons}
          setpriceRange={setpriceRange}
          setcategory={setcategory}
          setrating={setrating}
          settoggleFilter={settoggleFilter} />
      }
      <div className="w-full mb-8 flex flex-col md:flex-row md:gap-0 gap-8 justify-between items-center pr-24 md:pr-0">
        <div className="text-2xl font-semibold  ml-8 md:ml-0 text-gray-700">Best Products For You!!</div>
        <div className="flex gap-4 mt-4 md:mt-0 ml-8 md:ml-0 ">
          <div className="price-options">
            <select
              name="price"
              id=""
              className="px-2 py-1 rounded-md shadow-md"
              value={priceFilter}
              onChange={(e) => setpriceFilter(e.target.value)}
            >
              <option value="default" disabled selected>Sort by Price</option>
              <option value="lth">Low to High</option>
              <option value="htl">High to Low</option>
            </select>
          </div>
          <div className="filter px-2 py-1 rounded-md shadow-md hover:bg-brown-700 hover:text-white">
            <button onClick={() => settoggleFilter(prev => !prev)}>Filter</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 place-items-center place-content-center  gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.length > 0 &&
          sortedProducts.map((product, index) => (
            <ProductComponent
              key={index}
              productImage={product.productImage}
              productName={product.productName}
              productPrice={product.productPrice}
              productId={product._id}
              productRating={product.productRating}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
