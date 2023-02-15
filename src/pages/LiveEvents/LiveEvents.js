import React from 'react'
import Slider from "react-slick";
import Image from '../../Images/faces.png'
import User from '../../Images/user1.png'
import LiveImg from '../../Images/Ellipse 3.png'
import Arrow from '../../Images/Icon.png';
import North from '../../Images/north.png';
import Session from '../../components/Session/Session';
import { settings } from './settings';
import { useEffect } from 'react';
import { getLiveSessions } from '../../services/liveSession';
import Filterbar from '../../components/Filterbar/filterbar';
import { getInterests } from '../../services/activities';
import { useState } from 'react';


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
   // console.log('filterItems', filterItems);
   console.log('allPrograms', allPrograms);

   return (
      <div className='px-4 py-4 overflow-x-hidden lg:mt-[70px] lg:px-[70px]'>

         <h4 className='text-lg font-semibold mb-5 lg:mb-4'> Upcoming live sessions </h4>

         <div className='mb-4 max-w-[900px]'>
            <div className=' flex items-center mb-2 '>
               {/* <h3 className='lg:text-4xl font-bold lg:font-semibold text-xl mb-2.5'> All Activities </h3>
               <p className='pl-7 hidden lg:block'><img src={Arrow} alt="" /></p> */}
            </div>
            <Filterbar items={filterItems} onChange={onChange} />
         </div>

         <Slider {...settings} >
            {allPrograms.map((session, idx) => {
               return <Session key={idx} {...session} />
            })}
         </Slider>
      </div>
   )
}
