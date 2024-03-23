import React, { useEffect, useState } from 'react';
import {  getCartProduct } from '../utils/userServices';
import Table from '../components/table';
import Total from '../components/total';
import Navbar from '../components/navbar';

function UserCart() {
  const [data, setData] = useState([]); // Define data state variable

  useEffect(() => {
   
    setTimeout(() => {
      
      getCartProduct(setData); // Call the function
    }, 3000);
  }, []);

  return (
    <div className='w-full h-screen md:p-3 flex flex-col items-center  ' style={{
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
    }}>

      <Navbar />
      <div className='w-full h-full    md:p-3 p-1 flex  justify-evenly items-center  '>
        <div className="overflow-y-auto relative  p-4 md:h-[65%]  h-1/2 md:w-2/5 w-full rounded-3xl flex flex-col   ">
          <p className='w-1/2 h-auto bg-stone-200 bg-opacity-30 py-3 flex justify-center items-center top-[-20px] rounded-lg absolute font-thin text-xl'>Your cart Details</p>
          <Table data={data} setData={setData}/>
        </div>
        <div className="  p-4 md:h-5/6  h-3/4 md:w-2/5 w-full rounded-3xl md:flex hidden flex-col ">
          <Total data={data} />
          <div className='w-full flex justify-between gap-4'>

            <button className='bg-stone-900 bg-opacity-80 text-white font-thin py-1 px-4 rounded-full mt-3 '>continue shoping</button>
            <button className='bg-stone-900 bg-opacity-80 text-white font-thin py-1 px-4 rounded-full mt-3 '>Strype</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCart;
