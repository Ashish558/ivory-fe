import React from 'react'
import Modal from '../../../components/Modal/modal'
import BackIcon from '../../../assets/icons/go-back.svg'
import PrimaryButton from '../../../components/Buttons/PrimaryButton'
import { startActivity } from '../../../services/user'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function StartActivityModal({ handleClose, activityId, setIsAlreadyStarted, fetchUserActivities, profileData, fetchUserDetails }) {

   const { loggedIn } = useSelector(state => state.user)
   const navigate = useNavigate()

   const handleStartActivity = ()=>{
      if (loggedIn === false) {
         navigate('/login')
         return
      }
      startActivity(activityId)
      .then(res => {
         console.log('start resp', res);
         setIsAlreadyStarted(true)
         fetchUserActivities()
         handleClose()
         fetchUserDetails()
      }).catch(err => {
         console.log('start err', err);
         handleClose()
      })
   }

   return (
      <Modal
         classname='max-w-[343px] sm:max-w-[500px] sm:h-[350px] rounded-3xl pt-0 pl-0 pr-0'
         body={
            <div>
               <div className='flex items-center py-4 px-4 bordr border-b border-[#CED4DA]'>
                  <img src={BackIcon} alt='back' onClick={handleClose} />
                  <p className='font-bold flex-1 text-center sm:text-2xl'>
                     🎉 Congratulations!
                  </p>
               </div>
               <div className='px-4 font-normal	mt-6 sm:text-xl sm:px-8 sm:flex sm:flex-col sm:justify-between'>
                  <p>You have unlocked {profileData.remaining_activities ? profileData.remaining_activities : '(x)'} free activities. Take advantage of this opportunity and start one for free today. Don't miss out!</p> 
                  <div className='flex justify-end mt-12 sm:absolute sm:bottom-5 sm:right-5'>
                     <button className='text-primary px-8 py-2.5 font-semibold mr-1'
                        onClick={handleClose}>
                        Later
                     </button>
                     <PrimaryButton children='Start now'
                        onClick={handleStartActivity}
                     />

                  </div>
               </div>
            </div>
         }
      />
   )
}
