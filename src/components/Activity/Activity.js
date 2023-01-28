import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'

export default function Activity({ image, name, duration }) {

   const navigate = useNavigate()

   return (
      <div className={styles.activity} onClick={() => navigate(`/activities/1/2/start`)} >
         <div className=''>
            <img src={image} className={styles.image} alt='Profile' />
         </div>
         <div>
            <p className='font-bold mb-0 mt-0.5'> {name} </p>
            <p className='text-sm text-[#6D747A]'> {duration} </p>
         </div>
      </div>
   )
}
