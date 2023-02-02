import React from 'react'
import { getFormattedDate } from '../../utils/utils'
import styles from './slider.module.css'
import SecondaryButton from '../../components/Buttons/SecondaryButton'
import CatImg from '../../assets/images/cat.png'

export default function Feedback({ created_at, activity, submission, feedbacks, is_feedbacked, currentIndex, idx }) {
   return (
      <div className={`${styles.container}  ${currentIndex === idx ? styles.active : idx < currentIndex ? styles.prev : styles.next}`}>
         <p className='text-lightGray text-sm font-normal mb-3.5 mt-4 px-4 pt-4'>
            Published at {getFormattedDate(created_at)}
         </p>
         <div className='flex items-center px-4 mb-6'>
            <div className={styles.imgContainer}>
               <img src={submission} alt='submission' />
            </div>
            <div className='flex flex-col ml-4'>
               <SecondaryButton children='View'
                  className='text-sm shadow-light w-[68px] h-8 px-2 pt-1 pb-1 mb-2 border-none' />
               <SecondaryButton children='Share'
                  className='text-sm w-[68px] h-8 shadow-light px-2 pt-1 pb-1 mb-2 border-none' />
               <SecondaryButton children='Delete'
                  className='text-sm w-[68px] h-8 shadow-light px-2 pt-1 pb-1 border-none' />
            </div>
         </div>
         <div className='relative z-10 '>
            <p className='ml-6 relative z-20 px-1 bg-white inline-block'>
               Expert Feedback
            </p>
            <div className={styles.line}></div>
         </div>
         <div className='px-4 flex justify-center items-center mt-6 pb-8 mb-5'>
            <div className='w-2/4 flex justify-center'>
               <img src={CatImg} />
            </div>
            <div className='flex flex-col px-4 w-2/4	'>
               <p className='font-semibold'>
                  Thank you for sharing your amazing work!
               </p>
               <p className='text-xs font-medium'>
                  Our expert will review it and provide you with feedback.
               </p>
            </div>
         </div>
      </div>
   )
}
