import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { data } from 'autoprefixer';
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const currentDate = new Date();
  const differenceInSeconds = Math.floor((currentDate - date) / 1000);

  // Calculate time difference in minutes and hours
  const minutes = Math.floor(differenceInSeconds / 60);
  const hours = Math.floor(minutes / 60);

  // Format timestamp based on the time difference
  if (hours >= 24) {
    // If more than 24 hours, display date and time
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } else if (hours >= 1) {
    // If more than 1 hour, display hours ago
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes >= 1) {
    // If more than 1 minute, display minutes ago
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    // If less than 1 minute, display just now
    return 'Just now';
  }
}


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
              <div className='text-xs text-stone-300'> {formatDate(notification.timestamp)} ago</div>

            </p>
        </div> // Adjust this according to your notification structure
      ))}
      </div>
    </div>
  );
}

export default Notification;
