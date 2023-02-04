import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import ActivityIcon from '../../assets/images/activity.png'

export default function Activity({ image, name, duration, category, id }) {

   const navigate = useNavigate()

   return (
      <div className={`${styles.activity} sm:mx-3 sm:flex-col sm:gap-0 sm:flex-1 p-2 sm:p-0`} onClick={() => {
         navigate(`/activities/${category}/${id}/start`);
         window.location.reload()
      }}>
         <div className=''>
            <img src={image === null ? ActivityIcon : image} className={`${styles.image} mx-auto sm:rounded-b-none rounded-3xl sm:h-[125px] w-full object-cover`} alt='Profile' />
         </div>
         <div className='sm:p-3 sm:flex flex-col sm:justify-start sm:h-[100px]'>
            <p className='font-bold mb-0 mt-0.5'> {name} </p>
            <p className='text-sm text-[#6D747A]'> {duration} </p>
         </div>
      </div>
   )
}
