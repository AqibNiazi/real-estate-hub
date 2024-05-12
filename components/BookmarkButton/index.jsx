"use client";
import React, { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userId = session?.user?.id;

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please Signin to bookmark a property");
      return;
    }
    try {
      const res = await fetch("/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });
      if (res?.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data?.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
