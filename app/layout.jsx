import React from 'react'
import '../assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from "@/components/AuthProvider";
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
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout