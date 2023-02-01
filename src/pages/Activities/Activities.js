import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

import PaintingIcon from '../../assets/icons/painting-icon.svg'
import PhotographyIcon from '../../assets/icons/photography-icon.svg'
import TechnologyIcon from '../../assets/icons/technology-icon.svg'
import PaintingTypeIcon from '../../assets/icons/painting.svg'
import GuitarImg from '../../assets/images/guitar.png'

import Filterbar from '../../components/Filterbar/filterbar'
import { useNavigate } from 'react-router-dom'
import { getCategories, getInterests } from '../../services/activities'
import { sendOtp, verifyOtp } from '../../services/auth'
import MyActivityCard from '../../components/MyActivityCard/MyActivityCard'
import { getMyActivitiesProgress } from '../../services/user'

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

   const [activities, setActivities] = useState([])
   const [myActivities, setMyActivities] = useState([])
   const [categories, setCategories] = useState([])
   const [filterItems, setFilterItems] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      if (filterItems.length > 0) return
      if (activities.length === 0) return


   }, [activities])

   useEffect(() => {
      getInterests(true)
         .then(res => {
            // console.log(res.data.data);
            setActivities(res.data.data.map(item => ({ ...item, categories: [] })))
            let temp = [
               {
                  id: 0,
                  children: 'All',
                  selected: true
               }
            ]
            res.data.data.map((activity, idx) => {
               temp.push({
                  id: activity.id,
                  children: <div className='flex items-center gap-x-1'>
                     <img src={activity.icon} alt='activity' />
                     {activity.name}
                  </div>,
                  selected: false
               })
            })
            setFilterItems(temp)
         }).catch(err => {
            console.log(err.response);
         })

   }, [])

   useEffect(() => {
      if (activities.length === 0) return
      getCategories()
         .then(res => {
            // console.log('categories', res.data.data);
            let tempActivities = [...activities]
            res.data.data.map(category => {
               let idx = tempActivities.findIndex(interest => interest.id === category.intrest)
               tempActivities[idx].categories.push(category)
            })
            setActivities(tempActivities)
            // console.log(' updated', tempActivities);

         }).catch(err => {
            console.log(err.response);
         })
   }, [activities.length])

   useEffect(() => {
      getMyActivitiesProgress()
         .then(res => {
            console.log('my acts', res.data.data);
            if (res.data.data === null) return
            setMyActivities(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   }, [])
   // console.log('activities', activities);
   // console.log('filterItems', filterItems);

   return (
      <div>
         {/* <Header /> */}

         <div className='px-4 lg:px-0'>

            <div className='pt-6 mb-8 lg:grid lg:grid-cols-2 lg:px-[80px] lg:bg-activities-gradient'>
               <div className='lg:flex lg:justify-center flex-col'>
                  <h3 className='text-xl font-bold mb-2.5 lg:text-5xl lg:font-medium'> My Activities
                  </h3>
                  {myActivities.length > 0 ?
                     myActivities.map(activity => {
                        return <MyActivityCard key={activity.id} {...activity} />
                     }) :
                     <p className='text-lightGray font-medium'>
                        No activities started yet
                     </p>
                  }
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

                  {activities.map((activity, indx) => {
                     return (
                        <div key={indx} className='mb-8' >
                           <div className='flex items-center mb-3'>
                              <img src={activity.icon} alt='activity' />
                              <p className='ml-2 font-semibold'> {activity.name} </p>
                           </div>
                           <div className='grid grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-3'>
                              {activity.categories.map((category, idx) => {
                                 return <div key={idx} className={styles.activity}
                                    onClick={() => navigate(`/activities/${category.id}`)} >
                                    <img src={category.icon} alt='activity-type' />
                                    <p className='mt-2  font-semibold text-center'>
                                       {category.name} </p>
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
