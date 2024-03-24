import React, { useState, useEffect } from 'react';

import { CiHeart } from "react-icons/ci";
import { CiUser, CiSearch, CiHome } from "react-icons/ci";
import { CiChat1 } from "react-icons/ci";


import { FiAlignCenter } from "react-icons/fi";
import { getAllPosts, getUserProfile } from '../utils/communityServices';
import Search from '../components/search';
import Notification from '../components/notification';
import Account from '../components/account';
import Chat from '../components/chat';
import CommunityPosts from '../components/communityPosts';
function Community() {
    const [activeButton, setActiveButton] = useState('house');
    const [posts, setPosts] = useState([]);
    const [userProfile,setUserProfile]=useState({})
    useEffect(() => {
        const fetchData = async () => {
          try {
            const profileData = await getUserProfile();
            setUserProfile(profileData.user);
           
                
           
          } catch (error) {
            console.error('Error fetching user pr ofile:', error);
          }
        };
    
        fetchData();
      }, []);




    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getAllPosts();
                console.log("data", res.latestPosts);
                setPosts(res.latestPosts);
                // Assuming `latestPosts` is the key containing posts in your response
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [])


    console.log("posts", posts)


    const renderContent = () => {
        switch (activeButton) {
            case 'house':
                return <>

                    <CommunityPosts/>

                

                </>;
            case 'search':
                return <><Search /></>;
            case 'edit':
                return <><Chat /></>;
            case 'heart':
                return <><Notification /></>;
            case 'user':
                return <><Account /></>;
            default:
                return null;
        }
    };

    return (
        <div className='w-full h-screen  flex flex-col justify-start items-center overflow-hidden bg-black '  >

            <div className='w-full bg-black h-auto p-2 flex md:hidden justify-evenly absolute bottom-0 z-50'>
                <button className={`h-fit p-3  text-2xl text-green-500 bg-opacity-60 ${activeButton === 'house' ? '' : ''}`} onClick={() => setActiveButton('house')}><CiHome className='hover:scale-125 transition-all duration-300 ' /></button>
                <button className={`h-fit p-3  text-2xl text-green-500 bg-opacity-60 ${activeButton === 'search' ? '' : ''}`} onClick={() => setActiveButton('search')}><CiSearch className='hover:scale-125 transition-all duration-300 ' /></button>
                <button className={`h-fit p-3  text-2xl text-green-500 bg-opacity-60 ${activeButton === 'edit' ? '' : ''}`} onClick={() => setActiveButton('edit')}><CiChat1 className='hover:scale-125 transition-all duration-300 ' /></button>
                <button className={`h-fit p-3  text-2xl text-green-500 bg-opacity-60 ${activeButton === 'heart' ? '' : ''}`} onClick={() => setActiveButton('heart')}><CiHeart className='hover:scale-125 transition-all duration-300 ' /></button>
                <button className={`h-fit p-3  text-2xl text-green-500 bg-opacity-60 ${activeButton === 'user' ? '' : ''}`} onClick={() => setActiveButton('user')}><img className='hover:scale-125 transition-all duration-300 h-6  w-6 rounded-full' src={userProfile.image}/></button>
            </div>
            <div className='w-full h-20  mb-2 hidden md:flex bg-black justify-between px-3 items-center'>


                <div className='text-w text-xl  font-thin'>pethouse</div>
                <div className='h-fit w-full md:w-[500px]   md:flex hidden  justify-evenly items-center'>
                    <button className={`h-fit p-3 rounded-xl bg-opacity-60 border-[1px] hover:border-b-green-600 ${activeButton === 'house' ? '  border-b-green-600 border-x-transparent border-transparent' : 'border-transparent'}`} onClick={() => setActiveButton('house')}><CiHome className='hover:scale-125 text-3xl transition-all duration-300 ' /></button>
                    <button className={`h-fit p-3 rounded-xl bg-opacity-60 border-[1px] hover:border-b-green-600 ${activeButton === 'search' ? ' border-b-green-600 border-x-transparent border-transparent' : 'border-transparent'}`} onClick={() => setActiveButton('search')}><CiSearch className='hover:scale-125 text-3xl transition-all duration-300 ' /></button>
                    <button className={`h-fit p-3 rounded-xl bg-opacity-60 border-[1px] hover:border-b-green-600 ${activeButton === 'edit' ? ' border-b-green-600 border-x-transparent border-transparent' : 'border-transparent'}`} onClick={() => setActiveButton('edit')}><CiChat1 className='hover:scale-125 text-3xl transition-all duration-300 ' /></button>
                    <button className={`h-fit p-3 rounded-xl bg-opacity-60 border-[1px] hover:border-b-green-600 ${activeButton === 'heart' ? ' border-b-green-600 border-x-transparent border-transparent' : 'border-transparent'}`} onClick={() => setActiveButton('heart')}><CiHeart className='hover:scale-125 text-3xl transition-all duration-300 ' /></button>
                    <button className={`h-fit p-3 rounded-xl bg-opacity-60 border-[1px] hover:border-b-green-600 ${activeButton === 'user' ? ' border-b-green-600 border-x-transparent border-transparent' : 'border-transparent'}`} onClick={() => setActiveButton('user')}><CiUser className='hover:scale-125 text-3xl transition-all duration-300 ' /></button>
                </div>
                <button className='text-white  font-thin text-3xl'><FiAlignCenter /></button>

            </div>

            <div className='w-full h-full  flex justify-center p-0'>
                <div className='md:h-[650px] h-[100%]  bg-opacity-40 rounded-xl w-full md:w-[750px] overflow-y-scroll flex flex-col justify-start items-center md:p-4 p-1' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Community;
