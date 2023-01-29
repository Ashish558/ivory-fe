import React, { useState } from 'react'
import styles from './styles.module.css'

import Header from '../../components/Header/Header'
import StartActivityModal from '../Frames/StartActivityModal/StartActivityModal'
import PrimaryButton from '../../components/Buttons/PrimaryButton'
import SecondaryButton from '../../components/Buttons/SecondaryButton'

import MarkIcon from '../../assets/icons/mark.svg'
import ShareIcon from '../../assets/icons/share-outlined.svg'
import UploadIcon from '../../assets/icons/upload.svg'
import ActivityIcon from '../../assets/images/activity.png'
import ActivityContent from '../../components/ActivityContent/ActivityContent'
import { tempActivities } from '../ActivityType/ActivityType'
import Activity from '../../components/Activity/Activity'


export default function StartActivity() {

   const [startModalActive, setStartModalActive] = useState(false)
   const [activities, setActivities] = useState(tempActivities)

   return (
      <>
         <div className='pb-5'>
            <Header />
            <div className='pt-2 px-4'>
               <p className='text-lightGray font-medium'> Activities {'>'} Acrylic Painting </p>
            </div>

            <div className='mt-3'>
               <p className='text-xl font-bold mb-2.5 px-4'> Acrylic Painting Activity1 </p>
               <div>
                  <img src={ActivityIcon} className={styles.image} alt='Profile' />
               </div>
            </div>

            <div className='px-4 mt-5'>

               <p className='text-xl font-semibold mb-2.5'> Description </p>
               <p className='text-sm'>
                  For this exercise, you will need a canvas, paint (acrylic or tempera works well), and something to splatter the paint with (such as a paintbrush with stiff bristles or a toothbrush).
               </p>
               <span className={styles.seeMoreBtn} onClick={() => setStartModalActive(true)} >
                  See More
               </span>
               <div className='flex items-center gap-x-3 mt-8 mb-8'>
                  <PrimaryButton className='flex items-center pl-4 pr-4' disabled={true}
                     children={
                        <>
                           <img src={MarkIcon} className='mr-2.5' alt='mark' />
                           Mark Completed
                        </>
                     }
                  />
                  <SecondaryButton className='flex items-center pl-5 pr-5' disabled={true}
                     children={
                        <>
                           <img src={ShareIcon} className='mr-2.5' alt='mark' />
                           Share
                        </>
                     }
                  />
               </div>

               <div className='mb-12'>
                  <p className='font-medium' >
                     Submit your work to get feedback from our expert:
                  </p>
                  <div className='border border-primary border-dashed h-[119px] px-4 flex justify-center items-center mt-4 rounded-3xl opacity-70'>
                     <img src={UploadIcon} className='mr-3' alt='UploadIcon' />
                     <p className='font-semibold' > Upload your work </p>
                  </div>
               </div>

            </div>
            <div className='border-b border-lightGray w-full opacity-20'> </div>
            <div className='mt-10 px-4'>
               <ActivityContent />
               <h4 className='font-bold text-xl mt-8'>
                  Next Activities
               </h4>

               <div className='mt-5'>
                  {
                     activities.map(activity => {
                        return <Activity {...activity} key={activity.id} />
                     })
                  }
               </div>
            </div>
         </div>
         {
            startModalActive &&
            <StartActivityModal handleClose={() => setStartModalActive(false)} />
         }
      </>
   )
}
