import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import ActivityIcon from '../../assets/images/activity.png'
import StartedIcon from '../../assets/icons/checked.svg'
import CompletedIcon from '../../assets/icons/checked-green.svg'

export default function Activity({ image, name, duration, category, id, is_completed }) {

   const navigate = useNavigate()

   return (
      <div className={`${styles.activity} sm:mx-3 sm:flex-col sm:gap-0 sm:flex-1 p-2 sm:p-0`} onClick={() => {
         navigate(`/activities/${category}/${id}/start`);
         window.location.reload()
      }}>
         <div className='max-w-[135px] md:max-w-[100%]'>
            <img src={image === null ? ActivityIcon : image} className={`${styles.image}  h-[90px] mx-auto sm:rounded-b-none rounded-3xl sm:h-[125px] w-full object-cover`} alt='Profile' />
         </div>
         <div className='sm:p-3 sm:flex flex-col sm:justify-start sm:h-[150px]'>
            <p className='font-bold mb-0 mt-0.5 sm:mt-1'> {name} </p>
            <p className='text-sm text-[#6D747A] sm:mt-1'> {duration} </p>
            {is_completed === undefined ? <></> :
               is_completed === false ?
                  <div className='mt-auto flex justify-end'>
                     <p className='text-[#22B8CF] mr-[8.83px] font-medium'> Started </p>
                     <img src={StartedIcon} alt='started' />
                  </div> : is_completed === true ?
                     <div className='mt-auto flex justify-end'>
                        <p className='text-[#26A925] mr-[8.83px] font-medium'> Completed </p>
                        <img src={CompletedIcon} alt='started' />
                     </div> : <></>
            }
         </div>
      </div>
   )
}
