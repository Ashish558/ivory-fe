import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

import PaintingIcon from '../../assets/icons/painting-icon.svg'
import PhotographyIcon from '../../assets/icons/photography-icon.svg'
import TechnologyIcon from '../../assets/icons/technology-icon.svg'

import PaintingTypeIcon from '../../assets/icons/painting.svg'
import Header from '../../components/Header/Header'
import Filterbar from '../../components/Filterbar/filterbar'
import { useNavigate } from 'react-router-dom'

export const tempActivities = [
   {
      id: 1,
      name: 'Painting',
      icon: PaintingIcon,
      types: [
         {
            id: 1,
            name: 'Acrylic Painting',
            icon: PaintingTypeIcon
         },
         {
            id: 2,
            name: 'Acrylic Painting',
            icon: PaintingTypeIcon
         },
         {
            id: 3,
            name: 'Acrylic Painting',
            icon: PaintingTypeIcon
         },
      ]
   },
   {
      id: 2,
      name: 'Photography',
      icon: PhotographyIcon,
      types: [
         {
            id: 1,
            name: 'Mobile Photography',
            icon: PaintingTypeIcon
         },
         {
            id: 2,
            name: 'Mobile Photography',
            icon: PaintingTypeIcon
         },
         {
            id: 3,
            name: 'Mobile Photography',
            icon: PaintingTypeIcon
         },
      ]
   },
   {
      id: 3,
      name: 'Technology',
      icon: TechnologyIcon,
      types: [
         {
            id: 1,
            name: 'Acrylic Painting',
            icon: PaintingTypeIcon
         },
         {
            id: 2,
            name: 'Acrylic Painting',
            icon: PaintingTypeIcon
         },
         {
            id: 3,
            name: 'Acrylic Painting',
            icon: PaintingTypeIcon
         },
      ]
   },
]

export default function Activities() {

   const [activities, setActivities] = useState(tempActivities)
   const [filterItems, setFilterItems] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      if (filterItems.length > 0) return
      let temp = [
         {
            id: 0,
            children: 'All',
            selected: true
         }
      ]
      activities.map((activity, idx) => {
         temp.push({
            id: idx + 1,
            children: <div className='flex items-center gap-x-1'>
               <img src={activity.icon} alt='activity' />
               {activity.name}
            </div>,
            selected: false
         })
      })
      setFilterItems(temp)
   }, [activities])

   return (
      <div>
         {/* <Header /> */}

         <div className='px-4'>

            <div className='pt-6  mb-8'>
               <h3 className='text-xl font-bold mb-2.5'> My Activities </h3>
               <p className='text-lightGray font-medium'> No activities started yet </p>
            </div>

            <div className=''>
               <h3 className='text-xl font-bold mb-2.5'> All Activities </h3>
               <Filterbar items={filterItems} />
            </div>

            <div className='mt-7'>

               {activities.map(activity => {
                  return (
                     <div key={activity.id} className='mb-8' >
                        <div className='flex items-center mb-3'>
                           <img src={activity.icon} alt='activity' />
                           <p className='ml-2 font-semibold'> {activity.name} </p>
                        </div>
                        <div className='grid grid-cols-3 gap-x-2'>
                           {activity.types.map(type => {
                              return <div key={type.id} className={styles.activity}
                                 onClick={() => navigate(`/activities/${activity.id}/${type.id}`)} >
                                 <img src={type.icon} alt='activity-type' />
                                 <p className='mt-2  font-semibold text-center'> {type.name} </p>
                              </div>
                           })}
                        </div>
                     </div>
                  )
               })}
            </div>

         </div>

      </div>
   )
}
