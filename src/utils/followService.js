import axios from 'axios';
import toast from 'react-hot-toast'

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

    const response = await axios.post(`https://unity-dev-xbcq.3.us-1.fl0.io/follows/follow/${userIdToFollow}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    

    console.log(response.data);
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
    console.error('Error following user:', error);
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
