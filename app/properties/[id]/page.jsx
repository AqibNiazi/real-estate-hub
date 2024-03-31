'use client'
import React from 'react'
import { useRouter,useParams, useSearchParams, usePathname } from 'next/navigation';
const PropertyPage = () => {
    const router=useRouter()
    const {id}=useParams()
    const searchParams=useSearchParams()
    const name=searchParams.get('name')
    const pathname=usePathname()
  return (
    <div>
        <button onClick={()=>router.push("/")} className="bg-blue-700 text-lg px-4 py-2 capitalize">Go Home {id} {name} {pathname}</button>
    </div>
  )
}

export default PropertyPage