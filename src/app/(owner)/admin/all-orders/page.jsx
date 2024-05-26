'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString());
    const [endDate, setEndDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const getOrders = async () => {
        try {
            const response = await axios.post("/api/getAllOrders", {
                params: {
                    startDate,
                    endDate
                }
            });
            setOrders(response.data.orders);
            console.log(response.data.orders);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleSelect = (date) => {
        console.log(date);
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = orders.slice(offset, offset + itemsPerPage);

    const selectionRange = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        key: 'selection',
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '620px', // set width of the modal
            padding: '20px',
            borderRadius: '10px'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    useEffect(() => {
        getOrders();
    }, [startDate, endDate]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this order?');

        if (confirmed) {
            try {
                await axios.delete(`/api/deleteOrder/${id}`);
                getOrders(); // Refresh the orders list after deletion
            } catch (error) {
                console.error("Error deleting order:", error);
            }
        }
    };

    const handleDeliver = async (id) => {
        const confirmed = window.confirm('Are you sure you want to deliver this order?');

        if (confirmed) {
            try {
                await axios.put(`/api/deliverOrder/${id}`);
                getOrders(); // Refresh the orders list after updating
            } catch (error) {
                console.error("Error delivering order:", error);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Orders List</h1>
            <div className="m-4 overflow-hidden">
                <div>
                    <button
                        className="bg-blue-700 text-white rounded-xl p-2"
                        onClick={() => setModalIsOpen(true)}
                    >
                        Filter On Date
                    </button>
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
                            onClick={() => { setModalIsOpen(false); getOrders(); }}
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
                        >
                            Close
                        </button>
                    </Modal>
                </div>
            </div>
            {orders.length === 0 ? (
                <div className="p-4 flex flex-col justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-xl text-gray-600">No Data To Show</h1>
                    </div>
                </div>
            ) : (
                <div >
                    <div className="flex flex-col gap-4 mb-10">
                        {currentItems.map((order, index) => (
                            <div key={index} className="bg-white grid place-content-center place-items-center grid-cols-4 p-4 rounded shadow">
                                {/* Order Id */}
                                <div className="">
                                    <h2 className="text-sm">Order Id : {order._id}</h2>
                                </div>
                                {/* Order Status */}
                                <div className="text-sm">
                                    <h2 className="">Order Status : {order.orderStatus}</h2>
                                </div>
                                {/* Total Bill */}
                                <div className="">
                                    <p className="text-gray-700">Total Bill : Rs{order.totalBill}</p>
                                </div>
                                {/* Action Buttons */}
                                <div className='flex gap-4'>
                                    {/* Delete Button */}
                                    <div className=''>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {/* Delivered Button */}
                                    {order.orderStatus === "pending" && (
                                        <div>
                                            <button
                                                type='button'
                                                onClick={() => handleDeliver(order._id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                            >
                                                Delivered
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(orders.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            )}
        </div>
    );
};

export default AllOrders;
