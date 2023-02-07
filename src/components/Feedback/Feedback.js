import React from 'react'
import { getFormattedDate } from '../../utils/utils'
import styles from './slider.module.css'
import SecondaryButton from '../../components/Buttons/SecondaryButton'
import CatImg from '../../assets/images/cat.png'
import Feedbacker from '../../assets/images/feedbacker.png'
import StarInactive from '../../assets/icons/star.svg'
import StarActive from '../../assets/icons/star-active.svg'

export default function Feedback({ created_at, activity, submission, currentIndex, idx, onView, onDelete, id, is_feedbacked, feedbacks, notAbsolute
}) {
   return (
      <div className={`${styles.container}  ${currentIndex === idx ? styles.active : idx < currentIndex ? styles.prev : styles.next} ${notAbsolute ? styles.static : ''}`}>
         <p className='text-lightGray text-sm font-normal mb-3.5 mt-4 px-4 pt-4'>
            Published at {getFormattedDate(created_at)}
         </p>
         <div className='flex items-center px-4 mb-6'>
            <div className={styles.imgContainer}>
               <img src={submission} alt='submission' />
            </div>
            <div className='flex flex-col ml-4'>
               <SecondaryButton children='View' onClick={() => onView(submission)}
                  className='text-sm shadow-light w-[68px] h-8 px-2 pt-1 pb-1 mb-2 border-none' />
               <SecondaryButton children='Share'
                  className='text-sm w-[68px] h-8 shadow-light px-2 pt-1 pb-1 mb-2 border-none' />
               {
                  is_feedbacked !== true &&
                  <SecondaryButton children='Delete' onClick={() => onDelete(id)}
                     className='text-sm w-[68px] h-8 shadow-light px-2 pt-1 pb-1 border-none' />
               }
            </div>
         </div>
         <div className='relative z-10 '>
            <p className='ml-6 relative z-20 px-1 bg-white inline-block'>
               Expert Feedback
            </p>
            <div className={styles.line}></div>
         </div>
         {
            is_feedbacked === true ?
               <div className='px-4  mt-4 pb-8 mb-5'>
                  <div className='flex  items-center'>
                     <img src={Feedbacker} alt='feedback' />
                     <div className='flex flex-col items-start ml-2'>
                        <p className='text-sm font-semibold mb-[1px]'>
                           Ria Shreshtha, Ivory Specialist
                        </p>
                        <p className='text-sm text-[#6D747A]'>
                           {getFormattedDate(feedbacks[0].created_at)}
                        </p>
                     </div>
                  </div>
                  <div className='mt-[8.5px]'>
                     <div className='flex items-center'>
                        {[...Array(5)].map((x, i) => (
                           <img
                              src={feedbacks[0].rating - 1 < i ? StarInactive : StarActive}
                              className="mr-[7.18px] cursor-pointer "
                           />
                        ))}
                     </div>
                  </div>
                  <div className='div mt-[10.46px] h-[68px] overflow-auto'>
                     <p> {feedbacks[0].feedback} </p>
                  </div>
               </div>
               :
               <div className='px-4 flex justify-center items-center mt-6 pb-8 mb-5'>
                  <div className='w-2/4 flex justify-center'>
                     <img src={CatImg} alt='feedback' />
                  </div>
                  <div className='flex flex-col px-4 w-2/4'>
                     <p className='font-semibold'>
                        Thank you for sharing your amazing work!
                     </p>
                     <p className='text-xs font-medium'>
                        Our expert will review it and provide you with feedback.
                     </p>
                  </div>
               </div>
         }

      </div>
   )
}

// {[...Array(5)].map((x, i) => (
//    <img
//       src={rating - 1 < i ? starDark : starGold}
//       className="mr-1 cursor-pointer w-[21px] "
//    // onClick={() => {
//    //    // setData(prev => ({ ...prev, feedbackStars: i + 1 }));
//    //    // setInputFeedback(i + 1)
//    //    handleFeedbackSubmit(i + 1)
//    // }}
//    />
// ))}