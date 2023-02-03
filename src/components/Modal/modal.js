import React, { useEffect } from "react";
import styles from "./modal.module.css";

export default function Modal({ body, classname }) {
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

               {body}


            </div>

            <div className={styles.modalOverlay}></div>
         </div>
      </div>
   );
}
