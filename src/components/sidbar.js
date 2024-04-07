import React from 'react'
import home from "../assets/home.png";
import searchicon from "../assets/search_11999858.png";
import chat from "../assets/live-chat_12597027.png";
import heart from "../assets/heart.png";
import { useNavigate } from 'react-router-dom';
import CreatePostModal from './Modals/createPost';

function Sidbar() {
    const nav = useNavigate();

  return (
    <div className='w-72 h-screen left-0 top-0  z-[999] absolute md:flex hidden lg:flex flex-col justify-around'>

        <div className='w-full h-20 text-3xl text-white bg-black font-medium text-center'>@Unity.com</div>
        <div className='w-full h-[400px] bg-black flex flex-col justify-evenly items-center'>
  <div className='flex flex-col h-full text-white justify-evenly items-start'>
  <button onClick={()=>nav("/")}  className='flex justify-start hover:scale-110 transition-all duration-300 items-center hover:bg-stone-800 w-full py-2 px-4 rounded-lg  bg-opacity-50'>   <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${home})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            
          ></div> <div>Home</div></button>
            <button onClick={()=>nav("/search")}  className='flex justify-start hover:scale-110 transition-all duration-300 items-center hover:bg-stone-800 w-full py-2 px-4 rounded-lg  bg-opacity-50'>   <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${searchicon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div> <div>Search</div></button>
            <button onClick={()=>nav("/chat")} className='flex justify-start hover:scale-110 transition-all duration-300  items-center hover:bg-stone-800 w-full py-2 px-4 rounded-lg  bg-opacity-50'>   <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${chat})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div> <div>Messages</div></button>
            <button  className='flex justify-start hover:scale-110 transition-all duration-300 items-center hover:bg-stone-800 w-full py-2 px-4 rounded-lg  bg-opacity-50'>   <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${chat})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div> <div>            <CreatePostModal  />
          </div></button>
            <button onClick={()=>nav("/notification")} className='flex justify-start hover:scale-110 transition-all duration-300 items-center hover:bg-stone-800 w-full py-2 px-4 rounded-lg  bg-opacity-50'>   <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${heart})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >  {localStorage.getItem("notificationCount") > 0 && (
            <div className="rounded-full  font-bold relative text-black bg-white top-0 right-5 text-bold text-xs">
              {localStorage.getItem("notificationCount")}
            </div>
          )}</div> <div>home</div></button>
            <button onClick={()=>nav("/account")} className='flex justify-start hover:scale-110 transition-all duration-300 items-center hover:bg-stone-800 w-full py-2 px-4 rounded-lg  bg-opacity-50'>   <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${searchicon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div> <div>Profile</div></button>
          

  </div>
        </div>
      
        <div className="dropdown dropdown-top dropdown-end">
  <div tabIndex={10} role="button" className="">  <div className='w-full  bg-black flex justify-center'>
        <div  className='flex gap-2 justify-start items-center hover:bg-stone-800 w-auto py-2 px-6 rounded-lg  bg-opacity-50'>   <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${searchicon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div> <div>More</div></div>
        </div></div>
  <ul tabIndex={10} className="dropdown-content z-[1] menu p-2 gap-2 shadow rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-opacity-35 rounded-bl-none w-52">
    <li><button className='mt-2 text-black'>Item 1</button></li>
    <li><button className='mt-2 text-black'>Item 1</button></li>
    <li><button className='mt-2 text-black'>Item 1</button></li>
    <li><button className='mt-2 text-black'>Item 1</button></li>
  </ul>
</div>

    </div>
)
}

export default Sidbar