import React, { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import BackIcon from '../../assets/icons/go-back.svg';
import activities from '../../Images/activities(1).png';
import contact from '../../Images/contact.png';
import cross from '../../Images/cross.png';
import edit from '../../Images/edit.png';
import exit from '../../Images/exit.png';
import faq from '../../Images/faq.png';
import play from '../../Images/how.png';
// import ProfilePic from '../../Images/profile-pic-1.jfif';
import User from '../../Images/profile-pic.jfif';
import programs from '../../Images/programs.png';
import sessions from '../../Images/sessions.png';
import Logo from '../../Images/形状.png';
import Evening from '../../Images/evening.svg';
import './Navbar.css';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateLoggedIn, updateProfileData } from '../../redux/slices/user';
import { getFormattedDateShort } from '../../utils/utils'

const toExclude = ['/login', '/otp', '/dob', '/signup', '/congrates', '/', '/CreateProfile', '/logolanding', '/four', '/third', '/second', '/landing', '/confirmation', '/live', '/enroll', '/community', '/learn']
const basePaths = ['/home', '/activities']

const singlePath = ['/live-events']

const Navbar = () => {

   const [isOpen, setIsOpen] = React.useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const location = useLocation()
   const { loggedIn, profileData } = useSelector(state => state.user)
   const [isMorning, setIsMorning] = useState(true)
   const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   useEffect(() => {
      let hours = new Date().getHours()
      // console.log(date.getHours());
      if (hours > 17) {
         setIsMorning(false)
      } else {
         setIsMorning(true)
      }
   }, [])
   const handleLogout = () => {
      if (loggedIn) {
         localStorage.clear()
         dispatch(updateLoggedIn({ loggedIn: false }))
         dispatch(updateProfileData({ profileData: {} }))
         navigate('/home')
         window.location.reload()
      }
   }
   if (toExclude.includes(location.pathname)) return <></>

   return (
      <div class="navbar background flex py-4 px-3 items-center lg:hidden">
         <div class="flex-1">

            {
               basePaths.includes(location.pathname) ?

                  <div className="flex items-center normal-case text-lg  welcome-color">
                     <p className='pr-1 pl-2'>
                        <img src={isMorning ? Logo : Evening} alt="Logo" />
                     </p>
                     {
                        loggedIn && isMorning === false ?
                           <div className=' font-bold text-sm ml-1'>
                              Good Evening,
                           </div> :
                           <p className=' font-bold text-sm'>Welcome {loggedIn && ","} </p>
                     }
                     <p className='pl-2  name text-sm'>   {profileData.name ? profileData.name : ''}</p>
                  </div> :

                  singlePath.includes(location.pathname) ?

                     <div className='flex items-center  w-full'>
                        <p> <img src={BackIcon} alt='back' className='p-2 cursor-pointer'
                           onClick={() => navigate(-1)} /></p>
                        <div className='mx-auto'>
                           <p className='font-bold'>Live Events</p>
                        </div>
                     </div>
                     :

                     <img src={BackIcon} alt='back' className='p-2 cursor-pointer'
                        onClick={() => navigate(-1)} />
            }

         </div>

         <div class="flex-none gap-2">
            {
               loggedIn &&
               <button className='flex'>
                  <div onClick={toggleDrawer} class="w-11 h-11 rounded-full flex">
                     <img src={profileData.profile_picture ? profileData.profile_picture : User} alt='profile_picture' className='w-full rounded-full object-cover' />
                  </div>
               </button>
            }
         </div>
         <Drawer open={isOpen} onClose={toggleDrawer} size="85vw" direction='right'>
            <div className='drawer-content pt-8 px-5 h-screen'>


               <div className='flex justify-between'>
                  <p className=''>
                     <img src={profileData.profile_picture ? profileData.profile_picture : User} alt="profile_picture" className='w-12 h-12 object-cover rounded-full' />
                  </p>
                  <button onClick={toggleDrawer} className='mb-6 p-0'><img src={cross} alt="cross" /></button>
               </div>
               <p className='text-sm font-semibold pt-2'>
                  {profileData.name ? profileData.name : ''}
               </p>
               <p className='text-xs'>user created  {getFormattedDateShort(profileData.date_joined)} </p>
               <div className='line mt-6' height="1px"></div>
               <div className='mt-7'>

                  <div className='flex items-center cursor-pointer'
                     onClick={() => { navigate('/CreateProfile'); toggleDrawer() }} >
                     <p><img src={edit} alt="edit" /></p>
                     <p className='text-sm font-semibold pl-4'>Edit Profile</p>
                  </div>
                  <div className='flex items-center cursor-pointer mt-7' onClick={toggleDrawer} >
                     <p><img src={play} alt="play" /></p>
                     <p className='text-sm font-semibold pl-4'>How to use app</p>
                  </div>
                  <div className='flex items-center cursor-pointer mt-7' onClick={toggleDrawer} >
                     <p><img src={programs} alt="programs" /></p>
                     <p className='text-sm font-semibold pl-4'>My Programs</p>
                  </div>
                  <div className='flex items-center cursor-pointer mt-7'
                     onClick={() => { navigate('/activities'); toggleDrawer() }}>
                     <p><img src={activities} alt="activities" /></p>
                     <p className='text-sm font-semibold pl-4' >
                        Activities
                     </p>
                  </div>
                  <div className='flex items-center cursor-pointer mt-7' onClick={toggleDrawer} >
                     <p><img src={sessions} alt="sessions" /></p>
                     <p className='text-sm font-semibold pl-4'>Live Sessions</p>
                  </div>

                  <div className='boundary-margin-top'>
                     <div className='flex items-center cursor-pointer' onClick={toggleDrawer} >
                        <p><img src={exit} alt="exit" /></p>
                        <p className='text-sm font-semibold pl-4' onClick={handleLogout} >Sign out</p>
                     </div>
                     <div className='flex items-center cursor-pointer mt-7' onClick={toggleDrawer} >
                        <p><img src={faq} alt="faq" /></p>
                        <p className='text-sm font-semibold pl-4 contact-color'>FAQ</p>
                     </div>
                     <div className='flex items-center cursor-pointer mt-7' onClick={toggleDrawer} >
                        <p><img src={contact} alt="contact" /></p>
                        <p className='text-sm font-semibold pl-4 contact-color'>Contact us</p>
                     </div>
                     <p className='text-xs text-center pb-5 pt-8'>IVORY V1.01 </p>
                  </div>

               </div>


            </div>
         </Drawer>
      </div>
   );
};

export default Navbar;