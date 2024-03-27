import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsUiChecks } from 'react-icons/bs';

function Chat() {
  const [chattedUsers, setChattedUsers] = useState([]);
  const nav = useNavigate();

  const { data, isLoading, isError } = useQuery('chattedUsers', async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://ecommerce-api-shne.onrender.com/messages/getchattedusers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.uniqueChattedUsers.reverse();
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="w-full h-full">
      {data && data.length > 0 && data.map((user, index) => (
        <button key={index} onClick={() => handleRoute(user.userId._id)} className='px-2 h-16 rounded-3xl gap-3 w-full relative flex justify-start items-center mt-2 bg-stone-800 bg-opacity-50'>
          <img alt={user.userId.username} src={user.userId.image ? user.userId.image : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} className='w-12 h-12 rounded-full' />
          <div className='w-auto flex flex-col'>
            <div className='text-xs'>{user.userId.email}</div>
            <div className='text-xs text-start flex items-end'><BsUiChecks className='text-xl text-blue-400' /> last message </div>
          </div>
        </button>
      ))}
    </div>
  );

  function handleRoute(userId) {
    nav(`/chat/${userId}`);
  }
}

export default Chat;
