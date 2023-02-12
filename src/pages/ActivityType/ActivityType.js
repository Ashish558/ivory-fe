import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import styles from './styles.module.css'

import Thumbnail from '../../assets/images/thumbnail.png'
import ProfileImg from '../../assets/images/profile.png'
import ActivityIcon from '../../assets/images/activity.png'

import PauseIcon from '../../assets/icons/pause.svg'
import RedirectIcon from '../../assets/icons/redirect.svg'
import CheckedIcon from '../../assets/icons/checked-category.svg'
import Activity from '../../components/Activity/Activity'
import ActivityContent from '../../components/ActivityContent/ActivityContent'
import { useParams, useSearchParams } from 'react-router-dom'
import { getActivities, getCategories } from '../../services/activities'
import { getMyActivities } from '../../services/user'
import { useSelector } from 'react-redux'

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

   const [activities, setActivities] = useState([])
   const { categoryId } = useParams()
   const [userActivities, setUserActivities] = useState([])
   const [filteredUserActivities, setFilteredUserActivities] = useState([])
   const [category, setCategory] = useState({})
   const [completedTabActive, setCompletedTabActive] = useState(false)
   const { loggedIn } = useSelector(state => state.user)
   const [isActivitiesFetched, setIsActivitiesFetched] = useState(false)

   useEffect(() => {
      getMyActivities()
         .then(res => {
            if (isActivitiesFetched === false) return
            if (res.data.data === null) return setUserActivities([])
            let filtered = res.data.data.filter(item => item.activity.category === parseInt(categoryId))

            let data = activities.map(item => {
               let is_completed = null
               filtered.forEach(userAct => {
                  if (item.id === userAct.activity.id) {
                     is_completed = userAct.is_completed
                  }
               })
               return { ...item, is_completed }
            })
            data = data.sort(item => item.is_completed === null ? 1 : -1)
            console.log('data', data);
            setUserActivities(data)
         }).catch(err => {
            console.log('err', err);
         })
   }, [categoryId, isActivitiesFetched, activities])


   useEffect(() => {
      getCategories()
         .then(res => {
            // console.log('categories', res.data.data);
            if (res.data.data === null) return
            let currentCategory = res.data.data.find(item => item.id === parseInt(categoryId))
            setCategory(currentCategory)
         }).catch(err => {
            console.log(err.response);
         })
   }, [categoryId])

   useEffect(() => {
      if (userActivities.length === 0) return
      // console.log('userActivities', userActivities);
      if (completedTabActive === false) {
         let temp = userActivities.filter(item => item.is_completed === completedTabActive || item.is_completed === null)
         setFilteredUserActivities(temp)
      } else {
         let temp = userActivities.filter(item => item.is_completed === completedTabActive)
         setFilteredUserActivities(temp)
      }
   }, [userActivities, completedTabActive])

   useEffect(() => {
      getActivities(categoryId)
         .then(res => {
            setIsActivitiesFetched(true)

            // console.log('data', res.data.data);
            if (res.data.data === null) return
            setActivities(res.data.data)
         }).catch(err => {
            setIsActivitiesFetched(true)
            console.log(err.response);
         })
   }, [categoryId])

   // console.log('category', category);
   // console.log('userActivities', userActivities);
   // console.log('activities', activities);

   return (
      <div className='lg:mt-[64px]'>
         {/* <Header /> */}
         <div className='px-4 pb-12 mb-10'>
            <div className='pt-2'>
               <p className='text-lightGray font-medium sm:mx-20'> Activities {'>'} {category.name} </p>
            </div>
            <div className='mt-4'>
               <h3 className='text-4xl font-medium mb-2.5 sm:mx-20'>  {category.name} </h3>
               <ActivityContent />
            </div>
            {
               userActivities.length > 0 &&
               <div className='flex justify-center my-7'>
                  <button className={`rounded-l-full lg:w-[170px] lg:h-[62px] lg:text-xl border flex justify-center items-center py-2.5 px-4 font-semibold text-sm ${completedTabActive === false ? 'bg-secondary' : ''} `}
                     onClick={() => setCompletedTabActive(false)} >
                     {
                        completedTabActive === false &&
                        <img src={CheckedIcon} alt='checked' className='mr-[8.25px]' />
                     }
                     On going
                  </button>
                  <button className={`rounded-r-full lg:w-[170px] lg:h-[62px] lg:text-xl border flex justify-center items-center py-2.5 px-4 font-semibold text-sm ${completedTabActive === true ? 'bg-secondary' : ''} `}
                     onClick={() => setCompletedTabActive(true)}  >
                     {
                        completedTabActive === true &&
                        <img src={CheckedIcon} alt='checked' className='mr-[8.25px]' />
                     }
                     completed
                  </button>
               </div>
            }
            <div className='mt-5 sm:grid md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 sm:mx-20 
            [&>div]:max-w[280px]'>
               {userActivities.length > 0 ?
                  filteredUserActivities.map(activity => {
                     return <Activity {...activity} key={activity.id} />
                  })
                  :
                  activities.map(activity => {
                     return <Activity {...activity} key={activity.id} />
                  })
               }
            </div>
         </div>
      </div>
   )
}
