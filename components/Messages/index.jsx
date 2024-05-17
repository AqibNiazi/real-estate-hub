"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

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
  return <div>Messages</div>;
};

export default Messages;
