"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import Spinner from "@/components/Spinner";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
const ProfilePage = () => {
  const { data: session } = useSession();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const profileImage = session?.user?.image;
  const profileEmail = session?.user?.email;
  const profileName = session?.user?.name;
  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      setLoading(true);
      try {
        if (!userId) {
          throw new Error("User ID is not available");
        }
        const response = await axios.get(`/api/properties/user/${userId}`);
        if (response.status === 200) {
          setProperties(response.data);
        } else {
          throw new Error("Failed to fetch user properties");
        }
      } catch (error) {
        console.log(error);
        // You might want to provide feedback to the user here
      } finally {
        setLoading(false);
      }
    };

    if (session && session.user && session.user.id) {
      fetchUserProperties(session?.user?.id);
    }
  }, [session]);

  const handleDeleteProperty = async (PropertyId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirm) return;
    try {
      const response = await axios.delete(`/api/properties/${PropertyId}`);
      if (response.status >= 200 && response.status < 300) {
        // Remove the property from the state
        const updatedProperties = properties.filter(
          (property) => property._id !== PropertyId
        );
        setProperties(updatedProperties);
        toast.success(response?.data?.message);
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete property");
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties?.length === 0 && (
                <p>You have no recent property</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties?.map((property) => (
                  <div className="mb-10" key={property?._id}>
                    <Link href={`/properties/${property?._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property?.images[0]}
                        alt="Property 1"
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property?.name}</p>
                      <p className="text-gray-600">
                        Address: {property?.location?.street}{" "}
                        {property?.location?.city} {property?.location?.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
