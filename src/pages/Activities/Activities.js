import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Arrow from '../../Images/Icon.png';
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
import { useSelector } from 'react-redux'

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
   const [filteredActivities, setFilteredActivities] = useState([])
   const [myActivities, setMyActivities] = useState([])
   const [filterItems, setFilterItems] = useState([])
   const navigate = useNavigate()
   const { loggedIn } = useSelector(state => state.user)

   useEffect(() => {
      if (filterItems.length > 0) return
      if (activities.length === 0) return


   }, [activities])

   useEffect(() => {
      getInterests(true)
         .then(res => {
            // console.log(res.data.data);
            setActivities(res.data.data.map(item => ({ ...item, categories: [] })))
            setFilteredActivities(res.data.data.map(item => ({ ...item, categories: [] })))
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
                     <img src={activity.icon} alt='activity' className='max-h-[18px]' />
                     {activity.name}
                  </div>,
                  selected: true
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
            setFilteredActivities(tempActivities)

         }).catch(err => {
            console.log(err.response);
         })
   }, [activities.length])

   useEffect(() => {
      if (loggedIn === false) return
      getMyActivitiesProgress()
         .then(res => {
            console.log('my acts', res.data.data);
            if (res.data.data === null) return
            setMyActivities(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   }, [loggedIn])

   const onChange = (item) => {
      // console.log('item', item);
      if (item.id === 0) {
         let temp = filterItems.map(filterItem => {
            let sel = false
            if (item.selected === false) {
               sel = true
            } else {
               sel = false
            }
            return { ...filterItem, selected: sel }
         })
         setFilterItems(temp)
      } else {

         let temp = filterItems.map(filterItem => {
            if (filterItem.id === item.id) {
               return { ...filterItem, selected: true }
            } else {
               return { ...filterItem, selected: false }
            }
         })
         setFilterItems(temp)
      }
   }

   useEffect(() => {
      const activeItems = filterItems.filter(item => item.selected === true)
      let activeIds = activeItems.map(item => item.id)

      let filteredArr = activities.filter(activity => activeIds.includes(activity.id))
      setFilteredActivities(filteredArr)

   }, [filterItems, activities])
   // console.log('activities', activities);
   // console.log('filterItems', filterItems);
   console.log('my Activity', myActivities);
   return (
      <div>
         {/* <Header /> */}

         <div className='px-4 lg:px-0'>

            <div className='pt-6 mb-8 lg:grid lg:grid-cols-2 lg:px-[80px] lg:bg-sky-50'>
               <div className='lg:flex mt-10 flex-col'>
               <div className=' flex items-center mb-2'>
                  <h3 className='text-xl font-bold mb-2.5 lg:mb-4 lg:text-4xl lg:font-medium'> My activities
                  </h3>
                  <p className='pl-7'><img src={Arrow} alt="" /></p>
                  </div>
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
               <div className=' flex items-center mb-2'>
                  <h3 className='text-4xl font-semibold mb-2.5'> All Activities </h3>
                  <p className='pl-7'><img src={Arrow} alt="" /></p>
                  </div>
                  <Filterbar items={filterItems} onChange={onChange} />
               </div>

               <div className='mt-7'>

                  {filteredActivities.map((activity, indx) => {
                     return (
                        <div key={indx} className='mb-8' >
                           <div className='flex items-center mb-3'>
                              <img src={activity.icon} alt='activity' />
                              <p className='ml-2 text-2xl font-semibold'> {activity.name} </p>
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
