'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
const Thankyou = () => {
  return (
    <div className="h-screen w-full flex items-center flex-col ">
      <div className="max-w-4xl mx-auto  flex items-center justify-center flex-col gap-6">
        <Image src={"/thankyou.png"} width={300} height={300} alt="image" />
        <h1 className="text-2xl md:text-5xl text-gray-700 font-bold">Thankyou, enjoy!</h1>
        <button className="bg-red-400 text-white rounded-full px-2 py-1 md:px-4 md:py-2">
          <Link href="/" className="flex items-center gap-2">
            <FaLongArrowAltLeft />
            <span>Back Home</span>
          </Link>
        </button>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 text-sm md:text-xl">If you have any issue <span className="text-black font-bold">contact us </span> </p>
      </div>
    </div>
  )
}

export default Thankyou