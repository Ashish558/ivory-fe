import React from 'react';
// import greenTik from "../../../../.assets/images/learn/greenTik.png";
import greenTik from "../../assets/images/learn/greenTik.png";
export default function SecondaryButton({ className,children,onClick,disabled }) {


   return (
      <button
         className={` text-sm flex justify-center items-center rounded-3xl px-4 py-2.5 font-medium ${className ? className : ''}  disabled:opacity-50 font-roboto`}
         onClick={onClick}
         disabled={disabled !== undefined ? disabled : false}
      >
         {/* <img src={greenTik} className="h-[22px] pb-1 px-3" alt="" /> */}
         {children}
      </button>
   )
}
