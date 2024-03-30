import React,{useEffect} from 'react';
import { Routes, Route,  } from 'react-router-dom';
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
    const socket = io('https://unity-dev-xbcq.3.us-1.fl0.io'); // Replace with your server URL
    // Optionally, you can handle events or emit data here

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Define a function to check if user is authenticated
  const isAuthenticated = () => {
    return token && userId;
  };

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
