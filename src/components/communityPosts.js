import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { CiHeart } from "react-icons/ci";
import { MdChat, MdSaveAlt, MdShare } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { container } from "../constants/framermotion";
import EmojiPicker from "emoji-picker-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsEmojiSmileFill } from "react-icons/bs";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import Unfollowlist from "./unfollowlist";
import { GiExpand } from "react-icons/gi";

import { Player } from "@lottiefiles/react-lottie-player";
import {
  getAllPosts,
  getAllcomments,
  likeaPost,
} from "../utils/communityServices";
import UserChatModal from "./userChatModal";
import { FaHeart } from "react-icons/fa6";
import { toasting } from "../constants/toast/customToast";
const items = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function CommunityPosts() {
  const [commentOpen, setCommentOpen] = useState(false);
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();
  const [loadingPostId, setLoadingPostId] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null); // State to track which post's chat modal is open
  const [likeLoading, setLikeLoading] = useState(false);
  const [comments, setComments] = useState({}); // Define 'comments' state variable
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("https://unity-backend-p0uh.onrender.com"));
  }, []);

  const toggleChatModal = (postId) => {
    // Define 'toggleChatModal' function
    setCommentOpen(!commentOpen); // Toggle comment section visibility

    fetchComment(postId);
    setSelectedPostId(postId);
    setModalOpen(!modalOpen);
  };

  const handleDownload = (image) => {
    // Define 'handleDownload' function
    console.log("Download image:", image);
  };

  const toggleEmojiPicker = () => {
    // Define 'toggleEmojiPicker' function
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    // Define 'handleEmojiClick' function
    setSelectedEmoji(emojiObject);
  };

  const fetchComment = async (postId) => {
    console.log("fetching comment");
    try {
      const response = await getAllcomments(postId);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response,
      }));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };



  const onSubmit = async (data, postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://unity-backend-p0uh.onrender.com/posts/commentpost",
        {
          postId: postId,
          text: data.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Commented post");
      fetchComment(postId);
    } catch (error) {
      throw error; // Throw error if request fails
    }
  };
  useEffect(() => {
    if (socket) {
      const user = localStorage.getItem("username");
      socket.emit("newUser", user);
      socket.on("getNotification", ({ senderName, type }) => {
        console.log(`Received notification from ${senderName}`);
        if (type === "like") toasting(`${senderName} liked your post`, "💝");
        else toasting(`${senderName} following you `, "🖤");
      });
    }
  }, [socket]);

  const liking = async (post) => {
    try {
      setLoadingPostId(post._id);
      const username = localStorage.getItem("username");
      const userId = localStorage.getItem("userId");
      console.log(post.postedBy);
      const res = await likeaPost(post._id, username);

      if (res.message === "Post liked successfully") {
        setLikeLoading(true);
        setTimeout(() => {
          setLikeLoading(false);
          setLoadingPostId(null);
        }, 3000);
        const username = localStorage.getItem("username");
        socket.emit("sendNotification", {
          senderName: username,
          receiverName: post.postedBy.username,
          type: "like",
        });
        toasting("You liked this post ", "😍😍");
      } else {
        toasting("You disliked this post ", "🤐🤮");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [page, setPage] = useState(1);
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    refetch: refetchPosts,
    fetchNextPage,
    hasNextPage,
  } = useQuery(
    ["posts", page],
    async ({ pageParam = 1 }) => {
      const res = await getAllPosts(pageParam, 10); // Fetch 10 posts for the given page
      return res.latestPosts;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        // Check if there are more posts available
        // If there are more posts, return the next page number, otherwise return undefined to signal no more pages
        return allPages.length + 1; // Assuming each page has 10 posts, increment the page number
      },
    }
  );

  useEffect(() => {
    // Refetch the posts data when the page state changes
    refetchPosts();
  }, [refetchPosts, page]);

  // Function to handle loading more posts
  const loadMorePosts = () => {
    // Fetch next page of posts
    fetchNextPage();
  };
  const handlepostClick = (postId) => {
    nav(`/p/${postId}`);
  };

  return (
    <div className="h-full w-full ">
      {(!posts || posts.length === 0) && (
        <>
          <div className={`relative  `}>
            <div className="w-full  h-fit p-1 flex flex-col gap-2">
              <div className="w-full md:h-[450px] h-auto bg-opacity-50 md:gap-4 gap-1  backdrop-blur-sm relative rounded-3xl flex flex-col justify-center px-4 items-center md:items-start">
                <div className="w-auto mt-2 text-xl p-3 bg-opacity-50 absolute right-0 md:flex hidden flex-col justify-around rounded-lg h-96">
                  <button className="w-20 flex justify-center items-center flex-col hover:text-2xl  text-red-500 transition-all duration-300 py-3 hover:text-red-500">
                    <CiHeart />
                    <div className="text-xs text-stone-100">liked by </div>
                  </button>
                  <button className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 ">
                    <MdChat />{" "}
                  </button>
                  <button className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 ">
                    <MdShare />
                  </button>
                  <button className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 ">
                    <MdSaveAlt />
                  </button>
                </div>
                <div className="w-full h-auto flex justify-between items-center mt-2">
                  <div className="flex justify-center items-end gap-[10px] bg-transparent">
                    <div className="w-14 h-14 rounded-full skeleton relative">
                      {/* <FaPlus className='absolute bottom-1 p-1 bg-black rounded-full text-white text-xl right-1' /> */}
                    </div>

                    {/* <img src={item.postedBy.image} className='h-10 w-10 md:h-14 md:w-14 rounded-full' /> */}
                    <p className="text-xs text-orange-500 p-3 w-20 skeleton"></p>
                  </div>
                  <div className="flex items-center skeleton gap-3">
                    <button>
                      <GiExpand />
                    </button>
                  </div>
                </div>
                <div className="h-[380px] md:h-[500px] relative rounded-lg md:w-[90%] w-[380px] skeleton">
                  <div className="w-full relative h-full bg-gray-950 text-xl bg-opacity-30 rounded-lg">
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="visible"
                      className="h-[400px]   bg-opacity-30 w-full overflow-y-scroll p-3 flex flex-col items-center"
                    ></motion.div>
                  </div>
                </div>
                <div className="w-full h-auto p-3 flex md:hidden justify-around rounded-lg">
                  <button>
                    {" "}
                    <CiHeart />{" "}
                  </button>
                  <button>
                    {" "}
                    <MdChat />
                  </button>
                  <button>
                    {" "}
                    <MdShare />
                  </button>
                  <button>
                    <MdSaveAlt />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={`relative  md:mt-20 mt-4 `}>
            <div className="w-full  h-fit p-1 flex flex-col gap-2">
              <div className="w-full md:h-[450px] h-auto bg-opacity-50 md:gap-4 gap-1  backdrop-blur-sm relative rounded-3xl flex flex-col justify-center px-4 items-center md:items-start">
                <div className="w-auto mt-2 text-xl p-3 bg-opacity-50 absolute right-0 md:flex hidden flex-col justify-around rounded-lg h-96">
                  <button className="w-20 flex justify-center items-center flex-col hover:text-2xl  text-red-500 transition-all duration-300 py-3 hover:text-red-500">
                    <CiHeart />
                    <div className="text-xs text-stone-900">liked by </div>
                  </button>
                  <button className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 ">
                    <MdChat />{" "}
                  </button>
                  <button className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 ">
                    <MdShare />
                  </button>
                  <button className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 ">
                    <MdSaveAlt />
                  </button>
                </div>
                <div className="w-full h-auto flex justify-between items-center mt-2">
                  <div className="flex justify-center items-end gap-[10px] bg-transparent">
                    <div className="w-14 h-14 rounded-full skeleton relative"></div>
                    <p className="text-xs text-orange-500 p-3 w-20 skeleton"></p>
                  </div>
                  <div className="flex items-center skeleton gap-3">
                    <button>
                      <GiExpand />
                    </button>
                  </div>
                </div>
                <div className="h-[400px] md:h-[500px] relative rounded-lg md:w-[90%] w-full skeleton">
                  <div className="w-full relative h-full bg-gray-950 text-xl bg-opacity-30 rounded-lg">
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="visible"
                      className="h-[400px]   bg-opacity-30 w-full overflow-y-scroll p-3 flex flex-col items-center"
                    ></motion.div>
                  </div>
                </div>
                <div className="w-full h-auto p-3 flex md:hidden justify-around rounded-lg">
                  <button>
                    {" "}
                    <CiHeart />{" "}
                  </button>
                  <button>
                    {" "}
                    <MdChat />
                  </button>
                  <button>
                    {" "}
                    <MdShare />
                  </button>
                  <button>
                    <MdSaveAlt />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
              <div className="w-full  flex">
              <p className="text-transparent bg-clip-text bg-gradient-to-r font-bold text-2xl px-4 from-blue-500 to-purple-500">Posts...</p>


              </div>

      {posts &&
        posts.map((item, index) => (
          <>
          
            <div className={`relative  mt-10`} key={index}>
              <div className="w-full backdrop-cyan-600 h-fit p-1 flex flex-col gap-2">
                <div className="w-full md:h-[450px] h-auto bg-opacity-50 md:gap-4 gap-1  backdrop-blur-sm relative rounded-3xl flex flex-col justify-center md:px-4 p-0 items-center md:items-start">
                  <div className="w-auto mt-2 text-xl md:p-3 p-0 bg-opacity-50 absolute right-0 md:flex hidden flex-col justify-around rounded-lg h-96">
                    <button
                      className="w-20 flex justify-center items-center flex-col hover:text-2xl  text-red-500 transition-all duration-300 py-3 hover:text-red-500"
                      onClick={() => liking(item)}
                    >
                      <CiHeart />
                      <div className="text-xs text-stone-100">
                        liked by {item.likesCount ? item.likesCount : "0"}{" "}
                      </div>
                    </button>
                    <button
                      className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 "
                      onClick={() => toggleChatModal(item._id)}
                    >
                      <MdChat />{" "}
                    </button>
                    <button className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 ">
                      <MdShare />
                    </button>
                    <button
                      className="w-20 flex justify-center items-center hover:text-2xl transition-all duration-300 py-3 "
                      onClick={() => handleDownload(item.image)}
                    >
                      <MdSaveAlt />
                    </button>
                  </div>
                  <div className="w-full h-auto flex justify-between items-center mt-2">
                    <div className="flex justify-center items-end gap-[10px] bg-transparent">
                      <div
                        className="w-10 h-10 rounded-full bg-white relative"
                        style={{
                          backgroundImage: `url(${item.postedBy.image})`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      >
                        {/* <FaPlus className='absolute bottom-1 p-1 bg-black rounded-full text-white text-xl right-1' /> */}
                      </div>

                      {/* <img src={item.postedBy.image} className='h-10 w-10 md:h-14 md:w-14 rounded-full' /> */}
                      <p
                        className="text-transparent bg-clip-text bg-gradient-to-r font-bold text-md px-4 from-blue-500 to-purple-500"
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedUser(item);
                          console.log("selected user", selectedUser);
                        }}
                      >
                        {item.postedBy.username
                          ? item.postedBy.username
                          : item.postedBy.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="relative overflow-hidden focus:outline-none"
                        onClick={() => handlepostClick(item._id)}
                      >
                        <span>
                          <GiExpand />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="h-[400px] md:h-[500px] relative  md:w-[90%] w-full"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* Load more button */}
                    {hasNextPage && (
                      <button onClick={loadMorePosts} disabled={isPostsLoading}>
                        {isPostsLoading ? "Loading..." : "Load More"}
                      </button>
                    )}
                    {loadingPostId === item._id && likeLoading && (
                      <div
                        className="absolute bottom-0 left-[-10px] w-[150px]   h-[150px]  flex justify-center items-center"
                        style={{ zIndex: 999 }}
                      >
                        <Player
                          src="https://lottie.host/0bb4d081-4124-4a8c-987b-4a46982e91cc/Naj4kVQ2pk.json"
                          autoplay
                          loop
                          style={{ height: "150px", width: "150px" }}
                        ></Player>
                      </div>
                    )}
                    <div className="w-full relative h-full bg-gray-950 text-xl bg-opacity-30 rounded-lg">
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="h-[400px]   bg-opacity-30 w-full overflow-y-scroll p-3 flex flex-col items-center"
                      >
                        {commentOpen &&
                          selectedPostId === item._id &&
                          comments[item._id] && (
                            <>
                              <form
                                onSubmit={handleSubmit((data) =>
                                  onSubmit(data, item._id)
                                )}
                                className="flex gap-1 justify-start sticky top-0  items-start"
                              >
                                <motion.input
                                  {...register("comment")}
                                  placeholder="comment the post...."
                                  variants={items}
                                  name="comment"
                                  className="bottom-0  bg-transparent right-0 w-[100%] rounded-xl h-8  text-white text-xs font-thin px-4 "
                                />
                                <button
                                  onClick={toggleEmojiPicker}
                                  className="h-8  flex justify-center items-center w-8 rounded-full  transition-all duration-300"
                                >
                                  <BsEmojiSmileFill className=" text-yellow-400" />
                                </button>
                                <button
                                  type="submit"
                                  className="h-8  flex justify-center items-center  rounded-full  transition-all duration-300"
                                >
                                  <IoSend className="text-white text-sm text-opacity-95" />
                                </button>
                              </form>

                              {showEmojiPicker && (
                                <motion.div variants={items}>
                                  <EmojiPicker
                                    searchDisabled
                                    onEmojiClick={handleEmojiClick}
                                  />
                                </motion.div>
                              )}
                              {comments[item._id].map(
                                (comment, commentIndex) => (
                                  <div
                                    variants={items}
                                    key={commentIndex}
                                    className="flex justify-between  w-[80%] rounded-md mt-1 backdrop-blur-[3px]  px-2 py-1 text-xs text-black"
                                  >
                                    <div className="flex gap-1 items-center h-auto justify-center">
                                      <img
                                        src={comment.author.image}
                                        className="h-8 w-8 rounded-full"
                                        alt="hello"
                                      />
                                      <div className="bg-stone-50 bg-opacity-25 text-white font-thin w-fit p-1">
                                        {" "}
                                        {comment.text}
                                      </div>
                                    </div>
                                    <FaHeart className="text-blue-300 text-md" />
                                  </div>
                                )
                              )}
                            </>
                          )}
                      </motion.div>

                      <div className="absolute left-2 text-white bottom-2">
                        <div className="text-xl w-[80%]">{item.hashtag}</div>
                        <div className="font-thin text-xs w-[70%]">
                          {item.caption}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-auto p-3 flex md:hidden justify-start rounded-lg">
                    <div className="flex gap-3 ">
                      {" "}
                      <button
                        className="text-2xl hover:text-red-600"
                        onClick={() => liking(item)}
                      >
                        {" "}
                        <FaHeart />{" "}
                      </button>
                      <button className="text-2xl hover:text-red-600">
                        {" "}
                        <MdChat onClick={() => toggleChatModal(item._id)} />
                      </button>
                      <button className="text-2xl hover:text-red-600">
                        {" "}
                        <MdShare />
                      </button>
                      <button
                        className="text-2xl hover:text-red-600"
                        onClick={() => handleDownload(item.image)}
                      >
                        <MdSaveAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {selectedUser && (
                <div className="w-full  bg-white">
                  <UserChatModal
                    setOpen={setModalOpen}
                    open={modalOpen}
                    item={item.postedBy}
                  />
                </div>
              )}
            </div>

            {index === 3 && <Unfollowlist />}
          </>
        ))}
    </div>
  );
}

export default CommunityPosts;
