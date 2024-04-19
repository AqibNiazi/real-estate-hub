'use client'
import React,{useState,useEffect} from 'react'
import { useParams } from 'next/navigation'
import { fetchProperty } from '@/utils/requests';
const PropertyPage = () => {
const {id}=useParams();
const [property, setproperty] = useState(null)
const [loading, setLoading] = useState(true)
useEffect(()=>{
  const fetchPropertyData=async ()=>{
    try {
      if(!id) return
      const property=await fetchProperty(id)
      setproperty(property)
    } catch (error) {
      console.error('Error fetching Property',error);
    }finally{
      setLoading(false)
    }  }
    if(property===null){
      fetchPropertyData()
    }
},[id,property])
  return (
    <div>
propertypage
    </div>
  )
}

export default PropertyPage