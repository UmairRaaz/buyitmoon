'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import Modal from 'react-modal';

const Dashboard = () => {
  const [products, setproducts] = useState("0")
  const [pendingOrders, setPendingOrders] = useState(0)
  const [completedOrders, setCompletedOrders] = useState(0)
  const [totalUsers, settotalUsers] = useState(0)
  const [totalAdmins, settotalAdmins] = useState(0)
  const [totalRevenue, settotalRevenue] = useState(0)
  const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString());
  const [endDate, setEndDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getDetails = async () => {
    const productResponse = await axios.post("/api/getAllProducts", {
      params: {
        startDate,
        endDate
      }
    });
    setproducts(productResponse.data.products.length);

    const OrderResponse = await axios.post('/api/getAllOrders', {
      params: {
        startDate,
        endDate
      }
    });
    console.log(OrderResponse.data.orders)
    if (OrderResponse.data.orders.length !== 0) {
      OrderResponse.data.orders.forEach(order => {
        if (order.orderStatus === "pending") {
          setPendingOrders(prev => prev + 1);
        } else {
          setCompletedOrders(prev => prev + 1);
          settotalRevenue((pev) => pev += order.totalBill)
        }
      });
    } else {
      setPendingOrders(0)
      setCompletedOrders(0)
    }


    const userResponse = await axios.post("/api/getAllusers", {
      params: {
        startDate,
        endDate
      }
    });
    settotalUsers(userResponse.data.customer.length);
    if (userResponse.data.customer.length !== 0) {
      userResponse.data.customer.forEach(user => {
        if (user.isAdmin === true) {
          settotalAdmins(prev => prev + 1);
        }
      });
    } else {
      settotalAdmins(0);
      settotalUsers(0)
    }

  }

  const handleSelect = (date) => {
    console.log(date);
    setStartDate(date.selection.startDate)
    setEndDate(date.selection.endDate)
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  useEffect(() => {
    getDetails()
    console.log("Start Date", startDate)
    console.log("End Date", endDate)
  }, [startDate, endDate])

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '620px',  // set width of the modal
      padding: '20px',
      borderRadius: '10px'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  };

  return (
    <div>
      <div className="m-4  overflow-hidden">
        <div>
          <button
            className="bg-blue-700 text-white rounded-xl p-2"
            onClick={() => setModalIsOpen(true)}>Filter On Date</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <DateRangePicker
              className="shadow-xl border border-gray-700"
              showMonthAndYearPickers={false}
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
            <button
              type="button"
              onClick={() => { setModalIsOpen(false); getDetails() }} className="mt-4 p-2 bg-blue-500 text-white rounded">Close</button>
          </Modal>
        </div>
      </div>
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
          <p className="text-gray-700">{Number(totalAdmins) / 2}</p>
        </div>
        <div className="bg-pink-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
          <p className="text-gray-700">Rs: {totalRevenue / 2}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
