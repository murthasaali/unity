import React from 'react';
import { motion } from 'framer-motion';
import hero from '../assets/hero.png'; // Assuming this is your image file
import Button from './button';
import { MdOutlinePets } from "react-icons/md";

function Herosection() {
  return (
    <div className='w-full h-auto md:flex  justify-center items-center  mt-10'>
<div class="gcse-search"></div>
      <div className='md:w-1/2 w-full text-9xl  p-10 md:h-96 h-auto '>
        <h1 className=''>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >"Your new friend</motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >with home delivery"</motion.span>
        </h1>
        <p className='text-xs font-thin'>Online pet store - a convenient solution when you're too lazy to leave the house.</p>
        <Button height="12" content="Shop Now"  icon={<MdOutlinePets/>}/>
      </div>
      <div className='md:w-1/2 w-full md:h-96 h-52  rounded-3xl relative' style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'right', backgroundRepeat: 'no-repeat'}}>
        {/* Content for the right side */}
      </div>
    </div>
  );
}

export default Herosection;
