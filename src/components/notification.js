import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { data } from 'autoprefixer';

const fetchNotifications = async () => {
  try {
    const token =localStorage.getItem("token")
    const response = await axios.get(`https://unity-dev-xbcq.3.us-1.fl0.io/notification/getnotification`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response,data)
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
    <div className="w-full h-full flex flex-col gap-3 justify-start p-3">
      {data.map(notification => (
        <div className='text-white flex gap-2' key={notification.id}>
            <img className='h-10 w-10 rounded-full   ' src={notification.userId.image?notification.userId.image:"dcafsdfsdf"}/>
            <p className='font-thin text-md '>{notification.text}</p>
        </div> // Adjust this according to your notification structure
      ))}
    </div>
  );
}

export default Notification;
