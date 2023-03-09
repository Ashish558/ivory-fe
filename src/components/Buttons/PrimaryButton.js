import React from 'react'

export default function PrimaryButton({ className, children, onClick, disabled, loading }) {
   return (
      <button
         className={`bg-[#0055BF] text-white font-medium  rounded-full border self-center my-4 text-sm ${className ? className : ''} disabled:opacity-50 disabled:opacity-60 disabled:pointer-events-none  h-[46px] rounded-full`}
         onClick={onClick}
         disabled={loading === true ? true : disabled !== undefined ? disabled : false}
      >
         {children}
      </button>
   )
}
