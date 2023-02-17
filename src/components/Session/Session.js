import React from 'react'
import styles from './session.module.css'
import ComingSoon from '../../assets/icons/coming-soon.svg'
import LiveIcon from '../../assets/icons/live.svg'
import OpenSession from '../../assets/icons/open-session.svg'
import Photo from '../../Images/profile-pic.jfif'
import { useNavigate } from 'react-router-dom'
import { getFormattedDateWeek } from '../../utils/utils'

export default function Session({ id, name, image, scheduled_on, host }) {

   const navigate = useNavigate()

   return (
      <div className='rounded-3xl overflow-hidden bg-secondary max-w-[240px]'
         onClick={() => navigate(`/live-events/${id}`)}>
         <div className={styles.imgContainer}>
            <img src={image} className='object-contain' alt='session' />

         </div>
         <div className='px-3 pr-2 py-2 pb-5'>
            <div className='mb-7'>
               <p className='font-semibold mb-2'> {name} </p>
               <p className='font-medium font-sm text-[#6C7277] mb-2 ml-[3px]'>
                  {getFormattedDateWeek(scheduled_on)}
               </p>
            </div>
            <div className='flex items-center'>
               <img src={host?.profile_picture ? host.profile_picture : Photo} className='w-12 h-12 object-contain border border-white rounded-full' alt='session' />
               <p className='text-sm font-semibold ml-1.5'> {host?.name} </p>
            </div>
         </div>
      </div>
   )
}
