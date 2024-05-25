"use client";
import React, { useContext, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoIosHome } from "react-icons/io";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProductContext from "@/context/ProductContext";
import { IoCartSharp } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
function NavList() {
  
  const router = useRouter()
  const { wishlist, cart } = useContext(ProductContext)
  const logoutHandler = async () => {
    const response = await axios.get("/api/logout")
    // window.location.reload();
    router.refresh()

  }
  return (
    <div className="my-0  flex flex-col gap-2 text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4">
      <Link href="/"
        className="p-1 font-medium text-md border-b border-r-0 md:border-b-0 md:border-r border-gray-700 px-4 py-2 md:py-0 uppercase"
      >
        <IoIosHome size={25} className="text-blue-500"/>
      </Link>

      <Link
        href="/"
        className="p-1 font-medium flex gap-1  border-b md:border-b-0 md:border-r border-gray-700 px-4 py-2  md:py-0 uppercase "
      >
        Why we are

      </Link>
      <Link
        href="/"
        className="p-1 font-medium flex gap-1 border-b md:border-b-0 md:border-r border-gray-700 px-4 py-2  md:py-0 uppercase "
      >
        Problems & Solution

      </Link>
      <Link
        href="/products"
        className="p-1 font-medium flex gap-1  border-b md:border-b-0 md:border-r border-gray-700 px-4 py-2 md:py-0 uppercase"
      >
        Products

      </Link>
      <Link
        href="/contactus"
        className="p-1 font-medium flex gap-1  border-b md:border-b-0 md:border-r border-gray-700 px-4 py-2 md:py-0 uppercase"
      >
        Contact Us

      </Link>
      <Link
        href="/cart"
        className="p-1 font-medium flex gap-1 border-b md:border-b-0 md:border-r border-gray-700 px-4 uppercase py-2  md:py-0"
      >
        <IoCartSharp size={25} />
        <span className="bg-red-200 text-white rounded-full px-[8px] py-[1px]">{cart.length}</span>
      </Link>
      <button
        onClick={logoutHandler}
        className="p-1 font-medium text-md border px-4 py-1 border-gray-700 rounded-full"
      >
        Logout
      </button>
    </div>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-white">
      <Navbar className="px-6 pl-10 py-3 rounded-none ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-bold text-xl"
          >
            BuyIt
          </Link>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </div>

  );
}

export default NavbarSimple