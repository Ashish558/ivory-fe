import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.css'

import PrimaryButton from '../../components/Buttons/PrimaryButton'
import SecondaryButton from '../../components/Buttons/SecondaryButton'
import StartActivityModal from '../Frames/StartActivityModal/StartActivityModal'

import { useSelector } from 'react-redux'
import MarkIcon from '../../assets/icons/mark.svg'
import NextIcon from '../../assets/icons/next.svg'
import ShareIcon from '../../assets/icons/share-outlined.svg'
import UploadIcon from '../../assets/icons/upload.svg'
import ActivityIcon from '../../assets/images/activity.png'
import Activity from '../../components/Activity/Activity'
import ActivityContent from '../../components/ActivityContent/ActivityContent'
import Feedback from '../../components/Feedback/Feedback'
import { getActivities, getCategories, getSingleActivity } from '../../services/activities'
import { completeActivity, getMyActivities, getUserSubmissions, uploadActivity } from '../../services/user'


export default function StartActivity() {

   const [startModalActive, setStartModalActive] = useState(false)
   const [activity, setActivity] = useState({})
   const [activities, setActivities] = useState([])
   const [submissions, setSubmissions] = useState([])
   const [isAlreadyStarted, setIsAlreadyStarted] = useState(false)
   const [isCompleted, setIsCompleted] = useState(false)
   const { categoryId, activityId } = useParams()
   const [category, setCategory] = useState({})

   const [nextActivities, setNextActivities] = useState([])
   const inputRef = useRef(null)

   const [currentIndex, setCurrentIndex] = useState(0)
   const { loggedIn } = useSelector(state => state.user)
   const [userActivityId, setUserActivityId] = useState(activityId)

   useEffect(() => {
      getSingleActivity(activityId)
         .then(res => {
            console.log('activity data', res.data.data);
            if (res.data.data === null) return
            // setActivities(res.data.data)
            setActivity(res.data.data)
         }).catch(err => {
            console.log('err', err);
         })
   }, [activityId])

   //fetch category details
   useEffect(() => {
      getCategories()
         .then(res => {
            // console.log('categories', res.data.data);
            if (res.data.data === null) return
            let currentCategory = res.data.data.find(item => item.id === parseInt(categoryId))
            setCategory(currentCategory)
         }).catch(err => {
            console.log(err.response);
         })
   }, [categoryId])

   //fetch users activities
   const fetchUserActivities = () => {
      getMyActivities()
         .then(res => {
            if (res.data.data === null) return
            res.data.data.forEach(myActivity => {
               if (myActivity.activity.id === parseInt(activityId)) {
                  setIsAlreadyStarted(true)
                  console.log('my act', myActivity);
                  if (myActivity.is_completed === true) {
                     setIsCompleted(true)
                  }
                  setUserActivityId(myActivity.id)
               }
            })
         }).catch(err => {
            console.log('err', err);
         })
   }
   useEffect(() => {
      if (loggedIn === false) return
      fetchUserActivities()
   }, [loggedIn, activityId])

   useEffect(() => {
      if (loggedIn === false) return
      getSubmissions()
   }, [userActivityId, loggedIn])

   const getSubmissions = () => {
      getUserSubmissions(userActivityId)
         .then(res => {
            // console.log('submission res', res.data.data);
            if (res.data.data === null) return
            setSubmissions(res.data.data)
         }).catch(err => {
            console.log('submission err', err);
         })
   }

   const handleUploadClick = () => {
      if (isAlreadyStarted === false) {
         setStartModalActive(true)
      } else {
         inputRef.current.click()
      }
   }

   const handleUpload = e => {
      if (loggedIn === false) return
      const file = e.target.files[0]
      if (file === undefined) return
      let formData = new FormData();
      formData.append('submission', file);
      formData.append('activity', userActivityId);

      uploadActivity(formData)
         .then(res => {
            console.log('upload res', res.data);
            alert('uploaded successfully')
            getSubmissions()
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

   const handleComplete = () => {
      completeActivity(userActivityId)
         .then(res => {
            console.log('compl res', res.data);
            fetchUserActivities()
         }).catch(err => {
            console.log('compl err', err);
         })
   }

   //next activities
   useEffect(() => {
      getActivities(categoryId)
         .then(res => {
            console.log('next activity data', res.data.data);
            if (res.data.data === null) return
            let next = res.data.data.filter(item => item.id > parseInt(activityId))
            // console.log('next', next);
            setNextActivities(next)
            // setActivities(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   }, [categoryId, activityId])

   //384480
   // console.log('loggedIn', loggedIn);
   // console.log('userActivityId', userActivityId);
   // console.log('activityId', activityId);
   // console.log('submission', submissions);
   // console.log('currentIndex', currentIndex);
   // console.log('isCompleted', isCompleted);
   // console.log('nextActivities', nextActivities);
   if (Object.keys(activity).length === 0) return <></>
   const { name, description, image, steps, video, video_link } = activity

   return (
      <>
         <div className='pb-12 mb-10'>
            {/* <Header /> */}
            <div className='pt-2 px-4 sm:mx-20'>
               <p className='text-lightGray font-medium sm:py-2'> Activities {'>'} {category.name}  </p>
            </div>

            <div className='mt-3 sm:flex sm:flex-col sm:justify-start sm:items-start sm:mx-20 '>
               <p className='text-xl sm:text-2xl font-bold mb-2.5 px-4 sm:py-4'> {name} </p>
               <div className='sm:flex sm:items-start sm:justify-start  sm:w-[100%]'>
                  <img src={image === null ? ActivityIcon : image}
                     className={`${styles.image} sm:rounded-3xl sm:w-[100%] object-cover sm:mx-0 mx-auto`} alt='Profile' />
               </div>
            </div>

            <div className='px-4 sm:px-0 mt-5 sm:mx-20'>

               <p className='text-xl sm:text-2xl font-semibold mb-2.5'> Description </p>
               <p className='text-sm sm:text-xl'>
                  {description}
               </p>
               {
                  isAlreadyStarted === false ?

                     <span className={`${styles.seeMoreBtn} text-sm sm:text-lg`} onClick={() => setStartModalActive(true)} >
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
                  {
                     isCompleted === true ?
                        <PrimaryButton className={`flex items-center pl-4 pr-4 bg-primaryGreen`}
                           disabled={submissions.length === 0 ? true : false}
                           // onClick={handleComplete}
                           children={
                              <>
                                 <img src={MarkIcon} className='mr-2.5' alt='mark' />
                                 Completed
                              </>
                           }
                        /> :
                        <PrimaryButton className={`flex items-center pl-4 pr-4`}
                           disabled={submissions.length === 0 ? true : false}
                           onClick={handleComplete}
                           children={
                              <>
                                 <img src={MarkIcon} className='mr-2.5' alt='mark'
                                 />
                                 Mark Completed
                              </>
                           }
                        />
                  }
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
                  <p className='font-medium sm:text-lg sm:font-semibold' >
                     Submit your work to get feedback from our expert:
                  </p>
                  <div className='border-2 border-primary border-dashed w-[300px] h-[119px] px-4 flex justify-center items-center mt-4 rounded-3xl opacity-70 mx-auto sm:mx-0'>
                     <img src={UploadIcon}
                        className='mr-3 cursor-pointer'
                        alt='UploadIcon'
                        onClick={handleUploadClick} />
                     <p className='font-semibold' > Upload your work </p>
                     <input type='file' className='hidden' ref={inputRef}
                        onChange={e => handleUpload(e)} />
                  </div>
               </div>
            </div>

            {
               submissions.length > 0 &&
               <div className='px-4 py-5 bg-[#F0F5FF] sm:px-20'>
                  <h4 className='text-xl font-semibold mb-5'> Your submissions </h4>
                  <div className='relative sm:grid sm:grid-cols-2  sm:justify-center sm:items-center sm:content-center sm:w-full sm:mx-auto'>
                     <div className={`${styles.slider} sm:shadow-xl mb-0 overflow-hidden sm:w-[322px] mx-auto`}>

                        {submissions.map((sub, idx) => {
                           return <Feedback key={sub.id} {...sub} currentIndex={currentIndex} idx={idx} />
                        })}
                     </div>
                     <div className={`${styles.slider} sm:shadow-xl mb-0 overflow-hidden sm:w-[322px] hidden sm:block`}>
                        {submissions.map((sub, idx) => {
                           return <Feedback key={sub.id} {...sub} currentIndex={currentIndex + 1} idx={idx} />
                        })}
                     </div>
                     <img src={NextIcon} className={`${styles.nextIcon} sm:hidden`} alt='' onClick={increaseIndex} />
                  </div>
               </div>
            }

            <div className='border-b border-lightGray w-full opacity-20'> </div>
            <div className='mt-10 px-4'>
               <ActivityContent />
               <h4 className='font-bold text-xl mt-8 sm:mx-20'>
                  Next Activities
               </h4>

               <div className='mt-5 max-w-[600px]  sm:mx-[60px]'>
                  {nextActivities.length > 0 &&
                     nextActivities.map(activity => {
                        return <Activity {...activity} key={activity.id} />
                     })
                  }
               </div>
            </div>
         </div>
         {
            startModalActive &&
            <StartActivityModal handleClose={() => setStartModalActive(false)}
               activityId={activityId}
               setIsAlreadyStarted={setIsAlreadyStarted} />
         }
      </>
   )
}
