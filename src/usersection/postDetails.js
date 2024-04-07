import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAPost } from "../utils/communityServices";
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";
function PostDetails() {
  const { postId } = useParams();
  const [commentOpen, setCommentOpen] = useState(false);
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
              <div className=" h-auto gap-3 flex flex-col w-full">
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
              <form
            
              className="flex gap-1 justify-start sticky top-0  items-start"
            >
              <motion.input
                placeholder="comment the post...."
                name="comment"
                className="bottom-0  bg-transparent right-0 w-[100%] rounded-xl h-8  text-white text-xs font-thin px-4 "
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
            </form>
            }
            <div className="flex justify-between  w-3/4  rounded-md mt-1 backdrop-blur-[3px]  px-2 py-1 text-xs  text-black">
            <div className="flex gap-1 items-center h-auto justify-center">
              <img
                // src={comment.author.image}
                className="h-14 w-14 rounded-full"
                alt="hello"
              />
              <div className="bg-stone-50 bg-opacity-25 text-white font-thin w-fit p-1">
                {/* {comment.text} */}
                nice picture 😍z
              </div>
            </div>
            <FaHeart className="text-blue-300 text-md" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
