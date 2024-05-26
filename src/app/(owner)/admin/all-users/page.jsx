'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import Modal from 'react-modal';
import ReactPaginate from 'react-paginate';

const AllSupports = () => {
    const [customers, setCustomers] = useState([]);
    const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString());
    const [endDate, setEndDate] = useState(new Date());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const router = useRouter();

    const getAllUsers = async () => {
        try {
            const response = await axios.post("/api/getAllusers", {
                params: {
                    startDate,
                    endDate
                }
            });
            setCustomers(response.data.customer);
            console.log(response.data.customer);
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
    const currentItems = customers.slice(offset, offset + itemsPerPage);

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
        getAllUsers();
    }, [startDate, endDate]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            try {
                await axios.delete(`/api/deleteUser/${id}`);
                getAllUsers(); // Refresh the users list after deletion
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEdit = (id) => {
        router.push(`/admin/edit/${id}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">All Users</h1>
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
                            onClick={() => { setModalIsOpen(false); getAllUsers(); }}
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
                        >
                            Close
                        </button>
                    </Modal>
                </div>
            </div>
            {customers.length === 0 ? (
                <div className="p-4 flex flex-col justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-xl text-gray-600">No Data To Show</h1>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col gap-4 mb-10">
                        {currentItems.map((customer, index) => (
                            <div key={index} className="bg-white grid place-content-center place-items-center grid-cols-4 p-4 rounded shadow">
                                <div className="mb-4">
                                    <h2 className="text-lg">Name: {customer.customerName}</h2>
                                </div>
                                <div className="mb-2">
                                    <h2 className="text-lg">Email: {customer.email}</h2>
                                </div>
                                <div className="mb-2">
                                    <p className="text-gray-700">Is Admin: {customer.isAdmin.toString()}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <div>
                                        <button
                                            type='button'
                                            onClick={() => handleDelete(customer._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type='button'
                                            onClick={() => handleEdit(customer._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(customers.length / itemsPerPage)}
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
