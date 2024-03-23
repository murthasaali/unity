import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

function ProductCard({ image, title, category, price, addToCart, addToWishlist,productId,icon ,isCart}) {
  const handleAddToCart = () => {
    // Call addToCart function with productId or any other necessary data
    console.log("id catched",productId)
    addToCart(productId);
  };

  // const handleAddToWishlist = () => {
  //   // Call addToWishlist function with productId or any other necessary data
  //   addToWishlist(productId);
  // };

  return (
    <div className='w-64 h-80 rounded-3xl relative overflow-hidden shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.8)] bg-opacity-30' style={{ backgroundColor: "#00D2E5" }}>
      <div className='w-full h-full relative z-[1] bg-opacity-20'>
        <div className='w-auto h-auto bottom-[50%] right-10 bg-transparent absolute'>
          <div className='w-full h-full relative flex flex-col justify-end'>
            <div className='font-extrabold text-3xl text-transparent opacity-50' style={{ WebkitTextStroke: "1px  #ffffff" }}>pet house</div>
            <div className='font-extrabold text-3xl text-transparent opacity-50' style={{ WebkitTextStroke: "1px  #ffffff" }}>pet house</div>
            <div className='font-extrabold text-3xl text-transparent opacity-50' style={{ WebkitTextStroke: "1px  #ffffff" }}>pet house</div>
            <div className='absolute bottom-3 left-0 right-0 text-center'>
              <img src={image} className='h-24 w-24 inline-block' alt={title} />
            </div>
          </div>
        </div>
        <div className='w-[1500px] h-[1500px] hover:bg-black right-0 left-[-650px] top-[60%] z-[50] flex justify-center items-start absolute bottom- rounded-full' style={{ backgroundColor: "#77D8E8" }}>
        </div>
      </div>
      <div className='z-[999] w-full h-[40%] p-2 bg-transparent bottom-0 flex left-0 absolute justify-between text-black'>
        <div className=''>
          <div className='font-sm text-white text-xl' style={{ WebkitTextStroke: "1px  #ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>{title} </div>
          <span className='font-thin text-white text-sm' style={{ WebkitTextStroke: "1px  #ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>{category} </span>
          <div className='font-bold text-red-500 text-2xl' style={{ WebkitTextStroke: "1px  #ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>{price} </div>
        </div>
        <div className='flex flex-col justify-evenly items-end'>
          <button  className='bg-white p-2 w-8 rounded-full shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.8)]' onClick={()=>addToWishlist(productId)}>
          {icon}
          
          </button>



            {
              isCart&&
          <button className='p-2 bg-white rounded-full flex relative shadow-[10px_10px_30px_-10px_rgba(0,0,0,0.8)]' style={{ overflow: 'hidden' }}>
  <FaCartArrowDown onClick={handleAddToCart} />  
</button>
            }

            
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
