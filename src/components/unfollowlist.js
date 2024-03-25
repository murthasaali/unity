import React, { useState, useEffect } from 'react';
import { followUser, getAllUnfollowedUsers } from '../utils/followService';
import { HiChatAlt2 } from "react-icons/hi";
import hero from '../assets/profileIcon.jpg';
import { FaPlus } from 'react-icons/fa6';

function isUserNew(createdAt) {
  const userCreateDate = new Date(createdAt);
  const currentDate = new Date();

  // Check if the user was created in the same month as the current date
  return userCreateDate.getMonth() === currentDate.getMonth() && userCreateDate.getFullYear() === currentDate.getFullYear();
}

function Unfollowlist() {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followId, setFollowId] = useState("");
  const [unfollowedUsers, setUnfollowedUsers] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getAllUnfollowedUsers(userId)
      .then(users => {
        setUnfollowedUsers(users.reverse());
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [followId]);

  const follow = async (userId, name) => {
    try {
      setLoading(true);
      setFollowId(userId);
      const res = await followUser(userId, name);
      setLoading(false);
      setFollowId("");
      setFollowing(true);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleScroll = (event) => {
    // Check if mouse wheel is scrolled down
    if (event.deltaY > 0) {
      event.preventDefault(); // Prevent default scrolling behavior

      // Calculate scroll amount
      const scrollAmount = 0; // Adjust as needed
      const slider = document.getElementById('slider');
      slider.scrollLeft += scrollAmount;
    }else{
      const scrollAmount = 0; // Adjust as needed
      const slider = document.getElementById('slider');
      slider.scrollRight +=scrollAmount
    }
  };


  return (
    <div className='md:h-48 flex items-center text-xs justify-center top-6 h-40 overflow-x-auto'>
      <div className='relative w-full h-20 flex items-center' onWheel={handleScroll}>
        <div id='slider' className='flex overflow-x-scroll scroll whitespace-normal flex-nowrap scroll-smooth scrollbar-hide'>
          {unfollowedUsers.map(user => (
            <div key={user.id} className='p-2 md:h-fit relative bg-stone-800 bg-opacity-50 h-fit md:w-fit w-fit rounded-xl flex flex-col mr-2'>
              <div className='w-full p-2 h-fit flex-col rounded-xl flex gap-[2px] items-center justify-start'>
                <div className='md:w-14 w-12 h-12 md:h-14 rounded-full'>
                  <div
                    className='w-full h-full rounded-full bg-white relative'
                    style={{
                      backgroundImage: `url(${user.image ? user.image : hero})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  >
                    <FaPlus className='absolute bottom-1 p-1 bg-black rounded-full text-white text-xl right-1' />
                  </div>
                </div>

                <div className='font-thin bg-opacity-40 w-20 md:w-auto text-stone-50 md:text-[9px] text-[8px] overflow-hidden whitespace-nowrap'>
                  {user.username ? user.username : user.email.slice(0, 16)}
                </div>
              </div>

              <div className='flex justify-evenly'>
                <button onClick={() => follow(user._id, user.username ? user.username : user.email)} className='py-1 px-4 text-black font-thin rounded-xl text-xs md:text-md bg-stone-50 bg-opacity-70'>
                  {followId === user._id ? (loading ? <span className="loading loading-spinner loading-xs"></span> : <div>following</div>) : "follow"}
                </button>
          
              </div>

              {user.createdAt && (
                <div className=''>
                  {isUserNew(user.createdAt) && <span className="text-[10px] absolute top-0 right-0 bg-stone-800 bg-opacity-40 p-1 rounded-lg text-green-500 ml-1">new</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Unfollowlist;
