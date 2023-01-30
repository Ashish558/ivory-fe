import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import styles from './styles.module.css'

import Thumbnail from '../../assets/images/thumbnail.png'
import ProfileImg from '../../assets/images/profile.png'
import ActivityIcon from '../../assets/images/activity.png'

import PauseIcon from '../../assets/icons/pause.svg'
import RedirectIcon from '../../assets/icons/redirect.svg'
import Activity from '../../components/Activity/Activity'
import ActivityContent from '../../components/ActivityContent/ActivityContent'

export const tempActivities = [
   {
      id: 1,
      name: 'Activity Name 1',
      duration: '2 hrs 10 min',
      image: ActivityIcon
   },
   {
      id: 2,
      name: 'Activity Name 2',
      duration: '2 hrs 10 min',
      image: ActivityIcon
   },
   {
      id: 3,
      name: 'Activity Name 3',
      duration: '2 hrs 10 min',
      image: ActivityIcon
   },
   {
      id: 4,
      name: 'Activity Name 4',
      duration: '2 hrs 10 min',
      image: ActivityIcon
   },
   {
      id: 5,
      name: 'Activity Name 5',
      duration: '2 hrs 10 min',
      image: ActivityIcon
   },
]
export default function ActivityType() {

   const [activities, setActivities] = useState(tempActivities)

   return (
      <div>
         {/* <Header /> */}
         <div className='px-4 pb-12 mb-10'>
            <div className='pt-2'>
               <p className='text-lightGray font-medium'> Activities {'>'} Acrylic Painting </p>
            </div>

            <div className='mt-4'>
               <h3 className='text-xl font-bold mb-2.5'> Acrylic Painting </h3>
              <ActivityContent />
            </div>

            <div className='mt-5'>
               {
                  activities.map(activity => {
                     return <Activity {...activity} key={activity.id} />
                  })
               }
            </div>
         </div>
      </div>
   )
}
