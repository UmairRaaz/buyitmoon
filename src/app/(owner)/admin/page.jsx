'use client'

import axios from "axios"
import { useEffect, useState } from "react"

const Dashboard = () => {
  const [products, setproducts] = useState("0")
  const [pendingOrders, setPendingOrders] = useState(0)
  const [completedOrders, setCompletedOrders] = useState(0)
  const [totalUsers, settotalUsers] = useState("0")
  const [totalAdmins, settotalAdmins] = useState(0)
  const [totalRevenue, settotalRevenue] = useState(0)

  const getDetails = async () => {
    const productResponse = await axios.get("/api/getAllProducts");
    setproducts(productResponse.data.products.length);

    const OrderResponse = await axios.get("/api/getAllOrders");
    console.log(OrderResponse.data.orders)
    OrderResponse.data.orders.forEach(order => {
      if (order.orderStatus === "pending") {
        setPendingOrders(prev => prev + 1); 
      } else {
        setCompletedOrders(prev => prev + 1);
        
        settotalRevenue((pev) => pev += order.totalBill)
      }
    });
    const userResponse = await axios.get("/api/getAllusers");
    settotalUsers(userResponse.data.customer.length);
    userResponse.data.customer.forEach(user => {
      if (user.isAdmin === true) {
        settotalAdmins(prev => prev + 1); 
      } 
    });
  }


  useEffect(() => {
    getDetails()
  }, [])
  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <div className="bg-blue-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Total Products</h2>
        <p className="text-gray-700">{products}</p>
      </div>
      <div className="bg-green-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Pending Orders</h2>
        <p className="text-gray-700">{pendingOrders / 2}</p>
      </div>
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Orders Completed</h2>
        <p className="text-gray-700">{completedOrders / 2}</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Total Users</h2>
        <p className="text-gray-700">{totalUsers}</p>
      </div>
      <div className="bg-pink-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Total Admins</h2>
        <p className="text-gray-700">{Number(totalAdmins) /2}</p>
      </div>
      <div className="bg-pink-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
        <p className="text-gray-700">Rs: {totalRevenue / 2 }</p>
      </div>
    </div>
  );
}

export default Dashboard;
