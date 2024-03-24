import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { RiLoginCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function UserProfileModal({ setOpen, open }) {
  const onCloseModal = () => setOpen(false);
  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();
  return (
    <div > {/* Add a className to the parent container */}
      {token ?

      
        <button className=" w-full rounded-full" onClick={() => setOpen(true)}>
          edit profile
        </button>
        :
        <button onClick={() => navigate("/login")} className='p-2 rounded-full bg-black text-xl'>
          <RiLoginCircleLine className='text-white' />
        </button>}
      <Modal open={open}  onClose={onCloseModal} center classNames={{ modal: ' rounded-lg backdrop-blur-md ', closeButton: 'text-white' }} styles={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}>
    
      </Modal>
    </div>
  );
}

export default UserProfileModal;
