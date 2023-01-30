import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

import PaintingIcon from '../../assets/icons/painting-icon.svg'
import PhotographyIcon from '../../assets/icons/photography-icon.svg'
import TechnologyIcon from '../../assets/icons/technology-icon.svg'
import PaintingTypeIcon from '../../assets/icons/painting.svg'
import GuitarImg from '../../assets/images/guitar.png'

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

         <div className='px-4 lg:px-0'>

            <div className='pt-6 mb-8 lg:grid lg:grid-cols-2 lg:px-[80px] lg:bg-activities-gradient'>
               <div className='lg:flex lg:justify-center flex-col'>
                  <h3 className='text-xl font-bold mb-2.5 lg:text-5xl lg:font-medium'> My Activities </h3>
                  <p className='text-lightGray font-medium'> No activities started yet </p>
               </div>
               <div className='hidden lg:block px-[60px]'>
                  <img src={GuitarImg} alt='guitar' className={styles.guitar} />
               </div>

            </div>

            <div className='lg:px-[80px] lg:max-w-[1000px] lg:pb-[150px]'>
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
                           <div className='grid grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-3'>
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
      </div>
   )
}
