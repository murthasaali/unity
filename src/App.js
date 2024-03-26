import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createContext } from 'react';
import { Toaster } from "react-hot-toast";
import Login from './usersection/login';
import { Registration } from './usersection/registration';
import Community from './usersection/community';
import UserDetails from './usersection/userDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
export const mycontext = createContext();

function App() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Define a function to check if user is authenticated
  const isAuthenticated = () => {
    return token && userId;
  };

  return (
    <>
        <QueryClientProvider client={queryClient}>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/reg' element={<Registration />} />
            <Route path='/' element={<Community />} />
            <Route path='/search' element={<Community />} />
            <Route path='/user/:userId' element={<UserDetails />} />
            <Route path='/chat' element={<Community />} />
            <Route path='/account' element={<Community />} />
            <Route path='/notification' element={<Community />} />
          <Route path='*' element={<Navigate to="/logi" />} />
      </Routes>
      </QueryClientProvider>

    </>
  );
}

export default App;
