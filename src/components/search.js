import React, { useEffect, useState } from 'react';
import emptypic from "../assets/emptyprofile.png"
import { getAllPosts } from '../utils/communityServices';
import axios from 'axios'
const Search = () => {
    const [accounts, setAccounts] = useState([]);
    const [input, setInput] = useState("")
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1); // Initialize page state
    const searchData = async () => {
        console.log(input)
        try {
            const response = await axios.get(`http://localhost:3001/auth/search/?query=${input}`); // Replace '/api/search' with your actual backend API endpoint for search
            console.log('Search results:', response.data);
            setAccounts(response.data)
            // Process the response data as needed
        } catch (error) {
            console.error('Error searching:', error);
        }
    };
    useEffect(() => {

        searchData(input)

    }, [input])


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getAllPosts(page, 18);
                console.log("explore", res.latestPosts, page);

                setPosts(prevPosts => [...prevPosts, ...res.latestPosts]); // Append new posts to the existing array
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, [page]); // Fetch posts whenever the page changes

    return (
        <>
            <div className="max-w-md mx-auto my-3  w-full">
                <div className="relative">
                    <input type="text" onChange={(e) => setInput(e.target.value)} placeholder="Search" className="w-full bg-opacity-25  bg-stone-950 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" />

                </div>
                <div className="mt-4">
                    {/* Render search results here */}
                </div>
            </div>
            {!input.length > 0 ? (
                posts.length > 0 ? (
                    <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1  ">
                        {posts.map((post, index) => (
                            <div key={index} className=" rounded-lg  text-center  text-3xl md:h-52 h-32 " style={{
                                backgroundImage: `url(${post.image})`, backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1  ">
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
                        <div className=" rounded-lg  text-center skeleton text-3xl md:h-52 h-32">  </div>
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
                        {accounts.map((user, index) => {
                            return (
                                <div className='w-full flex h-20  gap-2 p-2 ' key={user._id}>
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
                                </div>)
                        })
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;
