import React from 'react'
import '../assets/styles/globals.css'
import Navbar from '@/components/Navbar'
export const metadata =  { 
  title:"Property Pulse | Find Perfect Rental",
  description:"Find your dream Rental Property",
  keywords:"Rentals,Find Rentals,Find Property"
 }

const MainLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
          <Navbar/>
         <main>{children}</main>
        </body>
    </html>
  )
}

export default MainLayout