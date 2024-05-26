import React from 'react'
import { FaShippingFast, FaLock, FaThumbsUp, FaHeadset } from 'react-icons/fa';
const page = () => {
  return (
    <section className="p-12 mt-32">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <FaShippingFast size={40} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Shipping</h3>
            <p className="text-gray-600 text-center">
              We provide fast and reliable shipping to ensure you receive your products on time.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <FaLock size={40} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-center">
              Our payment methods are secure, protecting your personal and financial information.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <FaThumbsUp size={40} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Products</h3>
            <p className="text-gray-600 text-center">
              We offer high-quality products that meet your expectations and needs.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <FaHeadset size={40} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-center">
              Our customer support team is available 24/7 to assist you with any queries.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default page