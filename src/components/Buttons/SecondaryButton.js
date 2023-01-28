import React from 'react'

export default function SecondaryButton({ className, children, onClick, disabled }) {


   return (
      <button
         className={`bg-white rounded-3xl border border-primary text-primary px-4 py-2.5 font-semibold ${className ? className : ''}  disabled:opacity-50`}
         onClick={onClick}
         disabled={disabled !== undefined ? disabled : false}
      >
         {children}
      </button>
   )
}
