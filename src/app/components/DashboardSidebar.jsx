'use client'

import Link from 'next/link'
import React from 'react'

const DashboardSidebar = () => {
    
    return (
        <div className="h-screen fixed left-0 top-0 bg-gray-800 text-white w-64 flex flex-col">
            <div className="py-4 px-6">
                <Link href={"/admin"}><h2 className="text-2xl font-bold">Dashboard</h2></Link>
                
            </div>
            <nav className="flex flex-col flex-1 px-4 space-y-2">
                <Link href="/admin/add-product"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                >
                    Add Product
                </Link>
                <Link href="/admin/all-products"
                    className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    All Products
                </Link>
                <Link href="/admin/all-orders" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    All Orders
                </Link>
                <Link href="/admin/all-supports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    All Support
                </Link>
                <Link href="/admin/all-users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                    All Users
                </Link>
            </nav>
        </div>
    )
}

export default DashboardSidebar