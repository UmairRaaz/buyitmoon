"use client";
import React, { useContext, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";

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
    <div className="my-2 flex flex-col gap-2 text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4">
      <Link href="/products"
        className="p-1 font-medium text-md"
      >
        Products
      </Link>

      <Link
        href="/wishlist"
        className="p-1 font-medium flex gap-1  "
      >
        <IoIosHeart size={25} />
        <span className="bg-red-200 text-white rounded-full px-[8px] py-[1px]">{wishlist.length}</span>

      </Link>
      <Link
        href="/cart"
        className="p-1 font-medium flex gap-1 "
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
    <div className="md:px-24 md:py-4">
      <Navbar className="-xl px-6 py-3 ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-bold"
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