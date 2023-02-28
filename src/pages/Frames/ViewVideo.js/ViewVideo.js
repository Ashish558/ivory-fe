import React, { useEffect } from 'react'
import styles from './style.module.css'
import BackIcon from '../../../assets/icons/back.svg'
import { isValidYoutubeLink } from '../../../utils/utils';
import ReactPlayer from 'react-player';

export function ViewVideo({ handleClose, source }) {

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
         </div>
         {
            isValidYoutubeLink(source)
               ?
               <div className={`${styles.storyVideo} ${styles.storyVideoYoutube}`}>
                  <ReactPlayer
                     width='300px'
                     height='500px'
                     url={source}
                     controls={true}
                  />
               </div>
               :
               <div className={styles.storyVideo}>
                  <video width='100%' height='100%' className={`max-h-[688px] ${styles.video}`} controls controlsList="nodownload" >
                     <source src={source} type="video/mp4" />
                  </video>
               </div>
         }
         <div className={styles.modalOverlay}></div>
         <img src={BackIcon} alt='back' className={styles.cancelBtn} onClick={handleClose} />
      </div>
   )
}
