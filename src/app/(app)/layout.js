import { Inter } from "next/font/google";
import "../globals.css";
import NavbarSimple from "../components/Navbar";
import ProductContextProvider from "@/context/ProductContextProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buy-It App",
  description: "Developed By Umair Ali",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductContextProvider>
          <NavbarSimple />
          <div>
          <Toaster position="bottom-center" />
            {children}
          </div>
        </ProductContextProvider>
      </body>
    </html>
  );
}

