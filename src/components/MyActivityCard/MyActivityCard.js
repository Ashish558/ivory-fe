import React from 'react'
import styles from './style.module.css'

export default function MyActivityCard({ icon, name, percentage_completed, new_activities }) {

   return (
      <div className={styles.container}>
         <div className='flex flex-col items-start flex-1'>
            <img src={icon} alt='category' />
            <p className='mt-1 font-semibold'> {name} </p>
         </div>
         <div className='flex flex-col items-end flex-1'>
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
   )
}
