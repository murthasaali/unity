import React from 'react'
import AdminSidemenu from '../components/adminSidemenu'

function Sales() {
  return (
    <div className='bg-white justify-start items-start  flex p-1    flex-col w-full h-screen focus:outline-none '>
        <AdminSidemenu/>
        <h1 className='font-thin backdrop-blur-lg w-full text-center py-2 fixed rounded-full px-11' style={
            { background: 'linear-gradient(to right, #ff8c00, #ff2d55)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',}
        }>sales</h1>
    </div>
  )
}

export default Sales