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
    const response = await axios.get('https://unity-backend-p0uh.onrender.com/messages/getchattedusers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.uniqueChattedUsers)
    setChattedUsers(response.data.uniqueChattedUsers)
    return response.data.uniqueChattedUsers.reverse();
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="w-full h-full justify-start items-center flex flex-col px-3">
        <div className="w-full md:w-[80%] flex">
              <p className="text-transparent bg-clip-text bg-gradient-to-r font-bold text-2xl   from-blue-500 to-purple-500">Messages...</p>


              </div>
      {  chattedUsers.map((user, index) => (
        <button key={index} onClick={() => handleRoute(user._id)} className='px-2 hover:scale-105 transition-all duration-300 h-16 rounded-3xl gap-3 md:w-[80%] w-full relative flex justify-start items-center mt-2 bg-stone-800 bg-opacity-50'>
          <img alt={user.username&&user.username} src={user.image ? user.image : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} className='w-12 h-12 rounded-full' />
          <div className='w-auto flex flex-col'>
            <div className='text-xs'>{user.email}</div>
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
