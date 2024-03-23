const token = localStorage.getItem('token');
   

    // Set token in headers
  export  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Ensure 'Bearer' prefix is included
    },
    };
