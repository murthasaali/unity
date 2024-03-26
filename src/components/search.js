import React, { useEffect, useState } from "react";
import emptypic from "../assets/emptyprofile.png";
import { getAllPosts } from "../utils/communityServices";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Account from "./account";

const Search = () => {
  const [input, setInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const nav = useNavigate();

  const {
    data: accounts,
    isLoading: isAccountsLoading,
    isError: isAccountsError,
    refetch: refetchAccounts,
  } = useQuery(["accounts", input], async () => {
    const response = await axios.get(
      `https://ecommerce-api-shne.onrender.com/auth/search/?query=${input}`
    );
    return response.data;
  });

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    refetch: refetchPosts,
  } = useQuery(["posts"], async () => {
    const res = await getAllPosts(1, 18); // Assuming getAllPosts returns the latest posts
    return res.latestPosts;
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAccountClick = (userId) => {
    nav(`/user/${userId}`);
    setSelectedUserId(userId);
  };

  return (
    <>
      <div className="my-3 w-full">
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Search...."
          className="w-full bg-opacity-25 bg-stone-950 px-3 py-2 outline-none"
          style={{ border: "none" }}
        />
      </div>

      {!input.length > 0 ? (
        isPostsLoading ? (
          <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1">
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
            <div className="text-center text-3xl skeleton   md:h-52 h-32"></div>
          </div>
        ) : (
          <div className="grid-container grid w-full grid-cols-3 md:gap-2 gap-1">
            {posts.map((post, index) => (
              <div
                key={index}
                className="text-center text-3xl md:h-52 h-32"
                style={{
                  backgroundImage: `url(${post.image})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            ))}
          </div>
        )
      ) : isAccountsLoading ? (
        <div className="w-full grid-container grid grid-cols-1 gap-1">
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[90%] flex flex-col">
          {/* Render account search results */}
          <div className="w-full grid-container grid grid-cols-1 gap-1">
            {accounts.map((user) => (
              <button
                key={user._id}
                className="w-full flex h-20 gap-2 p-2"
                onClick={() => handleAccountClick(user._id)}
              >
                <div
                  className="w-14 h-14 rounded-full"
                  style={{
                    backgroundImage: `url(${user.image || emptypic})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="h-14 w-auto flex flex-col justify-center">
                  <div className="text-white font-thin text-sm md:text-md">
                    {user.username}
                  </div>
                  <div className="text-white font-thin text-xs md:text-xs">
                    {user.email}
                  </div>
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
