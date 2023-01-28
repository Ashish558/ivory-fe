import React from 'react'

export default function PrimaryButton({ className, children, onClick, disabled }) {


   return (
      <button
         className={`bg-primary rounded-3xl text-white px-6 py-2.5 font-semibold ${className ? className : ''} disabled:opacity-50`}
         onClick={onClick}
         disabled={disabled !==undefined ? disabled : false}
      >
         {children}
      </button>
   )
}
