"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/properties/search?location=${location}%propertyType=${propertyType}`
        );
        if (response.status >= 200 && response.status < 300) {
          setProperties(response.data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);
  console.log(properties);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <Link
          href="/properties"
          className="flex items-center text-blue-500 hover:underline mb-3"
        >
          <FaArrowAltCircleLeft className="mr-2" /> back to properties
        </Link>
        <h1 className="text-2xl font-bold">Search Results</h1>
        {properties?.length === 0 ? (
          <div>No Search Results found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
