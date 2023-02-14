import React from 'react'
import Slider from "react-slick";
import Image from '../../Images/faces.png'
import User from '../../Images/user1.png'
import LiveImg from '../../Images/Ellipse 3.png'
import Arrow from '../../Images/Icon.png';
import North from '../../Images/north.png';
import Session from '../../components/Session/Session';
import { settings } from './settings';


export const tempSessionData = [
   {
      title: 'Seminar on art of doodling',
      image: Image,
      date : '04 Jan, Sunday',
      user:{
         name: 'User',
         photo: User
      },
      live: true,
      upcoming: false
   },
   {
      title: 'Seminar on art of doodling',
      image: Image,
      date : '04 Jan, Sunday',
      user:{
         name: 'User',
         photo: User
      },
      live: false,
      upcoming: true
   },
]
export default function LiveEvents() {


   return (
      <div className='px-4 py-4 overflow-x-hidden'>
         <h4 className='text-lg font-semibold mb-5'> Upcoming live sessions </h4>
         <Slider {...settings} >
            {tempSessionData.map((session, idx) => {
               return <Session key={idx} {...session} />
            })}
         </Slider>
      </div>
   )
}
