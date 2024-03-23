import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { RiLoginCircleLine } from "react-icons/ri";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { logout } from '../redux/authSlice';

function AvatarModal({ setOpen, open }) {
  const onCloseModal = () => setOpen(false);
  const token=localStorage.getItem("token")
  console.log(token)
    const dispatch=useDispatch()
    const navigate=useNavigate()
  return (
    <div>
    {token?   <div className="avatar">
        <div className="md:w-14 w-10 rounded-full" onClick={() => setOpen(true)}>
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
        </div>
      </div>:<button onClick={()=>navigate("/login")} className='p-2 rounded-full bg-black text-xl'>
      <RiLoginCircleLine className='text-white' />
        </button>}
      <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'bg-transparent rounded-lg backdrop-blur-md ', closeButton: 'text-white' }}>
      <div className="avatar">
        <div className="md:w-14 w-10 rounded-full" onClick={() => setOpen(true)}>
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
        </div>
      </div>
        <h2 className="text-white font-thin">Murthaza</h2>
        <p className="text-white">This is the content of the avatar modal.</p>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md" onClick={()=>{
            setTimeout(() => {
                dispatch(logout())
                onCloseModal()
                
            }, 3000)
        }}>logout</button>
      </Modal>
    </div>
  );
}

export default AvatarModal;
