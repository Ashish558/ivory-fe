import React from 'react';
import Slider from 'react-slick';
import Image from '../../Images/faces.png'
import './Sessions.css'
import User from '../../Images/user1.png'
import LiveImg from '../../Images/Ellipse 3.png'
import Arrow from '../../Images/Icon.png';
import North from '../../Images/north.png';
import { useNavigate } from 'react-router';
import { getLiveSessions } from '../../services/liveSession';
import { useEffect } from 'react';
import { useState } from 'react';
import Session from '../../components/Session/Session';
import { settings } from '../LiveEvents/settings';


const Sessions = () => {

   const [allSessions, setAllSessions] = useState([])
   const navigate = useNavigate()

   const fetchSession = () => {
      getLiveSessions()
         .then((res) => {
            console.log(res.data.data);
            if (res.data.data === null) return
            setAllSessions(res.data.data)
         }).catch((err) => {
            console.log(err.repsonse)
         });
   }
   useEffect(() => {
      fetchSession()
   }, [])

   return (
      <div className=" lg:ml-24 lg:mt-[120px] mt-10 ">
         <div className='lg:flex lg:items-center lg:mb-20'>
            <h1 className='text-xl font-black pl-4 cursor-pointer lg:text-5xl lg:font-semibold show-sessions'
               onClick={() => navigate('/live-events')} >
               Live sessions
            </h1>
            <h1 className='text-xl font-black pl-4 cursor-pointer lg:text-5xl lg:font-semibold show-events'
               onClick={() => navigate('/live-events')}>Events</h1>
            <p className='pl-7 hidden lg:block'><img src={Arrow} alt="" /></p>
         </div>
         <div className='px-4'>
            <Slider {...settings} >
               {allSessions.map((session, idx) => {
                  return <Session key={idx} {...session} scrollToTop={true} />
               })}
            </Slider>
         </div>
      </div>
   );
};

export default Sessions;