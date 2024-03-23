import React from 'react'
import { FaCartShopping, FaHeart, FaHouse, FaUser } from 'react-icons/fa6'
import { MdMessage } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function Bottombar() {
  const nav = useNavigate()
  return (
    <div className='w-full bg-black h-auto fixed p-2 flex md:hidden justify-evenly  bottom-0 z-50'>
      <button className="bg-black text-green-500" onClick={() => { nav("/") }}><FaHouse /></button>
      <button className="bg-black text-green-500" onClick={() => { nav("/community") }}><MdMessage /></button>
      <button className="bg-black text-green-500" onClick={() => { nav("/wishlist") }}><FaHeart /></button>
      <button className="bg-black text-green-500" onClick={() => { nav("/cart") }}><FaCartShopping /></button>
      <button className="bg-black text-green-500" onClick={() => { }}><FaUser /></button>
    </div>
  )
}

export default Bottombar