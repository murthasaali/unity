import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaPlus } from 'react-icons/fa6';
import { deletePost, getUserProfile } from '../utils/communityServices';
import SetProfileEditModal from './setProfileEditModal';
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
import CreatePost from './createPost';

function Account() {
   const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [createPost, setCreatePOst] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getUserProfile();
        setUserProfile(profileData.user);
        setUserPosts(profileData.user.posts);
       
            setLoading(false); // Set loading to false when data is fetched
            
       
      } catch (error) {
        console.error('Error fetching user pr ofile:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);


  const renderUserProfile = () => (
    <div className='w-full h-full flex  flex-col gap-4 p-2'>
    
    <div className='w-full flex justify-between items-center'>
      <div
        className='w-24 h-24 rounded-full bg-white relative'
        style={{
          backgroundImage: `url(${userProfile.image})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <FaPlus className='absolute bottom-1 p-1 bg-black rounded-full text-white text-xl right-1' />
      </div>
      <div className='  flex flex-col justify-start items-center '>
        <div>{userProfile.posts ? userProfile.posts.length : '0'}</div>
        <div>posts</div>
      </div>
      <div className='  flex flex-col justify-start items-center '>
        <div>{userProfile.followersCount ? userProfile.followersCount.length : '0'}</div>
        <div>followers</div>
      </div>
      <div className='  flex flex-col justify-start items-center '>
        <div>{userProfile.followingCount ? userProfile.followingCount.length : '0'}</div>
        <div>following</div>
      </div>
    </div>
    <div className='w-full flex flex-col gap-1'>
      <div className='px-3 text-white font-thin w-fit py-1 rounded-lg  bg-stone-800 bg-opacity-40'>{userProfile.username}</div>
      <div className='px-3 text-blue-500 font-extralight text-xs w-fit py-1 rounded-lg  bg-stone-800 bg-opacity-40'>{userProfile.bio}</div>
    </div>
    <div className='w-full flex justify-between text-xs  gap-1'>
      <div className='md:p-2 p-1 w-[30%] rounded-lg bg-stone-800 bg-opacity-40 font-thin'>
        <SetProfileEditModal setOpen={setOpen} open={open} />
    
      </div>
      <button className='md:p-2 p-1 w-[30%] rounded-lg bg-stone-800 bg-opacity-40     font-thin'>share profile</button>
      <div className='md:p-2 p-1 w-[30%] rounded-lg bg-stone-800 bg-opacity-40    font-thin'> <CreatePost setOpen={setCreatePOst} open={createPost}/></div>
     
    </div>
    <div className='grid-container grid w-full grid-cols-3 md:gap-2 gap-1'>
      {/* Conditionally render skeleton loading or user posts */}
      {
        // Render user posts when data is fetched
        userPosts.map((post) => (
          <div
            key={post._id}
            className='bg-stone-50 relative  bg-opacity-80 text-center text-3xl md:h-52 h-32'
            style={{ backgroundImage: `url(${post.image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
          >
            {/* <button  className=' absolute flex justify-end p-0 right-0 top-2'>

       
            </button> */}

<div className="dropdown dropdown-end relative w-full h-full ">
  <div tabIndex={0} role="button" className="absolute top-[1px] right-[3px]">
  <PiDotsThreeOutlineVerticalThin className='text-white text-md'/>
  </div>
  <ul tabIndex={0} className="dropdown-content z-[1] flex flex-col overflow-hidden  p-0  shadow backdrop-blur-lg text-white text-[10px] md:xs rounded-box w-20">
    <button className='w-full h-full hover:bg-stone-50 hover:bg-opacity-10  transition-all duration-300'>edit</button>
    <button className='w-full h-full hover:bg-stone-50 hover:bg-opacity-10  transition-all duration-300' onClick={()=>deletePost(post._id)}>delete</button>
  </ul>
</div>
          </div>
        ))
        }
    </div>
  </div>
  );



  const renderSkeleton = () => {
    return (
        
            <div className='w-full h-full flex flex-col gap-4 p-2'>
             
              <div className='w-full flex justify-between items-center'>
                <div className='w-24 h-24 rounded-full skeleton'></div>
                <div className='flex flex-col justify-start items-center'>
                  <div className='skeleton w-8 h-8'></div>
                  <div className='skeleton w-20 h-3 mt-1'></div>
                </div>
                <div className='flex flex-col justify-start items-center'>
                  <div className='skeleton w-8 h-8'></div>
                  <div className='skeleton w-20 h-3 mt-1'></div>
                </div>
                <div className='flex flex-col justify-start items-center'>
                  <div className='skeleton w-8 h-8'></div>
                  <div className='skeleton w-20 h-3 mt-1'></div>
                </div>
              </div>
        
              {/* Additional content */}
              <div className='w-full flex flex-col gap-1'>
                <div className='skeleton w-44 h-8 rounded-lg  '></div>
                <div className='skeleton w-44 h-8 rounded-lg '></div>
              </div>
        
              {/* Action buttons */}
              <div className='w-full flex justify-between gap-1'>
                <div className='md:p-2 p-1 w-[30%] rounded-lg skeleton h-8 font-bold'></div>
                <button className='md:p-2 p-1 w-[30%] rounded-lg skeleton h-8 font-bold'></button>
                <button className='md:p-2 p-1 w-[30%] rounded-lg skeleton h-8 font-bold'></button>
              </div>
        
              {/* User posts */}
              <div className='grid-container grid w-full grid-cols-3 md:gap-2 gap-1'>
                {/* Render skeleton UI for posts */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className='skeleton    text-center text-3xl md:h-52 h-32'></div>
                ))}
              </div>
            </div>
    );
  
  };

  return <>
    {!loading?renderUserProfile():renderSkeleton()}
    
  </>
  
}

export default Account;
