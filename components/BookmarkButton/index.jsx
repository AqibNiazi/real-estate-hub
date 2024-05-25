"use client";
import React, { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";
import { apiDomain } from "@/utils/requests";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    const checkBookmarkStatus = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`${apiDomain}/bookmark/check`, {
          propertyId: property._id,
        });
        if (res?.status === 200) {
          setIsBookmarked(res?.data?.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please Signin to bookmark a property");
      return;
    }
    try {
      const res = await axios.post(`${apiDomain}/bookmark`, {
        propertyId: property._id,
      });
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        setIsBookmarked(res?.data?.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <button
      onClick={handleClick}
      className={`${
        isBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      }  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className="mr-2" />{" "}
      {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
