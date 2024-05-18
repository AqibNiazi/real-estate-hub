"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Message from "../Message";
import Spinner from "../Spinner";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/messages");
        if (response.status >= 200 && response.status < 300) {
          setMessages(response.data);
        }
      } catch (error) {
        console.log("error fetching messages", error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);
  console.log("messages", messages);
  if (loading) {
    return <Spinner loading={loading} />;
  }
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages?.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages?.map((message) => (
                <Message key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
