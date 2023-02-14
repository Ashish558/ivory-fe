import React, { useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import Slider from 'react-slick'
import EventImg from '../../assets/images/event.png'
import SecondaryButton from '../../components/Buttons/SecondaryButton'
import Session from '../../components/Session/Session'
import { tempSessionData } from '../LiveEvents/LiveEvents'
import { settings } from '../LiveEvents/settings'
import styles from './style.module.css'

export default function SingleSession({ }) {

   const videoRef = useRef(null)

   let data = {
      title: 'Getting Started with Doodling',
      description: 'For this exercise, you will need a canvas, paint (acrylic or tempera works well), and something to splatter the paint with (such as a paintbrush with stiff bristles or a toothbrush).',
      video_link: null,
   }

   const { title, description, video_link } = data

   return (
      <div className='pb-12 mb-10 lg:mt-[64px]'>

         <div className='mt-0 md:flex md:flex-col md:justify-start md:items-start md:mx-20 '>
            {
               video_link !== null ?
                  <div className='md:flex md:items-start md:justify-start relative md:w-[100%]'>

                     <ReactPlayer ref={videoRef}
                        width='100%'
                        // height='400px'
                        className={styles.video}
                        url={video_link}
                        controls={true}
                        disabled={true}
                     />

                  </div>
                  :
                  <div className='md:flex md:items-start md:justify-start  md:w-[100%]'>
                     <img src={EventImg}
                        className={`${styles.image} md:rounded-3xl md:w-[100%] object-cover md:mx-0 mx-auto`} alt='Profile' />
                  </div>
            }

         </div>

         <div className='px-4 md:px-0 mt-4 md:mx-20'>
            <p className='md:text-3xl font-semibold mb-2.5 md:py-4'> {title} </p>

            <p className='text-sm md:text-xl lg:max-w-[748px]'>
               {description}
            </p>
            <div className='mb-2 flex items-center text-sm mt-5'>
               <p className='font-semibold text-lightGray mr-1 pr-0.5'> Date: </p>
               <p className='font-bold'> 25 Feb 2023 </p>
            </div>
            <div className='mb-2 flex items-center text-sm '>
               <p className='font-semibold text-lightGray mr-1 pr-0.5'> Time: </p>
               <p className='font-bold'> 02:00 PM to 03:30 PM  </p>
            </div>
            <div className='mb-2 flex items-center text-sm'>
               <p className='font-semibold text-lightGray mr-1 pr-0.5'> Duration: </p>
               <p className='font-bold'> 1 hr 30 min  </p>
            </div>
            <div className='flex items-center text-sm mb-6'>
               <p className='font-semibold text-lightGray mr-1 pr-0.5'> Host: </p>
               <p className='font-bold text-[#0055BF]'> Mike Winkelmann  </p>
            </div>

            <h3 className='text-lg font-semibold mb-6'> Pricing </h3>

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
            </div>

            <SecondaryButton children='Register for free' 
            className='bg-secondaryLight w-full max-w-[328px] mb-12' />

            <h4 className='font-semibold mb-6'> upcoming live sessions </h4>
            <Slider {...settings} >
               {tempSessionData.map((session, idx) => {
                  return <Session key={idx} {...session} />
               })}
            </Slider>
         </div>

      </div>
   )
}
