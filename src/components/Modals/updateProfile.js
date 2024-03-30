import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import uploadToCloudinary from '../../utils/cloudinaryUpload';
import { logout } from '../../redux/authSlice';
import { toasting } from '../../constants/toast/customToast';

function UpdateProfile({ userProfile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  console.log('Rendering UpdateProfile component');
useEffect(() => {
  setImageUrl(userProfile.image)


}, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    uploadImage(file);
  };

  const uploadImage = async (file) => {
    try {
      const imageUrl = await uploadToCloudinary(file);
      setImageUrl(imageUrl);
      console.log('Uploaded image URL:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  const onSubmit=async(data)=>{
    try {
      console.log(data)
      const userId=localStorage.getItem("userId")
    const response = await axios.post(`https://unity-dev-xbcq.3.us-1.fl0.io/auth/attachUserPhoto/${userId}`, {
      image: imageUrl, // Assuming imageUrl is the state containing the URL of the uploaded image
      username: data.username,
      bio: data.bio
    }, );
    
    // Handle success response
    console.log(response)
    toasting("user profile updated ","🚀")    
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div>
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={() => document.getElementById('my_modal_2').showModal()}
      >
        edit  profile
      </button>

<dialog id="my_modal_2" className="modal">
  <div className="modal-box ">
  <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-96  flex flex-col overflow-y-scroll'>
      {/* Close button */}
      
      {/* Form content */}
      <h1 className='text-xl'>Update Profile</h1>
    <div className='w-full flex flex-col items-center'>

    <div className="avatar">
        <div className="md:w-14 w-10 h-10 md:h-14 rounded-full">
          <img
            src={userProfile ? imageUrl : 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
            alt="avatar"
          />
        </div>
      </div>
      <input className="w-1/2 h-8 bg-transparent flex justify-center items-center p-1 border rounded-full mt-4" type="file" onChange={handleFileChange} />
    </div>
      <input
        value={userProfile ? userProfile.username : 'no name'}
        {...register('username')}
        className="w-full text-white text-xs font-thin px-2 h-8 bg-transparent rounded-full mt-4 outline-none"
        placeholder="Username..."
      />
      <textarea
        value={userProfile ? userProfile.bio : 'no bio'}
        {...register('bio')}
        className="w-full pt-2 text-white text-xs font-thin px-2 h-14 bg-transparent rounded-md mt-4  outline-none"
        placeholder="Bio..."
      />
      <div className="w-full flex justify-between gap-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setTimeout(() => {
              dispatch(logout());
            }, 3000);
          }}
        >
          Logout
        </button>
        <button type="submit" className="bg-stone-100 hover:bg-red-700 text-black px-4 py-2 rounded-md">
          Update
        </button>
      </div>
    </form>
  </div>
</dialog>

      {/* Button to trigger the function */}
    </div>
  );
}

export default UpdateProfile;
