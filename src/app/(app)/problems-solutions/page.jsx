import React from 'react'
import { FaExclamationCircle, FaCheckCircle, FaQuestionCircle, FaLightbulb } from 'react-icons/fa';
const page = () => {
  return (
    <section className="py-12 mt-32 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Problems & Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <FaExclamationCircle size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Problem 1</h3>
            <p className="text-gray-600 text-center mb-4">
              Many customers face delayed shipping which causes inconvenience and frustration.
            </p>
            <FaCheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Solution 1</h3>
            <p className="text-gray-600 text-center">
              Our express shipping ensures that your products arrive on time, every time.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <FaExclamationCircle size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Problem 2</h3>
            <p className="text-gray-600 text-center mb-4">
              Customers worry about the security of their payment information.
            </p>
            <FaCheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Solution 2</h3>
            <p className="text-gray-600 text-center">
              We use state-of-the-art encryption technology to keep your data secure.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <FaExclamationCircle size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Problem 3</h3>
            <p className="text-gray-600 text-center mb-4">
              Finding quality products can be difficult and time-consuming.
            </p>
            <FaCheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Solution 3</h3>
            <p className="text-gray-600 text-center">
              We offer a curated selection of high-quality products that meet your needs.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
            <FaExclamationCircle size={40} className="text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Problem 4</h3>
            <p className="text-gray-600 text-center mb-4">
              Lack of customer support can lead to unresolved issues and dissatisfaction.
            </p>
            <FaCheckCircle size={40} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Solution 4</h3>
            <p className="text-gray-600 text-center">
              Our 24/7 customer support team is always available to assist you with any issues.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default page