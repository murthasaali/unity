
import React from 'react';
import groom from '../assets/haircut.png'
import { motion } from 'framer-motion';
import crak from '../assets/frames/frame1.png';
import { MdArrowForward, MdPlayCircle } from 'react-icons/md';
import Button from '../components/button';
import { MdOutlinePets } from "react-icons/md";
import dogsmile from '../assets/frames/dogsmile.png'
import cutting from '../assets/grom.png'
import star from '../assets/star.png'
function PetCareService() {
    return (<>
        <div className='md:p-10  p-0  w-full  flex-wrap  bg flex flex-col items-center  justify-center  z-30 rounded-t-3xl  h-auto' style={{
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)'
    }}>
           
            {/* <Chevron /> */}
            
            <div>
            <img src={crak} className='w-32 h-24 absolute right-10' alt="crak" />
            <motion.p 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}className='w-full px-10'>
                <span className='md:w-[40%] w-[60%]  text-start md:text-6xl text-base  font-thin'>We Give Preference to your pet</span>
            </motion.p>
            </div>
            <div 
            className='md:h-screen md:gap-0 gap-2 w-full md:flex-row flex flex-col  justify-center items-center  flex-wrap md:p-10 p-1 '>
                <motion.div
                    className='md:w-[30%] w-full mt-1 px-2    md:h-[400px]  rounded-3xl  flex-col flex items-center '
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
               <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
                <div className='w-[80%] text-transparent text-center  font-extrabold md:text-4xl text-xl' style={{  WebkitTextStroke:"2px  #ffffff " /* Add the text outline effect */
}} >
                    Our Pet   Care Services
                </div >
               <button  className='md:w-3/4 w-1/2 md:text-base  md:p-1  py-1 px-2 rounded-full text-xs bg-stone-50 bg-opacity-60 p-0 font-thin text-start  transition-all border-opacity-75 duration-600 items-center hover:text-red-400 flex justify-between '><>Pet Grooming</> <MdArrowForward/></button >
                <button  className='md:w-3/4 w-1/2 md:text-base  md:p-1  py-1 px-2 rounded-full text-xs bg-stone-50 bg-opacity-60 p-0  text-start font-thin  transition-all border-opacity-75 duration-600 items-center hover:text-red-400 flex justify-between '><>Dog  agording Kennels</> <MdArrowForward/></button >
                <button  className='md:w-3/4 w-1/2 md:text-base  md:p-1  py-1 px-2 rounded-full text-xs bg-stone-50 bg-opacity-60 p-0  text-start font-thin  transition-all border-opacity-75 duration-600 items-center hover:text-red-400 flex justify-between '><>Dog Training</> <MdArrowForward/></button >
                <button  className='md:w-3/4 w-1/2 md:text-base  md:p-1  py-1 px-2 rounded-full text-xs bg-stone-50 bg-opacity-60 p-0  text-start font-thin  transition-all border-opacity-75 duration-600 items-center hover:text-red-400 flex justify-between '><>Walking and Sitting</> <MdArrowForward/></button >
                <button  className='md:w-3/4 w-1/2 md:text-base  md:p-1  py-1 px-2 rounded-full text-xs bg-stone-50 bg-opacity-60 p-0  text-start font-thin  transition-all border-opacity-75 duration-600 items-center hover:text-red-400 flex justify-between '><>Dog Emergency Services</> <MdArrowForward/></button >
                
               </div>
                    
                </motion.div>
                <motion.div
                    className='md:w-[30%] flex flex-col w-full mt-0 bg-stone-50 p-3  bg-opacity-30 md:h-[400px] h-[240px] rounded-3xl '
                    // style={{ boxShadow: 'inset 0 0 15px #000000' }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    ><div className='w-full h-auto flex justify-start gap-2'>
                    <img src={groom} alt=""  className='h-10 w-10'/>
                    <h1 className=' text-xl font-extrabold'>Pet Grooming</h1>
                </div>
                <p className='md:mt-4 mt-1 font-thin md:text-base text-xs'>At our pet grooming service, we understand the importance of keeping your furry friends looking and feeling their best. Our expert groomers provide top-notch care tailored to the specific needs of each pet, ensuring they receive the pampering they deserve.
                From luxurious baths to precision haircuts, we go above and beyond to enhance your pet's appearance and well-being.  we guarantee a grooming experience that surpasses the rest </p>
                <Button height="12" content="add service"  icon={<MdOutlinePets/>}/>

                </motion.div>
                <motion.div
                    className='md:w-[30%] w-full mt-1 gap-3 md:h-[400px] h-[300px] rounded-3xl flex flex-row md:px-0 px-1 md:flex-wrap'
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}

                    transition={{ duration: 1, delay: 1.5 }}
                    >
                    <div className='md:h-[45%] h-[45%] md:w-full w-[40%] bg-sky-500 bg-opacity-30 rounded-lg  relative rounded-tr-[100px]'>
                        
                        <motion.img src={star} className='md:h-24 md:w-28 h-14 w-16 absolute  top-0 right-0' alt=''  whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.5 }}
      animate={{ y: [0, -10, 0], transition: { duration: 2.1, repeat: Infinity } }}/>
                        <img src={cutting} className='md:h-48 md:w-72 h-16 w-52 absolute right-[20%] bottom-0' alt=''/>
                    </div >
                    <div className='h-[45%] w-full bg-orange-400 bg-opacity-60 rounded-lg relative'>
    {/* <video autoPlay loop muted className='w-full h-full object-cover rounded-lg'>
        <source src={vedio} type="video/mp4" />
        
        Your browser does not support the video tag.
    </video> */}
    <img src={dogsmile} className='md:h-36 md:w-32 h-18 w-14 absolute right-0 bottom-0' alt='' />
    <button className='absolute bottom-0 left-0 mb-2 ml-2 flex items-center gap-3 text-white'>
        <MdPlayCircle className='text-4xl hover:text-stone-500 transition-all duration-300 text-stone-200' /> Play Video
    </button>
</div>



                </motion.div>
            </div>
        </div>
                    </>
    );
}

export default PetCareService;
