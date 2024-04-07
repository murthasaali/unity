import React, { useState,useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";

import { getAllcomments, getAPost } from "../utils/communityServices";
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { container } from "../constants/framermotion";
import axios from "axios";
import toast from "react-hot-toast";
const items = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
function PostDetails() {
  const { postId } = useParams();
  const [comments, setComments] = useState({}); // Define 'comments' state variable
  const { register, handleSubmit } = useForm();

  const [commentOpen, setCommentOpen] = useState(false);
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

  useEffect(() => {
    fetchComment(postId);
  }, [postId]); // Make sure to include postId in the dependency array to re-fetch comments when postId changes

  const nav =useNavigate()
  // Call the getAPost function using React Query
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery(["post", postId], () => getAPost(postId));

  console.log(postId);

  if (isLoading) return <div>Loading...</div>; // Render loading state while fetching post
  if (isError) return <div>Error: {error.message}</div>; // Render error state if fetching post fails

  
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



  return (
    <div className="w-full h-screen bg-black">
      <div className="w-full h-full flex justify-center p-0">
        <div
          className="md:h-[100%] h-[100%] bg-stone-800 bg-opacity-40 w-full md:w-[750px] overflow-y-scroll flex flex-col justify-start gap-3 items-start md:p-4 p-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex ">

           <button className="text-whitem text-3xl" onClick={() => nav("/search")}>
        <FaArrowLeft  />
      </button >
      <p className="text-transparent bg-clip-text bg-gradient-to-r font-bold text-2xl px-4 from-blue-500 to-purple-500">Post</p>
          </div>
          <div className="md:w-[80%] w-full h-[420px]  relative ">
            <div className="flex justify-start items-end gap-[10px] bg-transparent">
              <div
                className="w-10 h-10 rounded-full bg-white relative"
                style={{
                  backgroundImage: `url(${post.postedBy.image})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                {/* <FaPlus className='absolute bottom-1 p-1 bg-black rounded-full text-white text-xl right-1' /> */}
              </div>

              {/* <img src={post.postedBy.image} className='h-10 w-10 md:h-14 md:w-14 rounded-full' /> */}
              <p className="text-xs text-orange-500">
                {post.postedBy.username
                  ? post.postedBy.username
                  : post.postedBy.email}
              </p>
            </div>
            <div
              className="w-full h-full bg--200 relative flex flex-col justify-end p-3 mt-3"
              style={{
                backgroundImage: `url(${post.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className=" h-auto gap-3 flex flex-col text-white w-full">
                <div>
                  <p>{post.caption}</p>
                  <p>{post.hashtag}</p>
                </div>
                <div className="text-2xl flex gap-2">
                <div className="tooltip tooltip-bg-blue-100" data-tip="like">
  <button className=""><FaHeart/></button>
</div>
                  <button onClick={() => setCommentOpen(!commentOpen)}>
                    <FaMessage />
                  </button>
                </div>
              </div>
            </div>
            {
              commentOpen&&
              <motion.form
              variants={container}
              onSubmit={handleSubmit((data) =>
                onSubmit(data, postId)
              )}
            
              className="flex gap-1 justify-start sticky top-0  items-start"
            >
              <motion.input
              variants={items}
              {...register("comment")}

                placeholder="comment the post...."
                name="comment"
                className="  bg-transparent right-0 w-[100%] rounded-xl h-12  text-white text-xs font-thin px-4 "
              />
              <button
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
            </motion.form>
            }
      <div className="flex flex-col ">
  {
    comments[postId] && comments[postId].map((comment, index) => (
      <div key={index} className="flex justify-between w-3/4 rounded-md mt-1 backdrop-blur-[3px] px-2 py-1 text-xs text-black">
        <div className="flex gap-1 items-center h-auto justify-center">
          <img
            src={comment.author.image}
            className="h-8 w-8 rounded-full"
            alt="hello"
          />
          <div className="text-white text-opacity-80 w-fit   py-1 px-4  bg-gradient-to-r from-violet-500 to-fuchsia-500  rounded-b-2xl text-md font-normal text-start rounded-tr-2xl">
            {comment.text}
            {/* Removed hardcoded comment */}
          </div>
        </div>
      </div>
    ))
  }
</div>
</div>

        </div>
      </div>
    </div>
  );
}

export default PostDetails;
