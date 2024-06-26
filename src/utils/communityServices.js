// communityServices.js

import axios from 'axios';
import toast from 'react-hot-toast'
// Function to fetch all posts
export const getAllPosts = async (pagenum,limit) => {
    try {
      const token=localStorage.getItem("token")
      console.log(token)
    // Send a GET request to the appropriate endpoint to fetch all posts
    const response = await axios.get(`https://unity-backend-p0uh.onrender.com/posts/getposts/${limit}/?page=${pagenum}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    // Return the data from the response
    // console.log(response.data)   
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching all posts:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};



export const likeaPost = async (postId,username) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);

    // Send a POST request to the appropriate endpoint to like the post
    const response = await axios.post(
      `https://unity-backend-p0uh.onrender.com/posts/likepost`,
      { postId ,username}, // Sending postId in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Return the data from the response

    
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error('Error liking the post:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

// Function to fetch user profile
export const getUserProfile = async (user) => {
  try {
    const token = localStorage.getItem("token");
    let userId; // Declare userId variable outside of the condition
    
    if (!user) {
      userId = localStorage.getItem("userId"); // Assign userId if user is provided
    } else {
      // If user is not provided, use the value of user directly
      userId = user;
    }
    console.log(token);

    // Send a GET request to the appropriate endpoint to fetch user profile
    const response = await axios.get(`https://unity-backend-p0uh.onrender.com/auth/getUserDetails/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Return the data from the response
    console.log(response.data);
    return response.data.user;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching user profile:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};


export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    console.log(postId);
    
    // Send a DELETE request to the appropriate endpoint to delete the post
    const response = await axios.delete(
      `https://unity-backend-p0uh.onrender.com/posts/delete/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Return the data from the response
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    // Handle any errors
    console.error('Error deleting the post:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export const getAllcomments = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    console.log("postidp",postId);

    // Send a DELETE request to the appropriate endpoint to delete the post
    const response = await axios.get(
      `https://unity-backend-p0uh.onrender.com/posts/getAllComment/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Return the data from the response
    console.log(response.data);
    
    return response.data.comments;
  } catch (error) {
    // Handle any errors
    console.error('Error getting comments:', error);
  }
};


export const commentPost = async (postId, text) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post('https://unity-backend-p0uh.onrender.com/posts/commentpost', {
      postId: postId,
      text: text
    },      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // Return the response data if needed
  } catch (error) {
    throw error; // Throw error if request fails
  }
};

export const getAPost = async (postId) => {
  try {
    const token = localStorage.getItem("token");

    // Send a GET request to the appropriate endpoint to fetch a single post
    const response = await axios.get(`https://unity-backend-p0uh.onrender.com/posts/getapost/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Return the data from the response
    console.log(response.data)
    return response.data.post;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching a post:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
