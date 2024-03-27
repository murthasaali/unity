import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsUiChecks } from 'react-icons/bs';

const socket = io('https://ecommerce-api-shne.onrender.com'); // Replace with your server URL

function Chat() {
  const [chattedUsers, setChattedUsers] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data);
    });

    fetchChattedUsers();

    return () => {
      socket.off('message');
    };
  }, []);

  const fetchChattedUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://ecommerce-api-shne.onrender.com/messages/getchattedusers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChattedUsers(response.data.uniqueChattedUsers);
    } catch (error) {
      console.error('Error fetching chatted users:', error);
    }
  };

  const handleRoute = (userId) => {
    nav(`/chat/${userId}`);
  };

  return (
    <div className="w-full h-full bg-cyan-400">
      <button className="w-full flex flex-col h-full justify-center items-center px-3">
        { chattedUsers.length > 0 && chattedUsers.map((user, index) => (
          <button key={index} onClick={() => handleRoute(user.userId._id)} className='px-2 h-16 rounded-3xl gap-3 w-full relative flex justify-start items-center mt-2 bg-stone-800 bg-opacity-50'>
            <img alt={user.userId.username} src={user.userId.image ? user.userId.image : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} className='w-12 h-12 rounded-full' />
            <div className='w-auto flex flex-col'>
              <div className='text-xs'>{user.userId.email}</div>
              <div className='text-xs text-start flex items-end'><BsUiChecks className='text-xl text-blue-400' /> last message </div>
            </div>
          </button>
        ))}
      </button>
    </div>
  );
}

export default Chat;
