import React from 'react'
import styles from './styles.module.css'


import Thumbnail from '../../assets/images/thumbnail.png'
import ProfileImg from '../../assets/images/profile.png'

import PauseIcon from '../../assets/icons/pause.svg'
import RedirectIcon from '../../assets/icons/redirect.svg'

export default function ActivityContent() {


   return (
      <div className={styles.activityContent} >
         <div className='flex items-center gap-x-2'>
            <div className='relative flex-1'>
               <img src={Thumbnail} alt='Thumbnail' className='rounded-2xl	w-full' />
               <img src={PauseIcon} alt='play' className={styles.playIcon} />
            </div>
            <p className='font-bold text-xl flex-1'>
               Learn Acrylic
               painting basics in 8 hrs
            </p>
         </div>
         <div className='flex justify-between mt-4'>
            <div className='flex items-center'>
               <div>
                  <img src={ProfileImg} alt='Profile' className='w-fll' />
               </div>
               <div className='flex flex-col ml-2.5'>
                  <p className='text-sm font-semibold'> Ayush Jain </p>
                  <p className='text-xxs font-semild'> International Artist </p>
               </div>
            </div>
            <div className='flex  items-center justify-center w-10 h-10 bg-[#1B72C0] rounded-full overflow-hidden cursor-pointer'>
               <img src={RedirectIcon} alt='redirect' className='rounded-full' />
            </div>
         </div>
      </div>
   )
}
