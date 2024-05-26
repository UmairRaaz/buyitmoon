'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';

const AllSupports = () => {
    const [supports, setSupports] = useState([]);
    const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString());
    const [endDate, setEndDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const getSupportMessages = async () => {
        try {
            const response = await axios.post("/api/getSupportMessages", {
                params: {
                    startDate,
                    endDate
                }
            });
            setSupports(response.data.supports);
            console.log(response.data.supports);
        } catch (error) {
            console.error("Error fetching support messages:", error);
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
    const currentItems = supports.slice(offset, offset + itemsPerPage);

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
        getSupportMessages();
        console.log(supports);
    }, [startDate, endDate]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this message?');

        if (confirmed) {
            try {
                await axios.delete(`/api/deleteSupportMessage/${id}`);
                getSupportMessages(); // Refresh the support messages list after deletion
            } catch (error) {
                console.error("Error deleting message:", error);
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Support Messages</h1>
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
                            onClick={() => { setModalIsOpen(false); getSupportMessages(); }}
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
                        >
                            Close
                        </button>
                    </Modal>
                </div>
            </div>
            {supports.length === 0 ? (
                <div className="p-4 flex flex-col justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-xl text-gray-600">No Data To Show</h1>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {currentItems.map((message, index) => (
                            <div className="bg-white rounded-lg shadow-md p-6" key={index}>
                                <h2 className="text-xl font-semibold mb-2">Order ID: {message.orderId}</h2>
                                <p className="text-gray-700 mb-2">Customer Name: {message.customerName}</p>
                                <p className="text-gray-700 mb-2">Customer Email: {message.customerEmail}</p>
                                <p className="text-gray-700 mb-2">Customer Message: {message.customerMessage}</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(message._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(supports.length / itemsPerPage)}
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

export default AllSupports;
