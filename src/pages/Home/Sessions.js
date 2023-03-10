import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';
import Session from '../../components/Session/Session';
import Arrow from '../../Images/Icon.png';
import { getLiveSessions } from '../../services/liveSession';
import './Sessions.css';
// import { settings } from '../LiveEvents/settings';


const Sessions = () => {

   const [allSessions, setAllSessions] = useState([])
   const navigate = useNavigate()

   const fetchSession = () => {
      getLiveSessions()
         .then((res) => {
            // console.log(res.data.data);
            if (res.data.data === null) return
            setAllSessions(res.data.data)
         }).catch((err) => {
            console.log(err.repsonse)
         });
   }
   useEffect(() => {
      fetchSession()
   }, [])
   const settings = {
      infinite: false,
      // centerPadding: "60px",
      slidesToShow: 1.35,
      initialSlide: 0,
      arrows: false,
      swipeToSlide: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               settings: {
                  slidesToShow: 3.5,
                  initialSlide: 0,
               },
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 3,
               initialSlide: 0,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1.35,
               initialSlide: 0,
            },
            // state: {
            //    display: true,
            //    height: 600
            // }
         }
      ],
      afterChange: function (index) {
         console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
         );
      }
   };
   return (
      <div className=" lg:ml-24 lg:mt-[120px] mt-10 ">
         <div className='lg:flex lg:items-center lg:mb-20 mb-4'>
            <h1 className='text-xl font-black pl-4 cursor-pointer lg:text-5xl lg:font-semibold show-sessions'
               onClick={() => navigate('/live-events')} >
               Live sessions
            </h1>
            <h1 className='text-xl font-black pl-4 cursor-pointer lg:text-5xl lg:font-semibold show-events'
               onClick={() => navigate('/live-events')}>
               Events
            </h1>
            <p className='pl-7 hidden lg:block cursor-pointer'>
               <img src={Arrow} onClick={() => navigate('/live-events')} alt="" />
            </p>
         </div>
         <div className='px-4 md:hidden'>
            <Slider {...settings} >
               {allSessions.map((session, idx) => {
                  return <Session key={idx} {...session} scrollToTop={true} />
               })}
            </Slider>
         </div>
         <div className='px-4 hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 gap-y-6'>

            {allSessions.map((session, idx) => {
               return <Session key={idx} {...session} scrollToTop={true} />
            })}

         </div>
      </div>
   );
};

export default Sessions;