import React from 'react';
import { motion } from 'framer-motion';
function Chevron() {
  return (
    <motion.button
    className="transform text-white border-white h-[40px] w-8 p-2 rounded-full flex justify-center items-center shadow-lg"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.5 }}
    animate={{ y: [0, -10, 0], transition: { duration: 2.1, repeat: Infinity } }}
  >
    <motion.div className='h-[8px] rounded-full w-[4px] border border-black'></motion.div>
  </motion.button>
  );
}

export default Chevron;
