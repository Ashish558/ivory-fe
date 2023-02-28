import React from 'react'
import PauseIcon from '../../assets/icons/pause.svg'
import ProfileImg from '../../assets/images/profile.png'
import Thumbnail from '../../assets/images/thumbnail.png'
import styles from './styles.module.css'

export default function ActivityContent({ banners }) {
   return (
      <div className={`${styles.activityContent} my-5 bg-[#EEFCFF] rounded-[30px] pl-5 sm:h-[164px] border border-sky-400`} >
         <div className='flex items-center gap-x-2 sm:gap-16'>
            <div className='relative sm:flex  sm:w-[300px] sm:items-center sm:h-[164px] mt-2 sm:mt-0'>
               <img src={Thumbnail} alt='Thumbnail' className='object-cover md:h-[130px] rounded-[30px] md:w-[275px]' />
               <img src={PauseIcon} alt='play' className='absolute w-[30px] top-[50%] left-[50%] sm:top-[50%] sm:left-[45%]' style={{transform: 'translate(-50%,-50%)' }} />
            </div>
            <p className='font-bold text-md sm:text-lg flex-1 sm:hidden'>
               Learn Acrylic
               painting basics in 8 hrs
            </p>

            <div className="flex flex-col  justify-between sm:gap-10 sm:px-2 sm:w-10/12  sm:h-[164px] md:h-[164px]">
               <p className='font-bold text-[32px] flex-1 hidden sm:block mt-3'>
                  Learn Acrylic
                  painting basics in 8 hrs
               </p>
               <div className='sm:flex justify-between hidden items-end mb-5'>
                  <div className="flex flex-col sm:flex-row gap-2">
                     <div>
                        <img src={ProfileImg} alt='Profile' className='w-[40px]' />
                     </div>
                     <div className='flex flex-col sm:flex-row sm:justify-center sm:items-center sm:gap-3 ml-2.5 sm:ml-0 '>
                        <p className='text-sm sm:text-lg font-semibold md:text-xl'> Ayush Jain, </p>
                        <p className='text-xxs sm:text-lg font-semild md:text-xl'> International Artist </p>
                     </div>
                  </div>
                  <div className='sm:flex text-center justify-end items-end text-white hidden '>
                     <h1 className='flex justify-center items-center w-[70px] md:w-[76px] h-[35px] md:h-[40px] md:text-xl md:font-bold bg-[#0055BF] rounded-full overflow-hidden cursor-pointer mr-2'>Join</h1>
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
            <div className='flex  items-center justify-center w-1/5 h-8 bg-[#1B72C0] rounded-full overflow-hidden cursor-pointer'>
               <h1 className='text-white'>Join</h1>
               {/* <img src={RedirectIcon} alt='redirect' className='rounded-full' /> */}
            </div>
         </div>
      </div>
   )
}
