import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Registration() {
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email,password)

    try {
      // Make a POST request to your server to handle registration
      const response = await axios.post('https://ecommerce-api-shne.onrender.com/auth/register', {
        email:email,
        password:password,
      });

      // Assuming your server responds with the newly created user data
      console.log(response)
      const message=response.data.message
      
      alert(message)
      navigate("/login")
      if(response.status===400){
        alert("already exist")
      }
      // Update the state with the new user
      // Redirect to the login page
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <div className='  ' >
      <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-black " >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-2xl font-thin leading-9 tracking-tight ">create a new account</h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 p-4 bg-transparent  rounded-lg" onSubmit={handleRegistration}>
          <div>
            <div>
              <label className="block text-sm  leading-6 text-stone-100 font-thin">username</label>
              <div className="mt-2">
              <input placeholder='enter a username' name="name" type="text"  className="block bg-transparent placeholder:text-xs  w-full px-2  border-none py-1.5 text-stone-100 font-thin shadow-sm  " />
              </div>
            </div>
            <label className="block text-sm  leading-6 text-stone-100 font-thin">Email address</label>
            <div className="mt-2">
              <input placeholder='enter your email' name="email" type="email"  className="block placeholder:text-xs bg-transparent 0 w-full px-2  first-letter: border-0 py-1.5 text-stone-100 font-thin shadow-sm  " />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm  leading-6 text-stone-100 font-thin">Password</label>
              <div className="text-sm">
                <button  className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</button>
              </div>
            </div>
            <div className="mt-2">
              <input placeholder='enter a uniquw password...' htmlFor="password" name="password" type="password"  className="block placeholder:text-xs bg-transparent 0 w-full px-2  first-letter: border-0 py-1.5 text-stone-100 font-thin shadow-sm  " />
            </div>
          </div>

          <div>
            <button  type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

          <button className="mt-10 text-center text-sm text-gray-500" onClick={()=>navigate("/login")}>
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
}
