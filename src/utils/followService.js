import axios from 'axios';
import toast from 'react-hot-toast'

import { io } from 'socket.io-client'; // Import io from socket.io-client

export const getAllUnfollowedUsers = async (userId) => {
  try {

    const token = localStorage.getItem("token")
    

    const response = await axios.get(`https://unity-dev-xbcq.3.us-1.fl0.io/follows/unfollowingusers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data);
    return response.data.reverse();
  } catch (error) {
    console.error('Error fetching unfollowed users:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const followUser = async (userIdToFollow,name) => {
  try {
    const token = localStorage.getItem("token");
    const socket = io('https://unity-dev-xbcq.3.us-1.fl0.io',{
      cors: {
        origin: "https://unity-dev-xbcq.3.us-1.fl0.io",
        methods: ["GET", "POST"]
      }
    }); // Replace with your server URL

    const response = await axios.post(`http://localhost:3001/follows/follow/${userIdToFollow}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const userId = localStorage.getItem("userId");

    console.log(response.data);
    socket.emit('notification',  userId );

    toast(`you started following ${name}`,
    {
      icon: '👏',
      style: {
        borderRadius: '5px',
        background: '#333',
        color: '#fff',
        fontSize: '10px', /* Adjust the font size */
        fontWeight: '100', /* Adjust the font weight */
        padding: '5px', /* Adjust padding */
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', /* Add shadow */
        textAlign: 'center', /* Center align text */
      },
    }
  );
  
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error setting up request:', error.message);
    }
    throw error; // Re-throw the error to be caught by the caller
  }
};


export const getAllFollowers = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`http://localhost:3001/follows/getAllFollowers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("followers",response.data);
    return response.data.reverse(); // Reverse the order if needed
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
