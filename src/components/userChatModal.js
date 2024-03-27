import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../utils/communityServices";
import { MdKeyboardVoice } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { FaArrowLeft, FaCamera } from "react-icons/fa6";
import {useQuery} from 'react-query'
const socket = io("https://ecommerce-api-shne.onrender.com");

function UserChatModal() {
  const token = localStorage.getItem("token");
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const senderId = localStorage.getItem("userId");
  const { userId } = useParams();

  const { data: item, isLoading, isError } = useQuery(
    ["item", userId],
    () => getUserProfile(userId)
  );

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `https://ecommerce-api-shne.onrender.com/messages/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChatHistory(response.data.messages.reverse());
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    if (token) {
      fetchChatHistory();
    }

    // Join room when component mounts
    socket.emit("join", senderId);

    // Listen for incoming messages
    socket.on("message", (data) => {
      setChatHistory((abc)=>[...abc, { senderId: data.senderId, message: data.message }]);
      console.log(chatHistory)
    });

    return () => {
      socket.off("message"); // Cleanup event listener when component unmounts
    };
  }, []);
  const sendMessage = async () => {
    if (!message.trim()) {
      console.error("Message cannot be empty");
      return;
    }
  
    try {
      // Emit the message via socket.io
      socket.emit("join", userId);
      socket.emit("message", { senderId, receiverId: userId, message });
  
      // Update chatHistory using the functional update form
    
  
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="md:h-[650px] h-[100%] bg-opacity-40 bg-stone-800 w-full md:w-[750px] overflow-y-scroll flex flex-col justify-between items-center md:p-4 p-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className=" top-0 left-0 right-0 h-16 gap-2 flex justify-between items-center  w-full m-3">
          <div className="w-auto flex justify-center items-center">
            <button className="h-full w-16 flex justify-center items-center ">
              <FaArrowLeft />
            </button>
            <img src={item && item.image} className="w-12 h-12 rounded-full" alt={item && item.username} />
            <div className="flex flex-col gap-1">
              <div className="text-stone-200 text-opacity-70">{item && item.email}</div>
              <div className="text-stone-200 text-xs">{item && item.username}</div>
            </div>
          </div>
        </div>

        <div className="h-full    w-full overflow-y-scroll">
          {chatHistory.map((message, index) => (
            <div className="text-white w-full py-1 px-2 font-thin" key={index}>
              {senderId === message.senderId ? (
                <div className="w-full flex h-auto justify-end">
                  <div className="text-white text-opacity-80 w-fit font-thin text-xs py-1 px-4 text-end bg-white 0 bg-opacity-20 rounded-b-2xl rounded-tl-2xl">{message.message}</div>
                </div>
              ) : (
                <div className="w-full flex h-auto justify-start">
                  <div className="text-white text-opacity-80 w-fit font-thin text-xs py-1 px-4 text-end bg-stone-300 bg-opacity-20 rounded-b-2xl rounded-tl-2xl">{message.message}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className=" bottom-0 left-3 right-0 bg-gray-600 bg-opacity-40 rounded-full h-16 w-full flex justify-between items-center px-3 gap-0">
          <div className="flex px-3 w-96">
            <button>
              <FaCamera className="text-xl" />
            </button>
            <input value={message} onChange={(e) => setMessage(e.target.value)}  placeholder="Type your message..." className="w-[100%] px-5 bg-transparent bg-opacity-40 placeholder:text-xs h-full rounded-2xl gap-2 outline-none" />
          </div>

          <div className="flex justify-end items-center h-full gap-2">
            <button className="h-8 p-0 flex justify-center items-center w-8 rounded-full transition-all duration-300">
              <BsEmojiSmileFill className="text-yellow-400 text-2xl" />
            </button>
            <button><MdKeyboardVoice className="text-2xl" /></button>{" "}
            <button><FaImage className="text-xl" /></button>
            <button onClick={sendMessage}  type="submit" className="h-8 relative bg-blue-500 px-3 py-3 flex justify-center items-center rounded-full transition-all duration-300">
              <IoSend className="text-white text-sm text-opacity-95" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChatModal;
