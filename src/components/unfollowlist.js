import React,{useState,useEffect} from 'react';
import { useQuery } from 'react-query';
import { followUser, getAllUnfollowedUsers } from '../utils/followService';
import { useNavigate } from "react-router-dom";
import hero from '../assets/profileIcon.jpg';
import { FaPlus } from 'react-icons/fa6';
import { io } from "socket.io-client";
import { toasting } from '../constants/toast/customToast';

function isUserNew(createdAt) {
  const userCreateDate = new Date(createdAt);
  const currentDate = new Date();

  return userCreateDate.getMonth() === currentDate.getMonth() && userCreateDate.getFullYear() === currentDate.getFullYear();
}

function Unfollowlist() {
  const [socket,setSocket]=useState(null)

  const nav = useNavigate();
  useEffect(() => {
    setSocket(io("https://unity-dev-xbcq.3.us-1.fl0.io"));
  }, []);
  useEffect(() => {
    if (socket) {
      const user = localStorage.getItem("username");
      socket.emit("newUser", user);
      socket.on("getNotification", ({ senderName,type }) => {
        console.log(`Received notification from ${senderName}`);
        if(type==="follow")
        toasting(`${senderName} following you `,"🖤")
      else
      toasting(`${senderName} liked your post`,"💝")
      });
    }
  }, [socket]);

  const { data: unfollowedUsers = [], isLoading, isError, refetch } = useQuery('unfollowedUsers', getAllUnfollowedUsers);
const username=localStorage.getItem("username")
  const follow = async (userId, name) => {
    try {
      await followUser(userId, name);
      socket.emit("sendNotification", {
        senderName: username,
        receiverName: name,
        type:"follow",
        
      });
      refetch(); // After following, refetch the data to update the list
    } catch (error) { 
      console.error('Error following user:', error);
    }
  }

  const handleScroll = (event) => {
    // handle scrolling logic
  };

  const handleAccountClick = (userId) => {
    nav(`/user/${userId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className='md:h-48 flex items-center text-xs justify-center top-6 h-40 overflow-x-auto'>
      <div className='relative w-full h-20 flex items-center' onWheel={handleScroll}>
        <div id='slider' className='flex overflow-x-scroll scroll whitespace-normal flex-nowrap scroll-smooth scrollbar-hide'>
          {unfollowedUsers.map(user => (
            <div key={user.id} className='p-2 md:h-fit relative bg-stone-800 bg-opacity-50 h-fit md:w-fit w-fit rounded-xl flex flex-col mr-2'>
              <div className='w-full p-2 h-fit flex-col rounded-xl flex gap-[2px] items-center justify-start'>
                <div className='md:w-14 w-12 h-12 md:h-14 rounded-full'>
                  <button
                   onClick={() => handleAccountClick(user._id)}
                    className='w-full h-full rounded-full bg-white relative'
                    style={{
                      backgroundImage: `url(${user.image ? user.image : hero})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  >
                    <FaPlus className='absolute bottom-1 p-1 bg-black rounded-full text-white text-xl right-1' />
                  </button>
                </div>

                <div className='font-thin bg-opacity-40 w-20 md:w-auto text-stone-50 md:text-[9px] text-[8px] overflow-hidden whitespace-nowrap'>
                  {user.username ? user.username : user.email.slice(0, 16)}
                </div>
              </div>

              <div className='flex justify-evenly'>
                <button onClick={() => follow(user._id, user.username ? user.username : user.email)} className='py-1 px-4 text-black font-thin rounded-xl text-xs md:text-md bg-stone-50 bg-opacity-70'>
                  {"follow"}
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
