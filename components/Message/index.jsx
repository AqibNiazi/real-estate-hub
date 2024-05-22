"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";
const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnReadCount } = useGlobalContext();
  const handleReadStatus = async () => {
    try {
      const response = await axios.put(`/api/messages/${message?._id}`);
      if (response.status === 200) {
        const messageObject = response?.data;
        const read = messageObject?.read;

        setIsRead(read);
        setUnReadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read === true) {
          toast.success("Mark as read");
        } else {
          toast.success("Mark as new");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/messages/${message?._id}`);

      if (response?.status === 200) {
        setIsDeleted(true);
        setUnReadCount((prevCount) => prevCount - 1);
        toast.success(response.data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Message not deleted");
    }
  };
  if (isDeleted) {
    return null;
  }
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-2 py-1">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message?.property?.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Name: </strong> {message.sender.username}
        </li>
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message?.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } outline-none   py-1 px-3 rounded-md`}
        type="button"
        onClick={handleReadStatus}
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
