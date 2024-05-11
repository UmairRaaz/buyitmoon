import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Categories = () => {
    return (
        <div className="min-h-[50vh] mt-36 w-[80%] mx-auto">
            <h1 className='my-4 text-4xl font-semibold text-center'>Categories</h1>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-10 w-full  md:gap-4 my-10'>
                <Link href={"/products"} className='h-56 text-4xl flex items-center justify-center flex-grow rounded-xl  overflow-hidden relative text-gray-700 '>
                    <Image src={"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        className='w-full h-full'
                        width={100}
                        height={100}
                        alt='shirt'
                    />
                    <h1 className='text-4xl font-bold absolute top-[40%] left-[35%]'>Shirts</h1>
                </Link>

                <Link href={"/products"} className='h-56 text-4xl flex items-center justify-center flex-grow rounded-xl overflow-hidden text-gray-500 relative'>
                    <Image src={"https://images.unsplash.com/photo-1516271099866-de31ba93ee4b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        className='w-full h-full'
                        width={100}
                        height={100}
                        alt='pants'
                    />
                    <h1 className='text-4xl font-bold absolute top-[40%] left-[35%]'>Pants</h1>
                </Link>
                <Link href={"/products"} className='h-56 text-4xl flex items-center justify-center flex-grow rounded-xl  overflow-hidden text-gray-200 relative'>
                    <Image src={"https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        className='w-full h-full'
                        width={100}
                        height={100}
                        alt='shoes'
                    />
                     <h1 className='text-4xl font-bold absolute top-[40%] left-[35%]'>Shoes</h1>
                </Link>
            </div>
        </div>
    )
}

export default Categories