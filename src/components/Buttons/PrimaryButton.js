import React from 'react'

export default function PrimaryButton({ className, children, onClick, disabled, loading }) {
   return (
      <button
         className={`bg-primary text-white px-6  font-semibold  h-[40px] rounded-full ${className ? className : ''} disabled:opacity-50 disabled:opacity-60 disabled:pointer-events-none  h-[40px] rounded-full`}
         onClick={onClick}
         disabled={loading === true ? true : disabled !== undefined ? disabled : false}
      >
         {children}
      </button>
   )
}
