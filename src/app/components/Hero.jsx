import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="mb-24 md:mt-24 mt-10  w-[80%] mx-auto flex md:flex-row md:gap-0 gap-6 flex-col justify-between">
      <div className="w-full md:w-1/2">
        <h1 className="text-6xl font-bold text-gray-800">Style, <br /> Comfort, <br /> Quality </h1>
        <p className="my-4 text-md">Discover timeless elegance and unbeatable comfort with our curated selection of shirts and pants. Elevate your wardrobe with pieces crafted for both style and durability</p>
        <button className="bg-gray-900 text-white p-2 rounded-xl">
            <Link href={"/products"}>Explore Products</Link>
        </button>
      </div>
      <div className="w-full md:w-1/2 ">
        <Image src={"/f6.jpg"} alt="Image" width={300} height={300} className="
        md:ml-36
        rounded-xl"/>
      </div>
    </div>
  );
};

export default Hero;
