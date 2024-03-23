import React from 'react';
import {  FaMinus, FaPlus } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { getCartProduct, removeFromCart } from '../utils/userServices';

function Table({ data,setData }) {
  

  const renderSkeleton = () => {
    const skeletons = Array.from({ length: 5 }, (_, index) => (
      <tr className='rounded-full mt-6 w-auto h-24 animate-pulse ' key={index}>
        <td className='w-16'></td>
        <td className='w-full'>
          <div className='font-bold bg-gray-300 h-6 w-32 mb-2'></div>
          <div className='bg-gray-300 h-4 w-40'></div>
        </td>
        <td className='w-24'>
          <div className='bg-gray-300 h-10 w-24 rounded-full flex justify-evenly'></div>
        </td>
      </tr>
    ));

    return skeletons;
  };

  return (
    <table className="table-auto w-full overflow-y-scroll h-full">
      <tbody className='p-2 mt-3 w-full gap-3 '>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr className='rounded-full mt-3 w-auto h-24 relative ' key={index}>
              <button className='absolute right-0'>
                <MdClose className='text-xl hover:rotate-180' onClick={()=>{
                  console.log(item.productId._id)

                  removeFromCart(item.productId._id)
                  getCartProduct(setData)
                }} />
              </button>
              <td><img src={item.productId.image} className='md:h-16 h-10 w-10 md:w-16 rounded-2xl' alt='product'/></td>
              <td>
                <span className='font-bold'>{item.productId.name}</span>
                <p>{item.productId.price}</p>
              </td>
              <td className='mr-2'>
                <div className='bg-stone-900 bg-opacity-50 py-2 rounded-full flex justify-evenly'>
                  <button className='bg-white rounded-full p-1'><FaPlus /></button>
                  <span className='text-white'>1</span>
                  <button className='bg-white rounded-full p-1'><FaMinus /></button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          renderSkeleton()
        )}
      </tbody>
    </table>
  );
}

export default Table;
