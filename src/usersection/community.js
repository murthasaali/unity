import React, { useState, useEffect } from "react";
import { CiHeart, CiUser, CiSearch, CiHome, CiChat1 } from "react-icons/ci";
import { FiAlignCenter } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllPosts, getUserProfile } from "../utils/communityServices";
import Search from "../components/search";
import Notification from "../components/notification";
import Account from "../components/account";
import home from "../assets/home.png";
import searchicon from "../assets/search_11999858.png";
import chat from "../assets/live-chat_12597027.png";
import Chat from "../components/chat";
import heart from "../assets/heart.png";
import CommunityPosts from "../components/communityPosts";

function Community() {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  console.log(location);
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token"); // Define token here
    token ? nav(location.pathname) : nav("/login");
    const fetchData = async () => {
      try {
        const profileData = await getUserProfile();
        console.log(profileData);
        setUserProfile(profileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchData();
  }, [nav]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.latestPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return <CommunityPosts />;
      case "/search":
        return <Search />;
      case "/chat":
        return <Chat />;
      case "/notification":
        return <Notification />;
      case "/account":
        return <Account user={userId} myAcount={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center overflow-hidden bg-black">
      <div className="w-full bg-black h-auto p-2 flex md:hidden justify-evenly absolute bottom-0 z-50">
        <button
          className={`h-fit p-3 text-2xl text-green-500 bg-opacity-60 ${
            location.pathname === "/" ? "text-green-500" : ""
          }`}
          onClick={() => nav("/")}
        >
          <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${home})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </button>
        <button
          className={`h-fit p-2 text-2xl text-green-500 bg-opacity-60 ${
            location.pathname === "/search" ? "text-green-500" : ""
          }`}
          onClick={() => nav("/search")}
        >
          {" "}
          <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${searchicon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </button>
        <button
          className={`h-fit p-2 text-2xl text-green-500 bg-opacity-60 ${
            location.pathname === "/chat" ? "text-green-500" : ""
          }`}
          onClick={() => nav("/chat")}
        >
          {" "}
          <div
            className="w-8 h-8"
            style={{
              backgroundImage: `url(${chat})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </button>
        <button
          className={`h-fit p-2 text-2xl text-green-500 bg-opacity-60 ${
            location.pathname === "/notification" ? "text-green-500" : ""
          }`}
          onClick={() => nav("/notification")}
        >
          {" "}
          <div
            className="w-8 h-8 absolute"
            style={{
              backgroundImage: `url(${heart})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {localStorage.getItem("notificationCount") > 0 && (
            <div className="rounded-full px-1 font-bold relative text-black bg-white top-0 left-5 text-bold text-xs">
              {localStorage.getItem("notificationCount")}
            </div>
          )}{" "}
        </button>
        <button
          className={`h-fit p-2 text-2xl text-green-500 bg-opacity-60 ${
            location.pathname === "/account" ? "text-green-500" : ""
          }`}
          onClick={() => nav("/account")}
        >
          <div
            style={{
              backgroundImage: `url(${userProfile ? userProfile.image : ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-9 h-9 rounded-full border border-gradient border-gradient-purple"
          ></div>
        </button>
      </div>
      <div className="w-full h-20 mb-2 hidden md:flex bg-black justify-between px-3 items-center">
        <div className="text-w text-xl font-thin">pethouse</div>
        <div className="h-fit w-full md:w-[500px] md:flex hidden justify-evenly items-center">
          <button
            className={`h-fit p-3 rounded-xl bg-opacity-60 ${
              location.pathname === "/"
                ? "border-b-green-600 border-x-transparent border-transparent"
                : "border-transparent"
            }`}
            onClick={() => nav("/")}
          >
            {" "}
            <div
              className="w-8 h-8"
              style={{
                backgroundImage: `url(${home})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </button>
          <button
            className={`h-fit p-3 rounded-xl bg-opacity-60 ${
              location.pathname === "/search"
                ? "border-b-green-600 border-x-transparent border-transparent"
                : "border-transparent"
            }`}
            onClick={() => nav("/search")}
          >
            {" "}
            <div
              className="w-8 h-8"
              style={{
                backgroundImage: `url(${searchicon})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </button>
          <button
            className={`h-fit p-3 rounded-xl bg-opacity-60 ${
              location.pathname === "/chat"
                ? "border-b-green-600 border-x-transparent border-transparent"
                : "border-transparent"
            }`}
            onClick={() => nav("/chat")}
          >
            {" "}
            <div
              className="w-8 h-8"
              style={{
                backgroundImage: `url(${chat})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </button>
          <button
      className={`h-fit p-3 rounded-xl bg-opacity-60 relative ${
        location.pathname === "/notification"
          ? "border-b-green-600 border-x-transparent border-transparent"
          : "border-transparent"
      }`}
      onClick={() => nav("/notification")}
    >
      <div
        className="w-8 h-8"
        style={{
          backgroundImage: `url(${heart})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {localStorage.getItem("notificationCount") > 0 && (
        <div className="rounded-full px-1 font-bold  text-black absolute bg-white top-2 left-2  text-bold text-xs">
          {localStorage.getItem("notificationCount") }
        </div>
      )}
    </button>
          <button
            className={`h-fit p-3 rounded-xl bg-opacity-60 ${
              location.pathname === "/account"
                ? "border-b-green-600 border-x-transparent border-transparent"
                : "border-transparent"
            }`}
            onClick={() => nav("/account")}
          >
            {" "}
            <div
              style={{
                backgroundImage: `url(${userProfile ? userProfile.image : ""})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="w-9 h-9 rounded-full border border-gradient border-gradient-purple"
            ></div>
          </button>
        </div>
        <button className="text-white font-thin text-3xl">
          <FiAlignCenter />
        </button>
      </div>
      <div className="w-full h-full flex justify-center p-0">
        <div
          className="md:h-[650px] h-[100%] bg-opacity-40 rounded-xl  w-full md:w-[750px] overflow-y-scroll flex flex-col justify-start items-center md:p-4 p-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Community;
