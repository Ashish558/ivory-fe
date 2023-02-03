import React from 'react'
import styles from './styles.module.css'


import ProfileImg from '../../assets/images/profile.png'
import Thumbnail from '../../assets/images/thumbnail.png'

import PauseIcon from '../../assets/icons/pause.svg'
import RedirectIcon from '../../assets/icons/redirect.svg'

export default function ActivityContent() {


   return (
      <div className={`${styles.activityContent} sm:mx-20`} >
         <div className='flex items-center gap-x-2 sm:gap-16'>
            <div className='relative flex-1 sm:flex  sm:w-[4/12] w-full'>
               <img src={Thumbnail} alt='Thumbnail' className='rounded-2xl	w-full' />
               <img src={PauseIcon} alt='play' className={styles.playIcon} />
            </div>
            <p className='font-bold text-xl flex-1 sm:hidden'>
               Learn Acrylic
               painting basics in 8 hrs
            </p>

            <div className="flex flex-col  justify-between sm:gap-16 sm:px-2 sm:w-8/12 sm:h-[200px] md:h-[250px]">
               <p className='font-bold text-xl md:text-3xl flex-1 hidden sm:block'>
                  Learn Acrylic
                  painting basics in 8 hrs
               </p>
               <div className='sm:flex justify-between hidden items-end'>
                  <div className="flex flex-col sm:flex-row gap-2">
                     <div>
                        <img src={ProfileImg} alt='Profile' className='w-[40px]' />
                     </div>
                     <div className='flex flex-col sm:flex-row sm:justify-center sm:items-center sm:gap-3 ml-2.5 sm:ml-0 '>
                        <p className='text-sm sm:text-lg font-semibold md:text-xl'> Ayush Jain, </p>
                        <p className='text-xxs sm:text-lg font-semild md:text-xl'> International Artist </p>
                     </div>
                  </div>
                  <div className='sm:flex text-center justify-center items-center text-white  w-[70px] md:w-[90px] h-[35px] md:h-[45px] md:text-xl md:font-bold bg-[#1B72C0] rounded-full overflow-hidden cursor-pointer hidden mr-10'>
                     <h1>Join</h1>
                  </div>
               </div>
            </div>

         </div>

         <div className='flex justify-between mt-4 sm:hidden'>
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
