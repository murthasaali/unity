import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { createContext } from 'react'
import {Toaster} from "react-hot-toast"
import Login from './usersection/login'
import { Registration } from './usersection/registration'
import Community from './usersection/community'
import Bottombar from './components/bottombar'
import AnimatedCursor from "react-animated-cursor"

export const mycontext = createContext()
function App() {
 
  





  return (
    <>
       
       
          <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <AnimatedCursor/>

               <Bottombar/>
          <Routes>
            {/* <Route path='/' element={<LandingPge />} /> */}
         
               <Route path='/login' element={<Login />} />
               <Route path='/reg' element={<Registration />} />
               <Route path='/' element={<Community />} />
               <Route path='/search' element={<Community />} />
               <Route path='/chat' element={<Community />} />
               <Route path='/account' element={<Community />} />
               <Route path='/notification' element={<Community />} />



            
           
    
          </Routes>
   

    </>
  )
}

export default App
