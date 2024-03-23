import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { BiCheckDouble } from "react-icons/bi";
import UserChatModal from './userChatModal';
import Unfollowlist from './unfollowlist';

const socket = io('https://ecommerce-api-shne.onrender.com'); // Replace with your server URL

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chattedUsers, setChattedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [modalOpen, setModalOpen] = useState(false); // State for modal

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data);
    });

    // Fetch chatted users when component mounts
    fetchChattedUsers();

    return () => {
      // Clean up socket connection when component unmounts
      socket.off('message');
    };
  }, []);

  // Function to fetch chatted users
  const fetchChattedUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await axios.get('https://ecommerce-api-shne.onrender.com/messages/getchattedusers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChattedUsers(response.data.uniqueChattedUsers);
      console.log(response.data.uniqueChattedUsers)
    } catch (error) {
      console.error('Error fetching chatted users:', error);
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        senderId: localStorage.getItem('userId'),
        receiverId: '65d4aa9bf8eabcb3707fd65e', // Replace with the receiver's ID
        message: inputMessage,
      };
      socket.emit('message', newMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="w-full h-auto ">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message hidden">
            <p>{message.message}</p>
            <span>{message.receiverId}</span>
          </div>
        ))}
      </div> 
       <div className="input-container hidden">
        <input
          type="text"
          value={inputMessage}
          className='hidden'
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

        <button className="w-full flex flex-col justify-center px-3 items-start ">
          {chattedUsers.length>0?chattedUsers.map((user, index) => (
            <button key={index} onClick={() => { setSelectedUser(user.userId); setModalOpen(true); }} className='px-2 h-16 rounded-3xl gap-3 w-full relative flex justify-start items-center mt-2  bg-stone-800 bg-opacity-50'>
              <img alt={user.userId.username} src={user.userId.image?user.userId.image:"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} className='w-12 h-12 rounded-full'/>
              <div className='w-auto flex flex-col'>
                <div className='text-xs'>{user.userId.email} </div>
                <div className='text-xs text-start flex items-end'> <BiCheckDouble className='text-xl text-blue-400'/> last message </div>

              </div>
              {/* <div className='right-2 absolute text-xs '>{format(user.lastChatTime)}</div> */}
            </button>
          )):<Unfollowlist/>}
        </button>
          {selectedUser && <UserChatModal item={selectedUser} open={modalOpen} setOpen={setModalOpen} user={selectedUser}  sendMessage={sendMessage}/>}
    </div>
  );
}

export default Chat;
