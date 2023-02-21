import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.css'
import ReactPlayer from 'react-player/youtube'

import PrimaryButton from '../../../components/Buttons/PrimaryButton'
import SecondaryButton from '../../../components/Buttons/SecondaryButton'
import StartActivityModal from '../../Frames/StartActivityModal/StartActivityModal'

import { useSelector } from 'react-redux'
import MarkIcon from '../../../assets/icons/mark.svg'
import NextIcon from '../../../assets/icons/next.svg'
import UploadOutlineIcon from '../../../assets/icons/upload-outline.svg'
import ShareIcon from '../../../assets/icons/share-outlined.svg'
import UploadIcon from '../../../assets/icons/upload.svg'
import WhatsappOutline from '../../../assets/icons/whatsapp-outline.svg'
import ActivityIcon from '../../../assets/images/activity.png'
import Activity from '../../../components/Activity/Activity'
import ActivityContent from '../../../components/ActivityContent/ActivityContent'
import Feedback from '../../../components/Feedback/Feedback'
import { getActivities, getCategories, getSingleActivity } from '../../../services/activities'
import { completeActivity, deleteSubmission, getMyActivities, getUserSubmissions, inCompleteActivity, startActivity, uploadActivity } from '../../../services/user'
import { ViewSubmission } from '../../Frames/ViewSubmission/ViewSubmission'
import Slider from "react-slick";
import { getColors } from '../../../utils/utils'
import { deleteUserSubmission, getUserAssignmentSubmissions, updateUserAssignment } from '../../../services/program'
import SingleAssignment from '../../../components/Assignment/SingleAssignment'

const settings = {
   infinite: false,
   centerPadding: "20px",
   slidesToShow: 2,
   initialSlide: 0,
   arrows: false,
   swipeToSlide: true,
   dots: true,
   responsive: [
      {
         breakpoint: 700,
         settings: {
            settings: {
               slidesToShow: 2,
               initialSlide: 0,
            },
         }
      },
   ],
   afterChange: function (index) {

   }
};

