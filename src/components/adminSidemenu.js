import React from 'react';
import { MdDashboard } from "react-icons/md";
import { LuArrowBigUpDash } from "react-icons/lu";
import { IoStatsChart } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function AdminSidemenu() {
    const navigate = useNavigate();
    
    return (
        <div className="fixed left-4 p-10 top-1/4 h-auto backdrop-blur-3xl rounded-full bg-opacity-90 bg-black md:flex hidden    flex-col justify-center items-center z-50">
            <div className="text-white flex flex-col justify-center gap-5">
                <button className='w-full h-auto' ><MdDashboard onClick={() => navigate("/admin/dashboard")} className='text-white text-3xl'/></button>
                <button className='w-full h-auto' onClick={() => navigate("/admin/all")}><LuArrowBigUpDash className='text-white text-3xl'/></button>
                <button className='w-full h-auto' onClick={() => navigate("/admin/sales")}><IoStatsChart className='text-white text-3xl'/></button>
                <button className='w-full h-auto' onClick={() => navigate("/admin/add")}><MdOutlineShoppingCartCheckout className='text-white text-3xl'/></button>
                <button className='w-full h-auto' onClick={() => navigate("/admin/userslist")}><FaUser className='text-white text-3xl'/></button>
            </div>
        </div>
    );
}

export default AdminSidemenu;
