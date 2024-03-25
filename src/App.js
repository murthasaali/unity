import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { createContext } from 'react'
import {Toaster} from "react-hot-toast"
import AddProduct from './adimin/addProduct'
import AllProducts from './adimin/allProducts'
import Dashboard from './adimin/Dashboard'
import Sales from './adimin/sales'
import Users from './adimin/users'
// import LandingPge from './usersection/landingPge'
import Login from './usersection/login'
import { Registration } from './usersection/registration'
import UserCart from './usersection/cart'
import UserWishlist from './usersection/wishlist'
import EditProduct from './adimin/editAproduct'
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
            <Route path='/admin/add' element={<AddProduct />} />
            <Route path='/admin/all' element={<AllProducts />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/sales' element={<Sales />} />
            <Route path='/admin/userslist' element={<Users />} />
            <Route path='/admin/edit/:id' element={<EditProduct />} />
               <Route path='/login' element={<Login />} />
               <Route path='/reg' element={<Registration />} />
               <Route path='/' element={<Community />} />
               <Route path='/search' element={<Community />} />
               <Route path='/chat' element={<Community />} />
               <Route path='/account' element={<Community />} />
               <Route path='/notification' element={<Community />} />
               <Route path='/cart' element={<UserCart/>} />
               <Route path='/wishlist' element={<UserWishlist/>} />



            
           
    
          </Routes>
   

    </>
  )
}

export default App
