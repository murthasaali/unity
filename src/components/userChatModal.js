// Import necessary modules and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { IoSend } from "react-icons/io5";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../utils/communityServices";
import { MdKeyboardVoice } from "react-icons/md";
import { FaImage, FaArrowLeft, FaCamera } from "react-icons/fa6";
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

// Initialize socket connection
const socket = io("https://unity-dev-xggp.3.us-1.fl0.io");

function UserChatModal() {
  const nav = useNavigate();

  // Retrieve necessary data from local storage and URL parameters
  const senderId = localStorage.getItem("userId");
  const { userId } = useParams();

  // State variables for chat history and new message
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch user profile using React Query
  const { data: item, isLoading, isError } = useQuery(["item", userId], () => getUserProfile(userId));

  // Function to fetch chat history from the server


  // Effect hook to handle socket events and fetch initial chat history
// Effect hook to handle socket events and fetch initial chat history
useEffect(() => {
  const joinId = [senderId, userId].sort().join(""); // Create a unique join ID by sorting and concatenating senderId and userId
  const fetchChatHistory = async (receiverId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://unity-dev-xggp.3.us-1.fl0.io/messages/user/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChatHistory(response.data.messages.reverse());
    } catch (error) {
      console.error('Error fetching chat history:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  // Join room when component mounts with the unique join ID
  socket.emit("join",joinId);
 
  // Listen for incoming messages
  socket.on("message", (data) => {
    const is=data.senderId===senderId
    console.log(is)
    if(is)
    {setChatHistory(prevChatHistory => [
      ...prevChatHistory,
      { senderId: data.senderId, text: data.text, type: "sent" }
    ]);}else{
      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        { senderId: data.senderId, text: data.text, type: "recieved" }
      ]);
    }
    console.log(data)
  });
fetchChatHistory(userId)
  // Clean up event listener when component unmounts
  return () => {
    socket.off("message");
  };
}, []);

  // Function to send a message
  const sendMessage = async () => {
    if (!message.trim()) {
      console.error("Message cannot be empty");
      return;
    }

    try {
      // Emit the message via socket.io
      const joinId = [senderId, userId].sort().join(""); // Create a unique join ID by sorting and concatenating senderId and userId

      socket.emit("message", { senderId, receiverId: userId, text: message });
      socket.emit("join",joinId);


      // Update chat history with the new message
  
      // Clear the message input
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Return JSX for rendering the chat modal
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="md:h-[650px] h-[100%] bg-opacity-40 bg-stone-800 w-full md:w-[750px] overflow-y-scroll flex flex-col justify-between items-center md:p-4 p-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {/* Header section */}
        <div className=" top-0 left-0 right-0 h-16 gap-2 flex justify-between items-center  w-full m-3">
          <div className="w-auto flex justify-center items-center">
            <button className="h-full w-16 flex justify-center items-center " onClick={()=>nav("/chat")}>
              <FaArrowLeft />
            </button>
            <img src={item && item.image} className="w-12 h-12 rounded-full" alt={item && item.username} />
            <div className="flex flex-col gap-1">
              <div className="text-stone-200 text-opacity-70">{item && item.email}</div>
              <div className="text-stone-200 text-xs">{item && item.username}</div>
            </div>
          </div>
        </div>

        {/* Chat history section */}
        <div className="h-full    w-full overflow-y-scroll">
          {chatHistory&&chatHistory.map((message, index) => (
            <div className="text-white w-full py-1 px-2 font-thin" key={index}>
              {message.type  === "sent" ? (
                <div className="w-full flex h-auto justify-end">
                  <div className="text-white text-opacity-80 w-fit font-thin text-xs py-1 px-4 text-end bg-white 0 bg-opacity-20 rounded-b-2xl rounded-tl-2xl">{message.text}</div>
                </div>
              ) : (
                <div className="w-full flex h-auto justify-start">
                  <div className="text-white text-opacity-80 w-fit font-thin text-xs py-1 px-4 text-end bg-stone-300 bg-opacity-20 rounded-b-2xl rounded-tl-2xl">{message.text}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message input section */}
        <div className=" bottom-0 left-3 right-0 bg-gray-600 bg-opacity-40 rounded-full h-12 w-full flex justify-between px-3 gap-0">
          <div className="flex px-3 w-96">
            <button>
              <FaCamera className="text-xl" />
            </button>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." className="w-[100%] px-5 bg-transparent bg-opacity-40 placeholder:text-xs h-full rounded-2xl gap-2 outline-none" />
          </div>

          <div className="flex justify-end items-center h-full gap-2">
            <button className="h-8 p-0 flex justify-center items-center w-8 rounded-full transition-all duration-300">
              <BsEmojiSmileFill className="text-yellow-400 text-2xl" />
            </button>
            <button><MdKeyboardVoice className="text-2xl" /></button>{" "}
            <button><FaImage className="text-xl" /></button>
            <button onClick={sendMessage} type="submit" className="h-8 relative bg-blue-500 px-3 py-3 flex justify-center items-center rounded-full transition-all duration-300">
              <IoSend className="text-white text-sm text-opacity-95" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChatModal;
