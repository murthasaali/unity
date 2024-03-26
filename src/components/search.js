import React, { useEffect, useState } from 'react';
import emptypic from "../assets/emptyprofile.png"
import { getAllPosts } from '../utils/communityServices';
import { useNavigate, useLocation, useParams } from 'react-router-dom'; // Correct import statement
import axios from 'axios';
import { setUserid } from '../redux/authSlice';
import Account from './account';

const Search = () => {
    const [accounts, setAccounts] = useState([]);
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState("");
    const nav = useNavigate();
    const location = useLocation();

    const searchData = async () => {
        console.log(input);
        try {
            const response = await axios.get(`https://ecommerce-api-shne.onrender.com/auth/search/?query=${input}`);
            console.log('Search results:', response.data);
            setAccounts(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    useEffect(() => {
        searchData(input);
    }, [input]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getAllPosts(page, 18);
                console.log("explore", res.latestPosts, page);
                setPosts(prevPosts => [...prevPosts, ...res.latestPosts]);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [page]);

    return (
        <>
           
                <div className="  my-3  w-full  ">
                    <input
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Search...."
                        className="w-full bg-opacity-25  bg-stone-950 px-3 py-2 outline-none "
                        style={{ border: 'none' }}
                    />
                </div>
            
            {!input.length > 0 ? (
                posts.length > 0 ? (
                    <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1  ">
                        {posts.map((post, index) => (
                            <div
                                key={index}
                                className="   text-center  text-3xl md:h-52 h-32 "
                                style={{
                                    backgroundImage: `url(${post.image})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1  ">
                        {[...Array(12)].map((_, index) => (
                            <div key={index} className="   text-center skeleton text-3xl md:h-52 h-32">  </div>
                        ))}
                    </div>
                )
            ) : (
                <div className='w-full h-[90%]  flex flex-col'>
                    <div className='w-full flex  justify-between text-white font-thin'>
                        <button className='py-1 px-4 hover:text-green-500 rounded-md items-center justify-between bg-stone-800 bg-opacity-40'>accounts</button>
                        <button className='py-1 px-4 hover:text-green-500 rounded-md items-center justify-between bg-stone-800 bg-opacity-40'>posts</button>
                        <button className='py-1 px-4 hover:text-green-500 rounded-md items-center justify-between bg-stone-800 bg-opacity-40'>products</button>
                        <button className='py-1 px-4 hover:text-green-500 rounded-md items-center justify-between bg-stone-800 bg-opacity-40'>videos</button>
                    </div>
                    <div className='w-full grid-container grid  grid-cols-1 gap-1'>
                        {accounts.map((user, index) => (
                            <button
                                key={user._id}
                                className='w-full flex h-20  gap-2 p-2 '
                                onClick={() => { nav(`/user/${user._id}`); setSelectedUserId(user._id) }}>
                                <div className='w-14 h-14 rounded-full' style={{
                                    backgroundImage: `url(${user.image || emptypic})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                }}></div>
                                <div className='h-14 w-auto flex flex-col justify-center'>
                                    <div className='text-white font-thin text-sm md:text-md'>{user.username}</div>
                                    <div className='text-white font-thin text-xs md:text-xs'>{user.email}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
)}
        </>
    );
};

export default Search;
