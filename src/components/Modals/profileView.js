import React from "react";

import { FaPlus } from "react-icons/fa6";

function ProfileView({ userProfile }) {




  return (
    <div>
      <button
        className="w-full h-full flex justify-center items-center"
        onClick={() => document.getElementById("my_modal_10").showModal()}
      >
        <div
          className="w-24 h-24 rounded-full bg-white relative"
          style={{
            backgroundImage: `url(${userProfile.image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <FaPlus className="absolute bottom-1 p-1 bg-black rounded-full text-white text-xl right-1" />
        </div>
      </button>

      <dialog id="my_modal_10" className="modal">
        <div className="modal-box backdrop-blur-md" style={{width:"auto",backdropFilter:"blur(10px)"}}>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <img src={userProfile.image} className="h-4w-40 w-40 rounded-full"/>

          </form>
          
        </div>
      </dialog>

      {/* Button to trigger the function */}
    </div>
  );
}

export default ProfileView;
