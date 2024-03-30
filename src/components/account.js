import React, { useState,useEffect } from "react";
import { useQuery } from "react-query";
import { FaAnchor, FaArrowLeft, FaHeart, FaPlus } from "react-icons/fa6";
import { deletePost, getUserProfile } from "../utils/communityServices";
import { useNavigate } from "react-router-dom";
import CreatePost from "./createPost";
import { CiHeart } from "react-icons/ci";
import SetProfileEditModal from "./setProfileEditModal";
import Follow from "./Modals/follow";
import { getAllFollowers } from "../utils/followService";
import UpdateProfile from "./Modals/updateProfile";
import CreatePostModal from "./Modals/createPost";

function Account({ user, myAcount }) {
  const [userPosts, setUserPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [createPost, setCreatePOst] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false); // State to manage follow status
  const [followerList,setFollowerList]=useState(false)
  const [loading, setLoading] = useState(true); // State to manage loading status
  const nav = useNavigate();
  let userId
  if (!user) {
    userId = localStorage.getItem("userId"); // Assign userId if user is provided
    console.log(userId);
  } else {
    // If user is not provided, use the value of user directly
    userId = user;
  }
  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery(["userProfile", userId], () => getUserProfile(user));

  useEffect(() => {
    if (userProfile && userProfile.followers) {
      setIsFollowed(userProfile.followers.includes(userId));
    }
  }, [userProfile]);
  const handleRoute = (userId) => {
    nav(`/chat/${userId}`);
  };
  const renderUserProfile = () => (
    <div className="w-full h-full flex  flex-col gap-4 p-2">
      <button className="text-whitem text-3xl" onClick={() => nav("/search")}>
        <FaArrowLeft />
      </button>
      <div className="w-full flex justify-between items-center">
        <div
          className="w-24 h-24 rounded-full bg-white relative"
          style={{
            backgroundImage: `url(${userProfile.image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <FaPlus className="absolute bottom-1 p-1 bg-black rounded-full text-white text-xl right-1" />
        </div>
        <div className="  flex flex-col justify-start items-center ">
          <div>{userProfile.posts ? userProfile.posts.length : "0"}</div>
          <div>posts</div>
        </div>
        <div className="flex flex-col justify-start items-center">
  <div>
    {followerList ? (
      userProfile.followersCount ? userProfile.followersCount.length : "0"
    ) : (
<Follow 
  data={userProfile.followersCount ? userProfile.followersCount.length : 0}  
  fun={() => getAllFollowers(userId)}
/>
    )}
  </div>
  <div onClick={() => setFollowerList(true)}>followers</div>
</div>

        <div className="  flex flex-col justify-start items-center ">
          <div>
            {userProfile.followingCount
              ? userProfile.followingCount.length
              : "0"}
          </div>
          <div >following</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="px-3 text-white font-thin w-fit py-1 rounded-lg  bg-stone-800 bg-opacity-40">
          {userProfile?.username ? userProfile.username : "no name"}
        </div>
        <div className="px-3 text-blue-500 font-extralight text-xs w-fit py-1 rounded-lg  bg-stone-800 bg-opacity-40">
          {userProfile?.bio}
        </div>
      </div>
      {myAcount ? (
        <div className="w-full flex justify-between text-xs  gap-1">
          <div className="md:p-2 p-1 w-[30%] rounded-lg bg-stone-800 bg-opacity-40 font-thin">
{userProfile&&
  <UpdateProfile  userProfile={userProfile}/>
}          </div>
          <button className="md:p-2 p-1 w-[30%] rounded-lg bg-stone-800 bg-opacity-40     font-thin">
            share profile
          </button>
          <div className="md:p-2 p-1 w-[30%] rounded-lg bg-stone-800 bg-opacity-40    font-thin">
            {" "}
            <CreatePostModal  />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between text-xs  gap-1">
          <button className="md:p-2 p-1 w-[30%] rounded-lg bg-stone-800 bg-opacity-40     font-thin">
            share profile
          </button>

           {isFollowed?
          <button className="md:p-2 p-1 w-[30%] rounded-lg bg-blue-600  bg-opacity-40     font-thin">
           following
          </button>
          :
          <button className="md:p-2 p-1 w-[30%] rounded-lg bg-blue-600  bg-opacity-40     font-thin">
            followback
            </button>
          
          } 
          <button onClick={() => handleRoute(userId)} className="md:p-2 p-1 w-[30%] rounded-lg bg-stone-800 bg-opacity-40     font-thin">
            message{" "}
          </button>
        </div>
      )}
      <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1">
        {
          userProfile.posts.map((post) => (
            <div
              key={post._id}
              className="bg-stone-50 relative  bg-opacity-80 text-center text-3xl md:h-52 h-32"
              style={{
                backgroundImage: `url(${post.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >

              <div className="dropdown dropdown-end relative w-full h-full ">
                <div
                  tabIndex={0}
                  role="button"
                  className="absolute top-[1px] right-[3px]"
                >
                  <FaAnchor className="text-white text-md" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] flex flex-col overflow-hidden  p-0  shadow backdrop-blur-lg text-white text-[10px] md:xs rounded-box w-20"
                >
                  <button className="w-full h-full hover:bg-stone-50 hover:bg-opacity-10  transition-all duration-300">
                    edit
                  </button>
                  <button
                    className="w-full h-full hover:bg-stone-50 hover:bg-opacity-10  transition-all duration-300"
                    onClick={() => deletePost(post._id)}
                  >
                    delete
                  </button>
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
      <div className="w-full h-full flex flex-col gap-4 p-2">
        <div className="w-full flex justify-between items-center">
          <div className="w-24 h-24 rounded-full skeleton"></div>
          <div className="flex flex-col justify-start items-center">
            <div className="skeleton w-8 h-8"></div>
            <div className="skeleton w-20 h-3 mt-1"></div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="skeleton w-8 h-8"></div>
            <div className="skeleton w-20 h-3 mt-1"></div>
          </div>
          <div className="flex flex-col justify-start items-center">
            <div className="skeleton w-8 h-8"></div>
            <div className="skeleton w-20 h-3 mt-1"></div>
          </div>
        </div>

        {/* Additional content */}
        <div className="w-full flex flex-col gap-1">
          <div className="skeleton w-44 h-8 rounded-lg  "></div>
          <div className="skeleton w-44 h-8 rounded-lg "></div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex justify-between gap-1">
          <div className="md:p-2 p-1 w-[30%] rounded-lg skeleton h-8 font-bold"></div>
          <button className="md:p-2 p-1 w-[30%] rounded-lg skeleton h-8 font-bold"></button>
          <button className="md:p-2 p-1 w-[30%] rounded-lg skeleton h-8 font-bold"></button>
        </div>

        {/* User posts */}
        <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1">
          {/* Render skeleton UI for posts */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="skeleton    text-center text-3xl md:h-52 h-32"
            ></div>
          ))}
        </div>
        
      </div>
    );
  };

  return <>{isLoading || isError ? renderSkeleton() : renderUserProfile()}</>;
}

export default Account;
