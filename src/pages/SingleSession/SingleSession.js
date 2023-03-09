import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useLocation, useNavigate, useParams } from 'react-router'
import Slider from 'react-slick'
import EventImg from '../../assets/images/event.png'
import SecondaryButton from '../../components/Buttons/SecondaryButton'
import Session from '../../components/Session/Session'
import { getLiveSessions, getSingleLiveSessions, getUserLiveSessions, registerLiveSession } from '../../services/liveSession'
import { getFormattedDate, getFormattedDuration, shareLink } from '../../utils/utils'
import { tempSessionData } from '../LiveEvents/LiveEvents'
import { settings } from '../LiveEvents/settings'
import styles from './style.module.css'
import ShareIcon from '../../assets/icons/share-outlined.svg'
import { useSelector } from 'react-redux'
import backIcon from '../../Images/back-button.png'

export default function SingleSession({ }) {

   const videoRef = useRef(null)
   const [session, setSession] = useState({})
   const [allPrograms, setAllPrograms] = useState([])
   const { id } = useParams()
   const { loggedIn } = useSelector(state => state.user)
   const [isEnrolled, setIsEnrolled] = useState(false)

   const navigate = useNavigate()
   const location = useLocation()

   useEffect(() => {
      getSingleLiveSessions(id, loggedIn)
         .then((res) => {
            console.log('res', res.data.data);
            if (res.data.data === null) return
            setSession(res.data.data)
         }).catch((err) => {
            console.log(err.repsonse)
         });
   }, [id, loggedIn])

   const fetchSession = () => {
      getLiveSessions()
         .then((res) => {
            console.log(res.data.data);
            if (res.data.data === null) return
            setAllPrograms(res.data.data)
         }).catch((err) => {
            console.log(err.repsonse)
         });
   }

   useEffect(() => {
      fetchSession()
   }, [])

   const fetchUserSessions = () => {
      if (!loggedIn) return
      getUserLiveSessions()
         .then((res) => {
            console.log('user-sessions', res.data.data);
            if (res.data.data === null) return
            let enrolled = false
            res.data.data.map(item => {
               if (item.livesession.id === parseInt(id)) {
                  enrolled = true
               }
            })
            setIsEnrolled(enrolled)
         }).catch((err) => {
            console.log(err.repsonse)
         });
   }

   useEffect(() => {
      fetchUserSessions()
   }, [loggedIn])

   const handleRegisterClick = () => {
      if (!loggedIn) {
         return navigate('/login')
      } else {
         const body = {
            state: 'enrolled',
            payment_status: 'na',
            is_completed: false,
            livesession: id,
         }
         registerLiveSession(body)
            .then((res) => {
               console.log(res);
               fetchSession()
               fetchUserSessions()
            }).catch((err) => {
               console.log(err.repsonse)
            });
      }
   }

   // console.log('isEnrolled', isEnrolled)
   const { name, description, image, scheduled_on, duration, scheduled_on_start_time, scheduled_on_end_time, host, is_completed } = session

   const onShare = () => {
      shareLink(name, 'ivory Program', `https://ivory-test.netlify.app${location.pathname}`)
   }

   return (
      <div className='pb-12 mb-10 lg:mt-[84px]'>
         <div className='hidden lg:block'>
            <div className='  flex items-center  mb-11'>
               <div><img src={backIcon} alt='back' className='p-2 cursor-pointer'
                  onClick={() => navigate(-1)} /></div>
               <div>
                  <h3 className='hidden lg:block text-[40px] font-medium  font-inter '> {name} </h3>
               </div>
            </div>
         </div>

         <div className='mt-0 md:flex md:flex-col md:justify-start md:items-start md:mx-20 '>

            {
               // video_link !== null ?
               //    <div className='md:flex md:items-start md:justify-start relative md:w-[100%]'>

               //       <ReactPlayer ref={videoRef}
               //          width='100%'
               //          // height='400px'
               //          className={styles.video}
               //          url={video_link}
               //          controls={true}
               //          disabled={true}
               //       />

               //    </div>
               //    :
               <div className='md:flex md:items-start md:justify-start lg:max-w-[800px] md:w-[100%]'>
                  <img src={image}
                     className={`${styles.image} md:rounded-3xl md:w-[100%] lg:h-[420px] object-cover md:mx-0 mx-auto`} alt='Profile' />
               </div>
            }

         </div>

         <div className='px-4 md:px-0 mt-4 md:mx-20'>
            <p className='md:text-3xl font-semibold mb-2.5 md:py-4 lg:hidden'> {name} </p>
            <p className='text-2xl font-semibold mb-3 mt-14 hidden lg:block'>About this Event</p>
            <p className='text-sm lg:text-base lg:max-w-[748px]'>
               {description}
            </p>
            <div className='mb-2 flex items-center text-sm mt-5'>
               <p className='font-semibold text-lightGray mr-1 pr-0.5'> Date: </p>
               <p className='font-bold'> {getFormattedDate(scheduled_on)} </p>
            </div>
            <div className='mb-2 flex items-center text-sm '>
               <p className='font-semibold text-lightGray mr-1 pr-0.5'> Time: </p>
               <p className='font-bold'> {scheduled_on_start_time} to {scheduled_on_end_time}  </p>
            </div>
            <div className='mb-2 flex items-center text-sm'>
               <p className='font-semibold text-lightGray mr-1 pr-0.5'> Duration: </p>
               <p className='font-bold'> {getFormattedDuration(duration)}  </p>
            </div>
            <div className='flex items-center text-sm mb-6'>
               <p className='font-semibold text-lightGray mr-1 pr-0.5'> Host: </p>
               <p className='font-bold text-[#0055BF]'> {host?.name}  </p>
            </div>

            {/* <h3 className='text-lg font-semibold mb-6'> Pricing </h3>

           <div className='flex items-center mb-4'>
               <div className='text-4xl mr-2'>
                  ₹ 0
               </div>
               <div className='text-[#939CA3] font-medium'>
                  ₹
               </div>
               <p className={`${styles.dashed} mr-2 font-medium`}>
                  1499
               </p>
               <p className={`${styles.discount} `}>
                  100% OFF
               </p>
            </div> */}
            <div className='flex flex-col'>
               <SecondaryButton children={isEnrolled ? 'Registered' : `Register for free`}
                  className='bg-secondaryLight w-full max-w-[328px] mb-5 border-2 border-[#0055BF] text-[#0055BF]'
                  onClick={isEnrolled !== true && handleRegisterClick} />

               <SecondaryButton children={<> <img src={ShareIcon} alt='share' className='mr-2.5 ' /> <span className='text-[#1B72C0]'>Share</span> </>}
                  className='bg-secondaryLigt w-full flex justify-center items-center max-w-[328px] mb-12 border-2 border-[#1B72C0]'
                  onClick={onShare}
               />
            </div>

            <h4 className='font-semibold mb-6 lg:text-2xl'> upcoming live sessions </h4>
            <Slider {...settings} >
               {allPrograms.map((session, idx) => {
                  return <Session key={idx} {...session} scrollToTop={true} />
               })}
            </Slider>
         </div>

      </div>
   )
}
