import React, { useEffect } from 'react'
import styles from './style.module.css'
import BackIcon from '../../../assets/icons/back.svg'

export function ViewSubmission({ handleClose, source }) {

   const hideHtmlOverflow = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
   }

   useEffect(() => {
      hideHtmlOverflow()
      return () => {
         document.body.style.overflow = "unset";
         document.documentElement.style.overflow = "unset";
      };
   }, [source])


   return (
      <div className={styles.modalContainer}>
         <div className='overflow-auto'>
            <div className='px-4 py-4 flex justify-center items-center'>
               <img src={source} className={styles.source} alt='source' />
            </div>
         </div>

         <div className={styles.modalOverlay}></div>
         <img src={BackIcon} alt='back' className={styles.cancelBtn} onClick={handleClose} />
      </div>
   )
}
