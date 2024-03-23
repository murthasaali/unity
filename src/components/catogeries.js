import React from 'react'
import bird from '../assets/birdicon.png'
import cat from '../assets/caticon.png'
import dog from '../assets/dogicon.png'
import fish from '../assets/fishicon.png'
import vetinery from '../assets/vetinery.png'
function Catogeries() {
  return (
    <div className='w-full  flex flex-col'>
<h1 className='w-full text-center font-thin'>catogeries</h1>
<div className='justify-center w-full items-center md:p-10 p-4 h-auto flex md:gap-10 gap-2'>
<button className='md:w-24 w-14  md:h-24 h-14 rounded-full p-1 bg-white'><div className='border-2   border-yellow-500 hover:bg-yellow-400 hover:shadow-2xl w-full flex justify-center items-center h-full rounded-full'><img  alt='icon' src={bird}  className='h-8 w-8'/></div></button>
<button className='md:w-24 w-14  md:h-24 h-14 rounded-full p-1 bg-white'><div className='border-2   border-yellow-500 hover:bg-yellow-400 hover:shadow-2xl w-full flex justify-center items-center h-full rounded-full'><img  alt='icon' src={cat}  className='h-8 w-8'/></div></button>
<button className='md:w-24 w-14  md:h-24 h-14 rounded-full p-1 bg-white'><div className='border-2   border-yellow-500 hover:bg-yellow-400 hover:shadow-2xl w-full flex justify-center items-center h-full rounded-full'><img  alt='icon' src={dog}  className='h-8 w-8'/></div></button>
<button className='md:w-24 w-14  md:h-24 h-14 rounded-full p-1 bg-white'><div className='border-2   border-yellow-500 hover:bg-yellow-400 hover:shadow-2xl w-full flex justify-center items-center h-full rounded-full'><img  alt='icon' src={fish}  className='h-8 w-8'/></div></button>
<button className='md:w-24 w-14  md:h-24 h-14 rounded-full p-1 bg-white'><div className='border-2   border-yellow-500 hover:bg-yellow-400 hover:shadow-2xl w-full flex justify-center items-center h-full rounded-full'><img  alt='icon' src={vetinery}  className='h-8 w-8'/></div></button>



</div>
    </div>
  )
}

export default Catogeries