import React from 'react'

export default function PrimaryButton({ className, children, onClick, disabled, loading }) {
   return (
      <button
         className={`bg-primary rounded-3xl text-white px-6 py-2.5 font-semibold ${className ? className : ''} disabled:opacity-50 disabled:opacity-60 disabled:pointer-events-none `}
         onClick={onClick}
         disabled={loading === true ? true : disabled !== undefined ? disabled : false}
      >
         {children}
      </button>
   )
}
