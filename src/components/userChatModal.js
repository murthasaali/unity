import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {  RiLoginCircleLine } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

import axios from 'axios'; // Import Axios
import io from 'socket.io-client'; // Import Socket.IO client library
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmileFill } from 'react-icons/bs';

const socket = io('http://localhost:3001'); // Connect to your Socket.IO server

function UserChatModal({ setOpen, open, item }) {
  const onCloseModal = () => setOpen(false);
  const token = localStorage.getItem("token");
  console.log("bfore", item._id)
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]); // State to store chat history
  const [message, setMessage] = useState('');
  const senderId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        console.log("after", item._id)
        const response = await axios.get(`http://localhost:3001/messages/user/${item._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Set chat history state with response data
        setChatHistory(response.data.messages.reverse());
        // console.log(localStorage.getItem("userId"))
        console.log("history", response.data.messages)
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    // Fetch chat history when modal opens
    if (open && token) {
      fetchChatHistory();
    }
    return () => {
      setChatHistory([]);
    };
  }, [open, item._id, token]);

  const sendMessage = () => {
    console.log("message sending")
    const senderId = localStorage.getItem("userId")
    const receiverId = item._id
    // Emit 'message' event to the server with message data, senderId, and receiverId
    socket.emit('message', { senderId, receiverId, message });
    // Clear message input field
    setMessage('');

  };
  return (
    <div>
      {token ?
        <button className="w-full rounded-full" onClick={() => setOpen(true)}>
          {" "}
        </button>
        :
        <button onClick={() => navigate("/login")} className='p-2 rounded-full bg-black text-xl'>
          <RiLoginCircleLine className='text-white' />
        </button>
      }
      <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'bg-transparent p-3 rounded-lg backdrop-blur-md md:w-[500px] w-80 h-[550px]', closeButton: 'text-white' }}>
        <div className="fixed top-0 left-0 right-0 h-16 gap-2 flex w-full m-3">
          <img src={item.image} className='w-12 h-12 rounded-full' alt={item.email}/>
          <div className='flex flex-col gap-1'>
            <div className='text-stone-200 text-opacity-70'>{item.email}</div>
          </div>
        </div>

        <div className='h-[380px] mt-16 w-full overflow-y-scroll'>
          {chatHistory &&
            chatHistory.map((message, index) => (
              <div className='text-white w-full py-1 px-2 font-thin ' key={index}>
                {senderId === message.senderId
                  ?
                  <div key={index} className='w-full flex h-auto justify-end'>

                    <div className='text-stone-50 text-opacity-80 w-fit font-thin text-xs py-1 px-4   text-end bg-stone-300 bg-opacity-20 rounded-b-2xl rounded-tl-2xl ' >{message.message}</div>
                  </div> :
                  <div key={index} className='w-full flex h-auto justify-start'>

                    <div className='text-stone-50 text-opacity-80 w-fit font-thin text-xs py-1 px-4   text-end bg-stone-300 bg-opacity-20 rounded-b-2xl rounded-tl-2xl ' >{message.message}</div>
                  </div>
                }
              </div>
            ))
          }
        </div>

        <div className='fixed bottom-3 left-3 right-0 h-12 w-full flex gap-0'>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className='w-[72%] px-5 bg-transparent bg-opacity-40 h-full rounded-2xl gap-2'
          />
          {/* <button
      
      className='text-3xl w-[15%] h-full flex justify-center items-center text-stone-100'
    > 
      <BiChevronRight/>
    </button> */}
          <button className='h-8 p-0 flex justify-center items-center w-8 rounded-full  transition-all duration-300'>
            <BsEmojiSmileFill className=' text-yellow-400 text-2xl' />
          </button>
          <button
            onClick={sendMessage} type='submit' className='h-8 relative bg-blue-500 px-3 py-3 flex justify-center items-center  rounded-full  transition-all duration-300'>
            <IoSend className='text-white text-sm text-opacity-95' />
            <span className='absolute text-xs text-white bottom-[-14px] font-extralight'>send</span>

          </button>
        </div>
      </Modal>
    </div>

  )
}

export default UserChatModal;
