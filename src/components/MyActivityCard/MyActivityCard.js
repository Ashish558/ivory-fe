import React from 'react'
import styles from './style.module.css'
import {delay, easeIn, easeOut, motion as m} from "framer-motion"

export default function MyActivityCard({ icon, name, percentage_completed, new_activities,thumbnail }) {


   return (
      <>
      <div className={styles.container}>
         <m.div  transition={{ delay: 5 }} className={styles.hover_activity} >
            <img src={thumbnail} alt="" />
         </m.div>
         <div className='flex flex-col items-start flex-1 px-3 py-3'>
            <img src={icon} alt='category' />
            <p className='mt-1 font-semibold'> {name} </p>
         </div>
         <div className='flex flex-col items-end flex-1 px-3 py-3'>
            <p className='text-[44474E] text-xl font-semibold'>
               {percentage_completed}% <span className='text-sm text-lightGray font-semibold' > completed </span>
            </p>
            <div className={styles.progressContainer}>
               <div className={styles.progress} style={{ width: `${percentage_completed}%` }} ></div>
            </div>
            <p className='text-sm text-lightGray font-semibold'>
               {new_activities}{' '}new activities added
            </p>
         </div>
      </div>
      </>
   )
}
