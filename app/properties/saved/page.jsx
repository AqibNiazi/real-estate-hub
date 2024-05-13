"use client";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import axios from "axios";
import React, { useState, useEffect } from "react";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/bookmark");
        if (response.status >= 200 && response.status < 300) {
          setProperties(response?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-center text-xl mb-4 font-semibold">
              Saved Properties
            </h1>
            {properties?.length === 0 ? (
              <div className="text-center">No Saved Properties</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties?.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SavedPropertiesPage;