export default function Assignment({ selectedAssignment, fetchUserAssignments, assignments, onClickAssignment }) {

   const [startModalActive, setStartModalActive] = useState(false)
   const [userAssignment, setUserAssignment] = useState(selectedAssignment)
   const [activity, setActivity] = useState({})
   const [activities, setActivities] = useState([])
   const [submissions, setSubmissions] = useState([])
   const [isAlreadyStarted, setIsAlreadyStarted] = useState(false)
   const [isCompleted, setIsCompleted] = useState(false)
   const { categoryId, activityId } = useParams()
   const [category, setCategory] = useState({})
   const [viewSubModal, setViewSubModal] = useState(false)
   const [sourceToView, setSourceToView] = useState('')
   const [isLastFeedbacked, setIsLastFeedbacked] = useState(false)
   const inputRef = useRef(null)
   const videoRef = useRef(null)

   const navigate = useNavigate()

   useEffect(() => {
      setUserAssignment(selectedAssignment)
   }, [selectedAssignment])
   const [currentIndex, setCurrentIndex] = useState(0)
   const { loggedIn, profileData } = useSelector(state => state.user)
   const [userActivityId, setUserActivityId] = useState(activityId)


   // useEffect(() => {
   //    if (loggedIn === false) return
   //    fetchUserActivities()
   // }, [loggedIn, activityId])

   // useEffect(() => {
   //    if (loggedIn === false) return
   //    getSubmissions()
   // }, [userActivityId, loggedIn])

   const getSubmissions = () => {
      // getUserSubmissions(userActivityId)
      //    .then(res => {
      //       console.log('submission res', res.data.data);
      //       if (res.data.data === null) return setSubmissions([])
      //       setSubmissions(res.data.data)
      //    }).catch(err => {
      //       console.log('submission err', err);
      //       // setSubmissions([])
      //    })
   }

   useEffect(() => {
      if (!submissions) return
      if (submissions.length === 0) return
      setIsLastFeedbacked(submissions[submissions.length - 1].is_feedbacked)
   }, [submissions, userAssignment])

   const handleUploadClick = () => {
      if (submissions.length === 0 && is_completed === false) {
         // inputRef.current.click()
         window.open(`https://wa.me/8142137455?text=IvoryUser%3A%20Name-${profileData.mobile_no}%0A%0AActivity%3A%20${name}%0A%0A_Attach%20your%20file%20and%20press%20SEND_%0A%0A`)
      } else if (submissions.length >= 1 && is_completed === false) {
         alert('Please delete your submission to reupload')
      } else if (isLastFeedbacked === false) {
         alert('Please wait for the feedback')
      } else {
         window.open(`https://wa.me/8142137455?text=IvoryUser%3A%20Name-${profileData.mobile_no}%0A%0AActivity%3A%20${activity.name}%0A%0A_Attach%20your%20file%20and%20press%20SEND_%0A%0A`)
         // inputRef.current.click()
      }
   }

   const handleUpload = e => {
      // if (loggedIn === false) return
      // const file = e.target.files[0]
      // if (file === undefined) return
      // let formData = new FormData();
      // formData.append('submission', file);
      // formData.append('activity', userActivityId);

      // uploadActivity(formData)
      //    .then(res => {
      //       console.log('upload res', res.data);
      //       alert('uploaded successfully')
      //       getSubmissions()
      //    }).catch(err => {
      //       console.log('upload err', err);
      //    })
   }
   const increaseIndex = () => {
      if (currentIndex < submissions.length - 1) {
         setCurrentIndex(currentIndex + 1)
      } else {
         setCurrentIndex(0)
      }
   }

   const handleComplete = () => {
      const body = {
         is_completed: true
      }
      updateUserAssignment(userAssignmentId, body)
         .then(res => {
            console.log('compl res', res.data);
            setUserAssignment(res.data.data)
            fetchUserAssignments()
         }).catch(err => {
            console.log('compl err', err);
         })
   }

   const handleInComplete = () => {
      const body = {
         is_completed: false
      }
      updateUserAssignment(userAssignmentId, body)
         .then(res => {
            console.log('incompl res', res.data);
            setUserAssignment(res.data.data)
            fetchUserAssignments()
         }).catch(err => {
            console.log('compl err', err);
         })
   }


   const onDelete = (id) => {
      deleteUserSubmission(id)
         .then(res => {
            console.log('delete res', res.data);
            alert('deleted successfully')
            if (submissions.length === 1) {
               handleInComplete()
                  .then(res => { getAllSubmissions() })
                  .catch(err => { getAllSubmissions() })
            } else {
               getAllSubmissions()
            }
         }).catch(err => {
            console.log('delete err', err.response);
            getAllSubmissions()
         })
   }

   const onView = (item) => {
      //  console.log(item);
      setSourceToView(item)
      setViewSubModal(true)
   }

   const getAllSubmissions = () => {
      getUserAssignmentSubmissions()
         .then(res => {
            console.log('all submissions -', res.data);
            // fetchUserActivities()
            if (res.data.data === null) return
            const currentAssignmentSub = res.data.data.filter(item => item.id === userAssignment.assignment.id)
            setSubmissions(currentAssignmentSub)
         }).catch(err => {
            console.log('get submissions err', err.response);
         })
   }

   useEffect(() => {
      getAllSubmissions()
   }, [userAssignment])

   const { id: userAssignmentId, is_completed, assignment } = userAssignment
   const { name, description, image, steps, video, video_link } = assignment
   // console.log('loggedIn', loggedIn);
   // console.log('userActivityId', userActivityId);
   // console.log('activityId', activityId);
   // console.log('submission', submissions);
   // console.log('currentIndex', currentIndex);
   // console.log('isCompleted', isCompleted);
   // console.log('nextActivities', nextActivities);
   // console.log('isLastFeedbacked', isLastFeedbacked);
   // if (Object.keys(activity).length === 0) return <></>
   // console.log('steps', steps);
   // const { name, description, image, steps, video, video_link } = activity
   console.log('selectedAssignment', userAssignment);

   return (
      <>
         <div className='pb-12 mb-10 lg:mt-[64px]'>
            {/* <Header /> */}
            <div className='pt-2 px-4 sm:mx-20'>
               <p className='text-lightGray font-medium sm:py-2'>
                  {/* Activities {'>'} 
               {category.name}   */}
               </p>
            </div>

            <div className='mt-3 sm:flex sm:flex-col sm:justify-start sm:items-start sm:mx-20 '>
               <p className='text-xl sm:text-4xl font-medium mb-2.5 px-4 sm:py-4'>
                 {name} 
               </p>
               {
                  video_link !== null ?
                     <div className='sm:flex sm:items-start sm:justify-start relative sm:w-[100%]'>
                        {
                           isAlreadyStarted === false &&
                           <div className={styles.overlay} onClick={() => setStartModalActive(true)} > </div>
                        }
                        <ReactPlayer ref={videoRef}
                           width='100%'
                           // height='400px'
                           className={styles.video}
                           url={video_link}
                           controls={true}
                           disabled={true}
                        />
                        {/* <video width='100%' height='400px' className='max-h-[400px]' controls  >
                           <source src={video_link}  />
                        </video> */}
                     </div>
                     :
                     <div className='sm:flex sm:items-start sm:justify-start  sm:w-[100%]'>
                        <img src={image === null ? ActivityIcon : image}
                           className={`${styles.image} sm:rounded-3xl sm:w-[100%] object-cover sm:mx-0 mx-auto`} alt='Profile' />
                     </div>
               }

            </div>

            <div className='px-4 sm:px-0 mt-5 sm:mx-20'>

               <p className='text-xl sm:text-2xl lg:mt-3 lg:mb-4 font-semibold mb-1.5'> Description </p>
               <p className='text-sm sm:text-xl lg:max-w-[748px]'>
                  {description}
               </p>
               {
                  startModalActive === false ?
                     <span className={`${styles.seeMoreBtn} text-sm sm:text-lg`}
                        onClick={() => setStartModalActive(true)} >
                        See More
                     </span> :
                     <div>
                        {steps.map((step, idx) => {
                           let color = getColors(steps.length, idx)
                           return (
                              <div className='mb-6 mt-6 max-w-[650px]'>
                                 <p className={`font-semibold text-[${color}] mb-3`} style={{ color }} >
                                    {`${step.name}`}
                                 </p>
                                 {step.image &&
                                    <div className={styles.stepImageContainer}>
                                       <img src={step.image} alt='step-image' />
                                    </div>
                                 }
                                 <div className='font-normal text-sm md:text-base '>
                                    {step.description}
                                 </div>
                              </div>
                           )
                        })}
                     </div>

               }
               <div className='flex items-center gap-x-3 mt-8 mb-8'>
                  {
                     is_completed === true ?
                        <PrimaryButton className={`flex items-center pl-4 pr-4 bg-primaryGreen`}
                           disabled={submissions.length === 0 ? true : false}
                           onClick={handleComplete}
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

               {
                  submissions.length === 0 ?
                     <div className='mb-12'>
                        <p className='font-medium sm:text-lg sm:font-semibold' >
                           Submit your work to get feedback from our <br></br>expert:
                        </p>
                        <div className='h-[51px] bg-[#85FFB2] flex justify-center items-center rounded-full mt-3'
                           onClick={handleUploadClick}>
                           <img src={WhatsappOutline} alt='whatsapp' className='mr-2.5 text-[#1B7B1A]' /> submit via WhatsApp
                        </div>
                        {/* <div className='border-2 border-primary border-dashed w-full max-w-[300px] h-[119px] px-4 flex justify-center items-center mt-4 rounded-3xl opacity-70 mx-auto sm:mx-0'>
                           <img src={UploadIcon}
                              className='mr-3 cursor-pointer'
                              alt='UploadIcon'
                              onClick={handleUploadClick} />
                           <p className='font-semibold' > Upload your work </p>
                           <input type='file' className='hidden' ref={inputRef}
                              onChange={e => handleUpload(e)} />
                        </div> */}
                     </div> :
                     <div className='mb-12'>
                        <p className='font-medium sm:text-lg sm:font-semibold mb-4' >
                           Want to submit more?
                        </p>
                        <SecondaryButton className='w-full pt-2.5 flex items-center justify-center pb-2.5 px-3 h-[40px] max-w-[320px]'
                           onClick={handleUploadClick}
                           children={
                              <> <img src={UploadOutlineIcon} className='mr-3'
                              /> Upload
                                 <input type='file' className='hidden' ref={inputRef}
                                    onChange={e => handleUpload(e)} />
                              </>
                           } />
                     </div>
               }

            </div>

            {
               submissions.length > 0 &&
               <div className='px-4 py-5 bg-[#e6faff] sm:px-20'>
                  <h4 className='text-xl font-semibold mb-5'> Your submissions </h4>

                  <div className='relative sm:grid sm:grid-cols-1  sm:justify-center sm:items-center sm:content-center sm:w-full sm:mx-auto md:hidden'>
                     <div className={`${styles.slider} sm:shadow-xl mb-0 overflow-hidden sm:w-[322px] mx-auto`}>
                        {submissions.map((sub, idx) => {
                           return <Feedback key={sub.id} {...sub}
                              currentIndex={currentIndex}
                              idx={idx}
                              onView={onView}
                              onDelete={onDelete} />
                        })}
                     </div>
                     <img src={NextIcon} className={`${styles.nextIcon} sm:hdden`} alt='' onClick={increaseIndex} />
                  </div>

                  <div className='relative sm:grid sm:grid-cols-1 sm:justify-center sm:items-center sm:content-center sm:w-full sm:mx-auto hidden md:block'>
                     <Slider {...settings} className='w-full h-[480px] max-w-[800px] mx-auto' >


                        {submissions.map((sub, idx) => {
                           return <div className='px-10'>
                              <Feedback key={sub.id} {...sub}
                                 notAbsolute={true}
                                 currentIndex={currentIndex}
                                 idx={idx}
                                 onView={onView}
                                 onDelete={onDelete} />
                           </div>
                        })}

                     </Slider>
                     {/* <img src={NextIcon} className={`${styles.nextIcon} sm:hdden`} alt='' onClick={increaseIndex} /> */}
                  </div>


               </div>
            }

            <div className='border-b border-lightGray w-full opacity-20'> </div>
            <div className='mt-10 px-4'>
               {/* <ActivityContent /> */}
               <h4 className='font-bold text-xl mt-8 sm:mx-20'>
                  Next Assignments
               </h4>

               <div className='mt-5 lg:grid lg:grid-cols-3 2xl:grid-cols-4 sm:mx-[60px] '>
               <div className='lg:max-w-[350px]'>
              {assignments.map(assignment => {
                return <SingleAssignment key={assignment.id} {...assignment}
                  onClickAssignment={onClickAssignment}
                   />
              })}
            </div>
               </div>
            </div>
         </div>

         {
            viewSubModal &&
            <ViewSubmission handleClose={() => setViewSubModal(false)}
               source={sourceToView} />
         }
      </>
   )
}