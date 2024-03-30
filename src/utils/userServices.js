import axios from 'axios';
import { toast } from 'react-hot-toast'; // Assuming you are using react-toastify for notifications

export const addToWishlist = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log(userId, token);

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await axios.post(
      `https://unity-dev-xbcq.3.us-1.fl0.io/wishlist/add-to-wishlist/${productId}?userId=${userId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure 'Bearer' prefix is included
        },
      }
    );
    console.log(response);
    toast.success(response.data.message);
  } catch (error) {
    console.error('Error adding to wishlist:', error.message);
    toast.error(error.message); // Notify user about the error
  }
};

export const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log("token and userId", token, userId);

    if (!token) {
      console.error('Token is not available');
      return;
    }

    const response = await axios.post(
      `https://unity-dev-xbcq.3.us-1.fl0.io/cart/add-to-cart/${productId}?userId=${userId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure 'Bearer' prefix is included
        },  
      }
    );

    console.log(response);
    toast.success(response.data.message);
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    toast.error(error.message); // Notify user about the error
  }
};
export const fetchData = async () => {
    try {
      const response = await axios.get('https://unity-dev-xbcq.3.us-1.fl0.io/admin/get');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching products: ' + error.message);
    }
  };

  
export const removeFromCart = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    console.log(userId)

    if (!token) {
      console.error('Token is not available');
      return;
    } 

    const response = await axios.delete(
      `https://unity-dev-xbcq.3.us-1.fl0.io/cart/remove-from-cart/${productId}?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    

    console.log(response);
    toast.success(response.data.message);
  } catch (error) {
    console.error('Error removing from cart:', error.message);
    toast.error(error.message);
  }
};

export const getCartProduct = async (setData) => {
  try {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.log("User ID or token is missing from localStorage.");
      return;
    }

    const response = await axios.get(`https://unity-dev-xbcq.3.us-1.fl0.io/cart/getcart?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("response", response.data);
    setData(response.data); // Update data state variable
  } catch (error) {
    console.log("error", error);
  }
};
