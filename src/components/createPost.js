import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { RiArrowDropLeftLine, RiLoginCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import uploadToCloudinary from '../utils/cloudinaryUpload'; // Adjust the path as needed
import axios from 'axios';

function CreatePost({ setOpen, open }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
console.log(selectedFile)
  const onCloseModal = () => {
    setOpen(false);
    reset(); // Reset form fields when modal is closed
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    uploadImage(file);
  };

    const uploadImage = async (file) => {
      try {
        const imageUrl = await uploadToCloudinary(file);
        setImageUrl(imageUrl);
        console.log(imageUrl)
      } catch (error) {
        alert("Error uploading image:")
      }
    };

  const onSubmit = async (data) => {
    try {
      // Send POST request to create post
      console.log(data)
      const token=localStorage.getItem("token")
      const response = await axios.post('https://unity-dev-xbcq.3.us-1.fl0.io/posts/createpost', {
        image: imageUrl, // Assuming imageUrl is the state containing the URL of the uploaded image
        caption: data.caption,
        hashtag: data.hashtag
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Handle success response
      console.log('Post created successfully:', response);
      // Optionally, close the modal
      onCloseModal();
    } catch (error) {
      // Handle error
      console.error('Error creating post:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div>
      {token ?
        <button className=" md:px-2 p-1 w-[100%] rounded-lg    font-thin" onClick={() => setOpen(true)}>
          create post
        </button>
        :
        <button onClick={() => navigate("/login")} className='p-2 rounded-full bg-black text-xl'>
          <RiLoginCircleLine className='text-white' />
        </button>
      }
      <Modal open={open} onClose={()=>setOpen(true)} onOverlayClick={()=>setOpen(true)} closeIcon=" " center styles={{}} classNames={{ modal: 'bg-stone-800 w-[80%] md:w-[40% ] rounded-lg bg-opacity-40 ', closeButton: 'text-white' }}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <button onClick={onCloseModal} className='border border-stone-50 p-1 rounded-full'><RiArrowDropLeftLine className='text-2xl text-white '/></button>
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
      </Modal>
    </div>
  );
}

export default CreatePost;
