import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { data } from 'autoprefixer';

const fetchNotifications = async () => {
  try {
    const token =localStorage.getItem("token")
    const response = await axios.get(`https://unity-dev-xggp.3.us-1.fl0.io/notification/getnotification`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
          return response.data
  } catch (error) {
    throw new Error('Failed to fetch notifications');
  }
};

function useNotifications() {
  return useQuery('notifications', fetchNotifications);
}

function Notification() {
  const { data, isLoading, isError } = useNotifications();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching notifications</div>;
  }

  return (
    <div className="w-full h-full flex flex-col  justify-start items-center p-3">
      <div className='gap-2 flex  flex-col md:w-[80%]  w-full '>

      {data.map(notification => (
        <div className='text-white flex gap-2' key={notification.id}>
            <img className='h-10 w-10 rounded-full   ' src={notification.userId.image?notification.userId.image:"dcafsdfsdf"}/>
            <p className='font-thin text-md flex flex-col'>
              <div>{notification.text}</div>
              <div className='text-xs text-stone-300'>  1minutes ago</div>

            </p>
        </div> // Adjust this according to your notification structure
      ))}
      </div>
    </div>
  );
}

export default Notification;
