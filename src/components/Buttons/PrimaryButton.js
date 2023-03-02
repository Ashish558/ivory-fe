import React from 'react'

export default function PrimaryButton({ className, children, onClick, disabled, loading }) {
   return (
      <button
         className={`bg-[#0055BF] text-white font-medium py-4 w-[90%] rounded-full border mx-auto  self-center my-4 mt-3 text-sm ${className ? className : ''} disabled:opacity-50 disabled:opacity-60 disabled:pointer-events-none  h-[46px] rounded-full`}
         onClick={onClick}
         disabled={loading === true ? true : disabled !== undefined ? disabled : false}
      >
         {children}
      </button>
   )
}
