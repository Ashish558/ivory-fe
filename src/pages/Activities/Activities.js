import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Arrow from '../../Images/Icon.png';
import PaintingIcon from '../../assets/icons/painting-icon.svg'
import PhotographyIcon from '../../assets/icons/photography-icon.svg'
import TechnologyIcon from '../../assets/icons/technology-icon.svg'
import PaintingTypeIcon from '../../assets/icons/painting.svg'
import ScrollToTop from '../../assets/icons/scroll-to-top.svg'
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

   const handleScrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   }
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
                  children: <div className='flex items-center gap-x-1 lg:gap-x-3'>
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
   const variants = ['red', 'purple', 'orange', 'blue', 'yellow',]
   // console.log('activities', activities);
   // console.log('filterItems', filterItems);
   // console.log('my Activity', myActivities);
   // console.log('filteredActivities', filteredActivities);
   return (
      <div className=' lg:mt-[64px]'>
         {/* <Header /> */}

         <div className='px-4 lg:px-0'>

            <div className='pt-0 lg:pt-6 mb-8 lg:grid lg:grid-cols-2 items-center lg:px-[80px] lg:bg-sky-50 lg:min-h-[90vh]'>
               <div className={`lg:flex mt-10 flex-col lg:self-start lg:mt-12 ${myActivities.length === 0 ? 'lg:min-h-[40%] lg:justify-between' : ''} `}>
                  <div className=' flex items-center mb-2'>
                     <h3 className='text-xl font-bold mb-2.5  lg:mb-4 lg:text-4xl lg:font-semibold'>
                        My activities
                     </h3>
                     <p className='pl-7 hidden lg:block'><img src={Arrow} alt="" /></p>
                  </div>
                  {myActivities.length > 0 ?
                     myActivities.map((activity, idx) => {
                        return <MyActivityCard key={activity.id} {...activity} idx={idx} variants={variants} />
                     }) :
                     <p className='text-lightGray font-medium lg:text-end lg:text-[24px]'>
                        No activities started yet
                     </p>
                  }
               </div>
               <div className={`hidden lg:block ${myActivities.length === 0 ? 'px-[20px]' : 'px-[60px]'} `}>
                  <img src={GuitarImg} alt='guitar' className={myActivities.length === 0 ? styles.guitarSmall : styles.guitar} />
               </div>

            </div>

            <div className='lg:px-[80px] lg:max-w-[1200px] lg:pb-[10px]'>
               <div className=''>
                  <div className=' flex items-center mb-2'>
                     <h3 className='lg:text-4xl font-bold lg:font-semibold text-xl mb-2.5'> All Activities </h3>
                     <p className='pl-7 hidden lg:block'><img src={Arrow} alt="" /></p>
                  </div>
                  <Filterbar items={filterItems} onChange={onChange} />
               </div>

               <div className='mt-7'>

                  {filteredActivities.map((activity, indx) => {
                     return (
                        activity.categories?.length > 0 ?
                           <div key={indx} className='mb-8 lg:mb-[60px]' >
                              <div className='flex items-center mb-3  lg:mb-[48px]'>
                                 <img src={activity.icon} alt='activity' />
                                 <p className='ml-2 text-2xl font-semibold lg:text-[32px]'> {activity.name} </p>
                              </div>
                              <div className='grid grid-cols-3 lg:grid-cols-6 lg:gap-x-[17px] lg:gap-y-6 gap-x-4 gap-y-2'>
                                 {activity.categories.map((category, idx) => {
                                    return <div key={idx} className={`grid grid-rows-2 ${styles.activity}`}
                                       onClick={() => navigate(`/activities/${category.id}`)} >
                                       <img src={category.icon} alt='activity-type' className='row-span-1 mx-auto' />
                                       <p className='mt-2  font-semibold text-center  row-span-1 leading-5'>
                                          {category.name} </p>
                                    </div>
                                 })}
                              </div>
                           </div> :
                           <>
                           </>
                     )
                  })}
                  {
                     filteredActivities.length === 1 && filteredActivities[0]?.categories?.length === 0 &&
                     <div className='min-h-[100px] flex items-center justify-center'>
                        <p className='text-lightGray font-medium lg:text-end lg:text-[24px]'>
                           No activities added yet
                        </p>
                     </div>
                  }
               </div>

            </div>
            <div className='flex justify-end px-4 lg:px-[80px] pb-[60px] lg:pb-100px'>
               <div className='flex flex-col items-center'>
                  <img src={ScrollToTop} alt='scroll-to-top' className='cursor-pointer' onClick={handleScrollToTop} />
                  <p> scroll to top </p>
               </div>
            </div>
         </div>
      </div>
   )
}
