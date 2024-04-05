import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createContext } from 'react';
import { Toaster } from "react-hot-toast";
import Login from './usersection/login';
import { Registration } from './usersection/registration';
import Community from './usersection/community';
import UserDetails from './usersection/userDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserChatModal from './components/userChatModal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { io } from 'socket.io-client';

const queryClient = new QueryClient();
export const mycontext = createContext();

function App() {
  useEffect(() => {
    // Establish the Socket.IO connection
    const socket = io('https://unity-backend-p0uh.onrender.com'); // Replace with your server URL
    const userId = localStorage.getItem("userId");
  
    // Check if user is authenticated
    if (userId) {
      // Join the notification room using the user ID

      socket.emit('notification', userId);
      console.log(`User joined notification room for user ID ${userId}`);
    }
  
    // Listen for 'notification' event
    socket.on('notification', (data) => {
      console.log('Notification received:', data);
    });
  
    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  

  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/chat/:userId' element={<UserChatModal />} />
          <Route path='/reg' element={<Registration />} />
          <Route path='/' element={<Community />} />
          <Route path='/search' element={<Community />} />
          <Route path='/user/:userId' element={<UserDetails />} />
          <Route path='/chat' element={<Community />} />
          <Route path='/account' element={<Community />} />
          <Route path='/notification' element={<Community />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
