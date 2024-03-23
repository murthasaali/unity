import React from 'react';

function Button({  icon ,content}) {
  return (
    <button className={`text-xs md:py-3 py-1 hover:bg-transparent hover:text-black transition-all duration-300  bg-black w-[150px] rounded-3xl text-white gap-3 flex justify-center items-center`}>
      {content}
      {icon && <span className="mr-2">{icon}</span>}
    </button>
  );
}

export default Button;
 