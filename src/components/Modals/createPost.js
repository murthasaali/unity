import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import uploadToCloudinary from '../../utils/cloudinaryUpload';
import { toasting } from '../../constants/toast/customToast';

function CreatePostModal() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  console.log('Rendering CreatePost component');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    uploadImage(selectedFile);
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

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        'https://unity-backend-p0uh.onrender.com/posts/createpost',
        {
          image: imageUrl,
          caption: data.caption,
          hashtag: data.hashtag
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Handle success response
      console.log('Post created successfully:', response);
      toasting("Post created successfully", "🚀");
    } catch (error) {
      // Handle error
      console.error('Error creating post:', error);
      // Optionally, display an error message to the user
    }
  };
  return (
    <div>
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        create post
      </button>

<dialog id="my_modal_3" className="modal">
  <div className="modal-box ">
  <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-96  flex flex-col overflow-y-scroll'>
      {/* Close button */}
      
      {/* Form content */}
      <div className='w-full h-full flex flex-col'>
              <input className='w-1/2 h-8 bg-transparent border rounded-full mt-4' type='file' onChange={handleFileChange} />
            <div className='w-full mt-2 rounded-xl h-32' style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <input {...register("hashtag")} className='w-full  text-white text-xs font-thin px-2  h-8 bg-transparent  rounded-full mt-4' placeholder='Hashtag.....' />
            <input {...register("caption")} className='w-full text-white text-xs font-thin px-2  h-8 bg-transparent  rounded-full mt-4' placeholder='Caption.....' />
            <div className='w-full p-2 mt-2 flex gap-1 text-white'>
              <button type="reset" className='w-1/2 py-1 text-white px-3 transition-all duration-300 rounded-full hover:border-b-2 translate-x-1  hover:bg-stone-100 hover:bg-opacity-40'>Reset</button>
              <button type="submit" className='w-1/2 py-1 text-white px-3 transition-all duration-300 rounded-full hover:border-b-2 translate-x-1  hover:bg-stone-100 hover:bg-opacity-40'>Submit</button>
            </div>
          </div>
    </form>
  </div>
</dialog>

      {/* Button to trigger the function */}
    </div>
  )
}

export default CreatePostModal