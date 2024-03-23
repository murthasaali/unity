import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidemenu from '../components/adminSidemenu';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    // Fetch list of users from backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products/getallusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='bg-white justify-start items-center flex flex-col w-full h-screen focus:outline-none'>
      <AdminSidemenu />
      <h1 className='font-thin backdrop-blur-lg w-full text-center py-2 fixed rounded-full px-11' style={
        {
          background: 'linear-gradient(to right, #ff8c00, #ff2d55)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }
      }>Users</h1>
      <div className="m-8">
        <h2 className="text-lg font-semibold mb-10 w-full h-auto items-center">User List</h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={(index % 2 === 0) ? "bg-gray-100" : ""}>
                <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                <td className="border border-gray-400 px-4 py-2">{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
