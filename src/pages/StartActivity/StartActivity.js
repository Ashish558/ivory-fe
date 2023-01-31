import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.css'

import StartActivityModal from '../Frames/StartActivityModal/StartActivityModal'
import PrimaryButton from '../../components/Buttons/PrimaryButton'
import SecondaryButton from '../../components/Buttons/SecondaryButton'

import MarkIcon from '../../assets/icons/mark.svg'
import NextIcon from '../../assets/icons/next.svg'
import ShareIcon from '../../assets/icons/share-outlined.svg'
import UploadIcon from '../../assets/icons/upload.svg'
import ActivityIcon from '../../assets/images/activity.png'
import ActivityContent from '../../components/ActivityContent/ActivityContent'
import Activity from '../../components/Activity/Activity'
import { getSingleActivity } from '../../services/activities'
import { getMyActivities, getUserSubmissions, uploadActivity } from '../../services/user'
import Feedback from '../../components/Feedback/Feedback'


export default function StartActivity() {

   const [startModalActive, setStartModalActive] = useState(false)
   const [activity, setActivity] = useState({})
   const [activities, setActivities] = useState([])
   const [submissions, setSubmissions] = useState([])
   const [isAlreadyStarted, setIsAlreadyStarted] = useState(false)
   const inputRef = useRef(null)
   const [currentIndex, setCurrentIndex] = useState(0)

   const { categoryId, activityId } = useParams()

   useEffect(() => {
      getSingleActivity(activityId)
         .then(res => {
            console.log('data', res.data.data);
            if (res.data.data === null) return
            // setActivities(res.data.data)
            setActivity(res.data.data)
         }).catch(err => {
            console.log('err', err);
         })
   }, [])

   useEffect(() => {
      getMyActivities()
         .then(res => {
            // console.log('my activities', res.data.data);
            if (res.data.data === null) return
            res.data.data.forEach(myActivity => {
               if (myActivity.activity.id === parseInt(activityId)) {
                  setIsAlreadyStarted(false)
               }
            })
         }).catch(err => {
            console.log('err', err);
         })
   }, [])

   useEffect(() => {
      getSubmissions()
   }, [])

   const getSubmissions = () => {
      getUserSubmissions(activityId)
         .then(res => {
            // console.log('submission res', res.data.data);
            if (res.data.data === null) return
            setSubmissions(res.data.data)
         }).catch(err => {
            console.log('submission err', err);
         })
   }
   const handleUpload = e => {
      const file = e.target.files[0]
      if (file === undefined) return
      let formData = new FormData();
      formData.append('submission', file);
      formData.append('activity', activityId);

      uploadActivity(formData)
         .then(res => {
            console.log('upload res', res.data);
         }).catch(err => {
            console.log('upload err', err);
         })
   }
   const increaseIndex = () => {
      if (currentIndex < submissions.length - 1) {
         setCurrentIndex(currentIndex + 1)
      } else {
         setCurrentIndex(0)
      }
   }
   // console.log('submission', submissions);
   // console.log('currentIndex', currentIndex);
   if (Object.keys(activity).length === 0) return <></>
   const { name, description, image, steps, video, video_link } = activity

   return (
      <>
         <div className='pb-12 mb-10'>
            {/* <Header /> */}
            <div className='pt-2 px-4'>
               <p className='text-lightGray font-medium'> Activities {'>'} Acrylic Painting </p>
            </div>

            <div className='mt-3'>
               <p className='text-xl font-bold mb-2.5 px-4'> {name} </p>
               <div>
                  <img src={image === null ? ActivityIcon : image}
                     className={styles.image} alt='Profile' />
               </div>
            </div>

            <div className='px-4 mt-5'>

               <p className='text-xl font-semibold mb-2.5'> Description </p>
               <p className='text-sm'>
                  {description}
               </p>
               {
                  isAlreadyStarted === false ?

                     <span className={styles.seeMoreBtn} onClick={() => setStartModalActive(true)} >
                        See More
                     </span> :
                     <div>
                        {steps.map((step, idx) => {
                           return (
                              <div className='mb-5 mt-6'>
                                 <p className='font-semibold text-[#7B34FB] mb-4'>
                                    Step {` ${idx}`}
                                 </p>
                                 <div className='font-semibold'>
                                    {step.description}
                                 </div>
                              </div>
                           )
                        })}
                     </div>

               }
               <div className='flex items-center gap-x-3 mt-8 mb-8'>
                  <PrimaryButton className='flex items-center pl-4 pr-4' disabled={true}
                     children={
                        <>
                           <img src={MarkIcon} className='mr-2.5' alt='mark' />
                           Mark Completed
                        </>
                     }
                  />
                  <SecondaryButton className='flex items-center pl-5 pr-5' disabled={true}
                     children={
                        <>
                           <img src={ShareIcon} className='mr-2.5' alt='mark' />
                           Share
                        </>
                     }
                  />
               </div>

               <div className='mb-12'>
                  <p className='font-medium' >
                     Submit your work to get feedback from our expert:
                  </p>
                  <div className='border border-primary border-dashed h-[119px] px-4 flex justify-center items-center mt-4 rounded-3xl opacity-70'>
                     <img src={UploadIcon}
                        className='mr-3 cursor-pointer'
                        alt='UploadIcon'
                        onClick={() => inputRef.current.click()} />
                     <p className='font-semibold' > Upload your work </p>
                     <input type='file' className='hidden' ref={inputRef}
                        onChange={e => handleUpload(e)} />
                  </div>
               </div>
            </div>

            {
               submissions.length > 0 &&
               <div className='px-4 py-5 bg-[#F0F5FF]'>
                  <h4 className='text-xl font-semibold mb-5'> Your submissions </h4>
                  <div className='relative'>
                     <div className={styles.slider}>

                        {submissions.map((sub, idx) => {
                           return <Feedback key={sub.id} {...sub} currentIndex={currentIndex} idx={idx} />
                        })}
                     </div>
                     <img src={NextIcon} className={styles.nextIcon} onClick={increaseIndex} />
                  </div>
               </div>
            }

            <div className='border-b border-lightGray w-full opacity-20'> </div>
            <div className='mt-10 px-4'>
               <ActivityContent />
               <h4 className='font-bold text-xl mt-8'>
                  Next Activities
               </h4>

               <div className='mt-5'>
                  {
                     activities.map(activity => {
                        return <Activity {...activity} key={activity.id} />
                     })
                  }
               </div>
            </div>
         </div>
         {
            startModalActive &&
            <StartActivityModal handleClose={() => setStartModalActive(false)}
               activityId={activityId} />
         }
      </>
   )
}
