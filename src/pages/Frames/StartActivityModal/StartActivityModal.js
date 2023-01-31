import React from 'react'
import Modal from '../../../components/Modal/modal'
import BackIcon from '../../../assets/icons/go-back.svg'
import PrimaryButton from '../../../components/Buttons/PrimaryButton'
import { startActivity } from '../../../services/user'

export default function StartActivityModal({ handleClose, activityId }) {

   const handleStartActivity = ()=>{
      startActivity(activityId)
      .then(res => {
         console.log('start resp', res);
       
      }).catch(err => {
         console.log('start err', err);
      })
   }

   return (
      <Modal
         classname='max-w-[343px] rounded-3xl pt-0 pl-0 pr-0'
         body={
            <div>
               <div className='flex items-center py-4 px-4 bordr border-b border-[#CED4DA]'>
                  <img src={BackIcon} alt='back' onClick={handleClose} />
                  <p className='font-bold flex-1 text-center'>
                     🎉 Congratulations!
                  </p>
               </div>
               <div className='px-4 font-normal	mt-6'>
                  You have unlocked 5 free activities. Take advantage of this opportunity and start one for free today. Don't miss out!
                  <div className='flex justify-end mt-12'>
                     <button className='text-primary px-4 py-2.5 font-semibold mr-1'
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
