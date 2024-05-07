import React from 'react'
import '../assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
  title: "Property Pulse | Find Perfect Rental",
  description: "Find your dream Rental Property",
  keywords: "Rentals,Find Rentals,Find Property",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout