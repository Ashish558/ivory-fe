import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';

import Slider from "react-slick";
import Image from '../../Images/faces.png'
import User from '../../Images/user1.png'
import LiveImg from '../../Images/Ellipse 3.png'
import Arrow from '../../Images/Icon.png';
import North from '../../Images/north.png';
import Session from '../../components/Session/Session';
import { settings } from './settings';
import { getLiveSessions } from '../../services/liveSession';
import Filterbar from '../../components/Filterbar/filterbar';
import { getInterests } from '../../services/activities';
import Background from '../../assets/images/background.svg'


export const tempSessionData = [
   {
      title: 'Seminar on art of doodling',
      image: Image,
      date: '04 Jan, Sunday',
      user: {
         name: 'User',
         photo: User
      },
      live: true,
      upcoming: false
   },
   {
      title: 'Seminar on art of doodling',
      image: Image,
      date: '04 Jan, Sunday',
      user: {
         name: 'User',
         photo: User
      },
      live: false,
      upcoming: true
   },
   {
      title: 'Seminar on art of doodling',
      image: Image,
      date: '04 Jan, Sunday',
      user: {
         name: 'User',
         photo: User
      },
      live: false,
      upcoming: true
   },
   {
      title: 'Seminar on art of doodling',
      image: Image,
      date: '04 Jan, Sunday',
      user: {
         name: 'User',
         photo: User
      },
      live: false,
      upcoming: true
   },
]
export default function LiveEvents() {

   const [filterItems, setFilterItems] = useState([])
   const [allPrograms, setAllPrograms] = useState([])
   const [filteredPrograms, setFilteredPrograms] = useState([])

   const [todaySessions, setTodaySessions] = useState([])
   const [todaySessionsFiiltered, setTodaySessionsFiiltered] = useState([])

   const [upcoming, setUpcoming] = useState([])
   const [upcomingFiiltered, setUpcomingFiiltered] = useState([])

   const navigate = useNavigate()

   useEffect(() => {
      getLiveSessions()
         .then((res) => {
            console.log(res.data.data);
            if (res.data.data === null) return
            setAllPrograms(res.data.data)
            setFilteredPrograms(res.data.data)
         }).catch((err) => {
            console.log(err.repsonse)
         });
   }, [])

   useEffect(() => {
      getInterests(true)
         .then(res => {
            console.log(res.data.data);
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
      if (filteredPrograms.length === 0) {
         setTodaySessions([])
         setUpcoming([])
      } else {
         let today = filteredPrograms.filter(item => {
            var inputDate = new Date(item.scheduled_on);
            var todaysDate = new Date();
            if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
               return item
            }
         })
         setTodaySessions(today)
         let todayIds = today.map(item => item.id)
         let upcomingSessions = filteredPrograms.filter(item => !todayIds.includes(item.id))
         setUpcoming(upcomingSessions)
         // console.log('today', today);
         // console.log('upcomingSessions', upcomingSessions);
      }
   }, [filteredPrograms])

   const onChange = (item) => {
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
      const selectedCatIds = filterItems.filter(item => item.selected === true).map(item => item.id)
      let upcFiltered = upcoming.filter(item => selectedCatIds.includes(item.category))
      let todayFiltered = todaySessions.filter(item => selectedCatIds.includes(item.category))
      setUpcomingFiiltered(upcFiltered)
      setTodaySessionsFiiltered(todayFiltered)
   }, [todaySessions, upcoming, filterItems])
   // console.log('allPrograms', allPrograms);

   return (
      <div className='px-4 py-4 overflow-x-hidden pb-[70px] lg:mt-[70px] lg:px-[70px] z-10'>
         <img src={Background} className={styles.backgroundImage} />
         <div className={styles.container}>
            <h4 className='text-lg font-semibold mb-5 lg:mb-4 hidden'> Upcoming live sessions </h4>

            <div className='hidden lg:flex items-center gap-x-7 mb-5 mt-4'>
               <h1 className='text-xl font-black cursor-pointer lg:text-5xl lg:font-semibold show-events'
                  onClick={() => navigate('/live-events')}>Events</h1>
               <p className='p '><img src={Arrow} alt="" /></p>
            </div>
            {
               todaySessionsFiiltered.length > 0 &&
               <div className='mb-[30px] hidden lg:block'>
                  <h4 className='text-2xl font-semibold mb-5 lg:mb-8 '> Today </h4>
                  <Slider {...settings} >
                     {todaySessionsFiiltered.map((session, idx) => {
                        return <Session key={idx} {...session} />
                     })}
                  </Slider>
               </div>
            }
         </div>

         <div className='mb-4 max-w-[900px] lg:mb-8'>
            <div className=' flex items-center mb-2 '>
               {/* <h3 className='lg:text-4xl font-bold lg:font-semibold text-xl mb-2.5'> All Activities </h3>
               <p className='pl-7 hidden lg:block'><img src={Arrow} alt="" /></p> */}
            </div>
            <Filterbar items={filterItems} onChange={onChange} />
         </div>

         {
            todaySessionsFiiltered.length > 0 &&
            <div className='mb-[30px] lg:hidden'>
               <h4 className='text-lg font-semibold mb-5 lg:mb-4 '> Today </h4>
               <Slider {...settings} >
                  {todaySessionsFiiltered.map((session, idx) => {
                     return <Session key={idx} {...session} />
                  })}
               </Slider>
            </div>
         }
         {
            upcomingFiiltered.length > 0 &&
            <div className='mb-[30px]'>
               <h4 className='text-lg font-semibold mb-5 lg:mb-4 '> Upcoming live sessions </h4>
               <Slider {...settings} >
                  {upcomingFiiltered.map((session, idx) => {
                     return <Session key={idx} {...session} />
                  })}
               </Slider>
            </div>
         }



      </div>
   )
}
