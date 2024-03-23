import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { RiLoginCircleLine } from "react-icons/ri";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { logout } from '../redux/authSlice';
import { useForm } from "react-hook-form";
import uploadToCloudinary from '../utils/cloudinaryUpload';
import axios from 'axios'
import toast from 'react-hot-toast'
import { getUserProfile } from '../utils/communityServices';
function SetProfileEditModal({ setOpen, open }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { register, handleSubmit } = useForm();
  console.log(selectedFile,userPosts,loading)
  useEffect (() => {
    const fetchData = async () => {
      try {
        const profileData = await getUserProfile();
        setUserProfile(profileData.user);
        setUserPosts(profileData.user.posts);
       
            setLoading(false); // Set loading to false when data is fetched
setImageUrl(profileData.image)
       
      } catch (error) {
        console.error('Error fetching user pr ofile:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);
  const onCloseModal = () => setOpen(false);
  const token=localStorage.getItem("token")
  console.log(token)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      uploadImage(file);
    };
    
  const uploadImage = async (file) => {
    try {
      const imageUrl = await uploadToCloudinary(file);
      console.log(imageUrl)
      setImageUrl(imageUrl);
      console.log(imageUrl)
    } catch (error) {
      alert("Error uploading image:")
    }
  };
const onSubmit=async(data)=>{
  try {
    console.log(data)
    const userId=localStorage.getItem("userId")
  const response = await axios.post(`https://ecommerce-api-shne.onrender.com/auth/attachUserPhoto/${userId}`, {
    image: imageUrl, // Assuming imageUrl is the state containing the URL of the uploaded image
    username: data.username,
    bio: data.bio
  }, );
  
  // Handle success response
  console.log(response)
  toast.success("user profile updated ")    
  } catch (error) {
    console.log(error)
    
  }
}
  return (
    <div>
    {token?   
        <button className="  md:px-2 p-1 w-[100%] rounded-lg    font-thin" onClick={() => setOpen(true)}>
            edit profile
        </button>
      :<button onClick={()=>navigate("/login")} className='p-2 rounded-full bg-black text-xl'>
      <RiLoginCircleLine className='text-white' />
        </button>}
      <Modal open={open}  onClose={onCloseModal} center classNames={{ modal: 'w-[40%] bg-transparent rounded-lg backdrop-blur-md ', closeButton: 'text-white' }}>
<form  onSubmit={handleSubmit(onSubmit)}>
<div className="avatar">
        <div className="md:w-14 w-10 rounded-full" onClick={() => setOpen(true)}>
          <img src={userProfile?userProfile.image:"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt="avatar" />
        </div>
      </div>
      <input  className='w-1/2 h-8 bg-transparent border rounded-full mt-4' type='file' onChange={handleFileChange}/> 
      <input value={userProfile.username} {...register("username")} className='w-full  text-white text-xs font-thin px-2  h-8 bg-transparent  rounded-full mt-4' placeholder='username.....' />
      <textarea value={userProfile.bio} {...register("bio")} className='w-full  text-white text-xs font-thin px-2  h-14 bg-transparent  rounded-md mt-4' placeholder='bio.....' />

       <div className='w-full flex justify-between gap-4'>
       <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md" onClick={()=>{
            setTimeout(() => {
                dispatch(logout())
                onCloseModal()
                
            }, 3000)
        }}>logout</button>
        <button type='submit' className="bg-stone-100 hover:bg-red-700 text-black px-4 py-2 rounded-md" onClick={()=>{
            setTimeout(() => {
                
                onCloseModal()
                
            }, 3000)
        }}>update </button>
       </div>
</form>
      </Modal>
    </div>
  );
}

export default SetProfileEditModal;
