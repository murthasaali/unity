import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const [searchDiv, setSearchDiv] = useState(false)
    return (
        <>
            <div className="max-w-md mx-auto my-3  w-full">
                <div className="relative">
                    <input type="text" placeholder="Search" className="w-full bg-opacity-25  bg-stone-950 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200" />
                    <button onClick={() => setSearchDiv(!searchDiv)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-50 focus:outline-none">
                        <FaSearch />
                    </button>
                </div>
                <div className="mt-4">
                    {/* Render search results here */}
                </div>
            </div>
            {
                !searchDiv ?
                    <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1  ">
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                        <div className=" skeleton rounded-lg  text-center  text-3xl md:h-52 h-32"></div>
                    </div>

                    : <div className='w-full h-[90%]'>
                        <div className='w-full flex  justify-between text-white font-thin'>
                            <button className='py-1 px-4 hover:text-green-500 rounded-md items-center justify-between bg-stone-800 bg-opacity-40'>posts</button>
                            <button className='py-1 px-4 hover:text-green-500 rounded-md items-center justify-between bg-stone-800 bg-opacity-40'>products</button>
                            <button className='py-1 px-4 hover:text-green-500 rounded-md items-center justify-between bg-stone-800 bg-opacity-40'>accounts</button>
                            <button className='py-1 px-4 hover:text-green-500 rounded-md items-center justify-between bg-stone-800 bg-opacity-40'>vedios</button>

                        </div>

                    </div>
            }

        </>
    );
};

export default Search;
