import React, { useEffect } from "react";
import styles from "./modal.module.css";
import BackIcon from '../../assets/icons/go-back.svg'

export default function Modal({ body, classname, title, handleClose }) {
   //disable body scroll if modal open
   useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
         document.body.style.overflow = "unset";
      };
   }, []);

   return (
      <div className={`${styles.modalContainer}`}>
         <div className="w-full p-1">
            <div className={`w-full sm:text-xl mx-auto bg-white p-3 py-5 md:py-9.5 md:px-9.5 rounded-20 relative ${classname ? classname : ""
               }`}
            >
               <div className='flex items-center py-4 px-4 bordr border-b border-[#CED4DA]'>
                  <img src={BackIcon} alt='back' onClick={handleClose} className='cursor-pointer' />
                  <p className='font-bold flex-1 text-center sm:text-2xl'>
                     {title}
                  </p>
               </div>
               {body}


            </div>

            <div className={styles.modalOverlay}></div>
         </div>
      </div>
   );
}
