import React,{useEffect} from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNotificationCount } from '../redux/authSlice';
import { formatTimestamp } from '../constants/formatetime/fromatTime';

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const currentDate = new Date();
  const differenceInSeconds = Math.floor((currentDate - date) / 1000);

  // Calculate time difference in minutes and hours
  const minutes = Math.floor(differenceInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Format timestamp based on the time difference
  if (days === 0) {
    return 'Today';
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days <= 7) {
    return `${days} days ago`;
  } else {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}



const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await axios.get(`https://unity-dev-xggp.3.us-1.fl0.io/notification/getnotification`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data)
    return response.data.reverse()
  } catch (error) {

    throw new Error('Failed to fetch notifications');
  }
};




function useNotifications() {
  return useQuery('notifications', fetchNotifications);
}

function Notification() {
  const dispatch = useDispatch(); // Move useDispatch inside the functional component

  useEffect(() => {
    return () => {
      dispatch(setNotificationCount(0))
    }
  }, [])
  const { data, isLoading, isError } = useNotifications();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching notifications</div>;
  }

  // Group notifications based on their timestamps
  const groupedNotifications = data.reduce((acc, notification) => {
    const category = formatDate(notification.timestamp);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(notification);
    return acc;
  }, {});

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-3">
      <div className='gap-2 flex flex-col md:w-[80%] w-full '>
        {Object.entries(groupedNotifications).map(([category, notifications]) => (
          <div key={category} className='mt-4' >
            <h2 className="text-xl font-semibold ">{category}</h2>
            {notifications.map(notification => (
              <div className='flex justify-between items-center'>

              <div className='text-white flex gap-2 mt-2' key={notification.id}>
                <img className='h-10 w-10 rounded-full' src={notification.userId.image ? notification.userId.image : "default-image-url"} alt="User Avatar" />
                <p className='font-thin text-md flex flex-col'>
                  <div>{notification.text}</div>
                  <div className='text-xs text-stone-300'> {formatTimestamp(notification.timestamp)} </div>
                </p>
              </div>
           { 
           notification.image&&
           <img src={notification.image&&notification.image} className='h-8 w-8'/>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
