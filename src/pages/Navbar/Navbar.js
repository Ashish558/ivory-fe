import React, { useState } from 'react';
import Logo from '../../Images/形状.png';
import User from '../../Images/profile-pic.png';
import ProfilePic from '../../Images/profile-pic-1.png';
import './Navbar.css';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import edit from '../../Images/edit.png';
import play from '../../Images/how.png';
import programs from '../../Images/programs.png';
import activities from '../../Images/activities(1).png'
import sessions from '../../Images/sessions.png'
import contact from '../../Images/contact.png'
import exit from '../../Images/exit.png';
import faq from '../../Images/faq.png'
import cross from '../../Images/cross.png'
import BackIcon from '../../assets/icons/go-back.svg'

import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const toExclude = ['/login', '/otp','/dob', '/signup', '/congrates', '/', '/CreateProfile','/logolanding','/four','/third','/second','/landing']
const basePaths = ['/home', '/activities']

const Navbar = () => {

   const [isOpen, setIsOpen] = React.useState(false)
   const navigate = useNavigate()
   const location = useLocation()
   const { loggedIn, profileData } = useSelector(state => state.user)

   const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
   }

   if (toExclude.includes(location.pathname)) return <></>

   return (
      <div class="navbar background flex py-4 px-3 items-center lg:hidden">
         <div class="flex-1">

            {
               basePaths.includes(location.pathname) ?

                  <div className="flex items-center normal-case text-lg  welcome-color">
                     <p className='pr-1 pl-2'>   <img src={Logo} alt="" /></p>
                     <p className=' font-bold text-sm'>Welcome,</p>
                     <p className='pl-2  name text-sm'>Sahil</p>
                  </div> :
                  <img src={BackIcon} alt='back' className='p-2 cursor-pointer'
                     onClick={() => navigate(-1)} />
            }

         </div>

         <div class="flex-none gap-2">
            <button className='flex'>
               <div onClick={toggleDrawer} class="w-8 rounded-full flex">
                  <img src={profileData.profile_picture ? profileData.profile_picture :User} alt='' />
               </div>
            </button>

         </div>
         <Drawer open={isOpen} onClose={toggleDrawer} size="85vw" direction='right'>
            <div className='drawer-content pt-8 px-5'>


               <div className='flex justify-between'>
                  <p className=''>
                     <img src={profileData.profile_picture ? profileData.profile_picture :ProfilePic} alt="" className='w-12 h-12 object-cover rounded-full' />
                     </p>
                  <button onClick={toggleDrawer} className='mb-6 p-0'><img src={cross} alt="" /></button>
               </div>
               <p className='text-sm font-semibold pt-2'>Sahil Wadhwa</p>
               <p className='text-xs'>user created  JUL 22</p>
               <div className='line mt-6' height="1px"></div>
               <div className='mt-7'>

                  <div className='flex items-center cursor-pointer' onClick={() => navigate('/CreateProfile')} >
                     <p><img src={edit} alt="" /></p>
                     <p className='text-sm font-semibold pl-4'>Edit Profile</p>
                  </div>
                  <div className='flex items-center cursor-pointer mt-7'>
                     <p><img src={play} alt="" /></p>
                     <p className='text-sm font-semibold pl-4'>How to use app</p>
                  </div>
                  <div className='flex items-center cursor-pointer mt-7'>
                     <p><img src={programs} alt="" /></p>
                     <p className='text-sm font-semibold pl-4'>My Programs</p>
                  </div>
                  <div className='flex items-center cursor-pointer mt-7'>
                     <p><img src={activities} alt="" /></p>
                     <p className='text-sm font-semibold pl-4'>Activities</p>
                  </div>
                  <div className='flex items-center cursor-pointer mt-7'>
                     <p><img src={sessions} alt="" /></p>
                     <p className='text-sm font-semibold pl-4'>Live Sessions</p>
                  </div>

                  <div className='boundary-margin-top'>
                     <div className='flex items-center cursor-pointer'>
                        <p><img src={exit} alt="" /></p>
                        <p className='text-sm font-semibold pl-4'>Sign out</p>
                     </div>
                     <div className='flex items-center cursor-pointer mt-7'>
                        <p><img src={faq} alt="" /></p>
                        <p className='text-sm font-semibold pl-4 contact-color'>FAQ</p>
                     </div>
                     <div className='flex items-center cursor-pointer mt-7'>
                        <p><img src={contact} alt="" /></p>
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