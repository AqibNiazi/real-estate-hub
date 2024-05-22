import axios from "axios";
import React, { useState, useEffect } from "react";

const UnreadMessageCount = ({ session }) => {
  const [unReadCount, setUnReadCount] = useState(0);
  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        if (!session) return;
        const response = await axios.get("/api/messages/unread-count");
        console.log("response", response);

        if (response.status >= 200 && response.status < 300) {
          const data = response?.data?.count;
          setUnReadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnreadMessages();
  }, [session]);
  console.log("unRead count", unReadCount);
  return (
    unReadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unReadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;
