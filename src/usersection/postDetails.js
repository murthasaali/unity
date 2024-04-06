import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { getAPost } from "../utils/communityServices";

function PostDetails() {
  const { postId } = useParams();
  const [commentOpen, setCommentOpen] = useState(false);

  // Call the getAPost function using React Query
  const { data: post, isLoading, isError, error } = useQuery(['post', postId], () => getAPost(postId));

  console.log(postId);

  if (isLoading) return <div>Loading...</div>; // Render loading state while fetching post
  if (isError) return <div>Error: {error.message}</div>; // Render error state if fetching post fails

  return (
    <div className="w-full h-screen bg-black">
      <div className="w-full h-full flex justify-center p-0">
        <div
          className="md:h-[100%] h-[100%] bg-opacity-40   w-full md:w-[750px] overflow-y-scroll flex flex-col justify-start items-start md:p-4 p-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="w-[80%] h-96  relative">
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
                      <p
                        className="text-xs text-orange-500"
                     
                      >
                        {post.postedBy.username
                          ? post.postedBy.username
                          : post.postedBy.email}
                      </p>
                    </div>
            <div className="w-full h-full bg--200 relative flex flex-col justify-end p-3 mt-3" >
              <div className=" h-auto gap-3 flex flex-col w-full"       style={{
                      backgroundImage: `url(${post.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}>
                <div>
                  <p>{post.caption}</p>
                  <p>{post.hashtag}</p>
                </div>
                <div className="text-2xl flex gap-2">
                  <button>
                    <FaHeart />
                  </button>
                  <button onClick={() => setCommentOpen(!commentOpen)}>
                    <FaMessage />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {commentOpen && <form>
            {/* Form for commenting */}
          </form>}
          <div className="flex justify-between  w-3/4  rounded-md mt-1 backdrop-blur-[3px]  px-2 py-1 text-xs  text-black">
            <div className="flex gap-1 items-center h-auto justify-center">
              <img
                // src={comment.author.image}
                className="h-14 w-14 rounded-full"
                alt="hello"
              />
              <div className="bg-stone-50 bg-opacity-25 text-white font-thin w-fit p-1">
                {/* {comment.text} */}
                nice picture 😍
              </div>
            </div>
            <FaHeart className="text-blue-300 text-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
