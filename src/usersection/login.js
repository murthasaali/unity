import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setToken,setUserid } from '../redux/authSlice';

function Login() {

const dispatch=useDispatch()
const token = useSelector(state => state.auth.token); // Accessing token from Redux store
console.log(token)
  const hendle =async (e) => {
    e.preventDefault()
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    console.log(email,password)
    try {
      // Make a POST request to your server to handle registration
      const response = await axios.post('https://ecommerce-api-shne.onrender.com/auth/login', {
        email:email,
        password:password,
      });

      // Assuming your server responds with the newly created user data
      console.log(response.data.id)
      const message=response.data.message
      dispatch(setToken(response.data.data))
      dispatch(setUserid(response.data.id))
      
      
      alert(message)
      if(response.status===400){
        alert("already exist")
      }
      // Update the state with the new user
navigate('/')
      // Redirect to the login page
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle error, e.g., display an error message to the user
    }
  

   
    
    
  }
 
  const navigate = useNavigate()

  const toreg = () => {
    navigate('/reg')
  }
  return (
    <div className=' h-screen w-screen flex justify-center items-center' style={{
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
    }}>
      <div className="flex  flex-col justify-center w-full h-full    py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h1 className="mt-10 text-center text-2xl font-thin leading-9 tracking-tight text-gray-900">Sign in to your account</h1>
        </div>


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 bg-stone-200 bg-opacity-60 p-4 rounded-lg justify-center items-center" onSubmit={hendle}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">username</label>
              <div className="mt-2">
                <input name="email" type="email" className="block  px-3 w-full bg-stone-800  bg-opacity-25 rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block  px-3 text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <button  className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</button>
                </div>
              </div>
              <div className="mt-2">
              <input  name="password"  type='password' required className="block  px-3 w-full bg-stone-800  bg-opacity-25 rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <button type="submit" className="flex  justify-center rounded-md bg-stone-950 bg-opacity-90 w-1/2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>

          <button className="mt-10 text-center text-sm text-gray-500" onClick={toreg}>
            Not a member?
          </button>
        </div>
      </div>
      </div>
   
  )
}

export default Login