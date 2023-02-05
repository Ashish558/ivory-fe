import React, { useState } from 'react';
import Logo from '../../../Images/ivory logo dark 1.png';
import User from '../../../Images/profile-pic-1.png';
import './NavbarDesktop.css';


import edit from '../../../Images/edit.png';
import play from '../../../Images/how.png';
import programs from '../../../Images/programs.png';
import activities from '../../../Images/activities(1).png'
import sessions from '../../../Images/sessions.png'
import contact from '../../../Images/contact.png'
import exit from '../../../Images/exit.png';
import faq from '../../../Images/faq.png'
import cross from '../../../Images/cross.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoggedIn, updateProfileData } from '../../../redux/slices/user';


const toExclude = ['/login', '/otp', '/signup', '/congrates', '/dob', '/', '/logolanding', '/four', '/third', '/second', '/landing']

const NavbarDesktop = () => {

   const navigate = useNavigate()
   const location = useLocation()
   const dispatch = useDispatch()
   const { loggedIn, profileData } = useSelector(state => state.user)
   if (toExclude.includes(location.pathname)) return <></>

   const handleLogout = () => {
      if (loggedIn) {

         localStorage.clear()
         dispatch(updateLoggedIn({ loggedIn: false }))
         dispatch(updateProfileData({ profileData: {} }))
         navigate('/home')
         window.location.reload()
      }
   }

   let currentPath = `/${location.pathname.split('/')[1]}`
   const handleSidebar = () => {
      const elem = document.activeElement;
      if (elem) {
         elem?.blur();
      }
   }


   return (
      <div class="navbar-desktop  navbar bg-base-100">
         <div class="navbar-start flex justify-between font-medium">
            <div class="pl-28">
               <p><img src={Logo} alt="" /></p>
            </div>


            <div className='px-4 py-1.5 transition hover:bg-secondary rounded-lg'>
               <a href='/home'>
                  Home
               </a>
            </div>
            <div className='px-4 py-1.5 transition hover:bg-secondary rounded-lg'>
               <a href='/activities'>
                  Activities
               </a>
            </div>
            <div className='px-4 py-1.5 transition hover:bg-secondary rounded-lg'>
               <a href=' '>
                  Learn
               </a>
            </div>
            <div className='px-4 py-1.5 transition hover:bg-secondary rounded-lg'>
               <a href=' '>
                  Community
               </a>
            </div>


         </div>

         <div class="navbar-end pr-28">

            <div className=' dropdown  dropdown-end '>
               <label tabindex="0" className='cursor-pointer'>
                  {
                     loggedIn &&
                     <p ><img width="34px" height="34px" src={profileData.profile_picture ? profileData.profile_picture : User} alt="" /></p>
                  }
               </label>
               <ul tabindex="0" class="sidebar menu dropdown-content p-2 shadow bg-base-100 rounded-box mt-4 " >
                  <div className='pt-6'>

                     <div className='flex justify-between'>
                        {
                           loggedIn &&
                           <p className='pl-11'>
                              <img src={profileData.profile_picture ? profileData.profile_picture : User} width="48px" alt="" />
                           </p>
                        }

                        <p onClick={handleSidebar} className='pr-7'><img className='cursor-pointer' src={cross} alt="" />
                        </p>

                     </div>
                     <p className='font-semibold text-sm pl-6 pt-2'>
                        {profileData.name ? profileData.name : ''}
                        <span className='text-xs font-normal'>, user created  JUL 22</span></p>
                  </div>
                  <div className='border mt-5 p-0'></div>

                  <div className='flex  justify-between px-4 pt-10'>
                     <div>
                        <div className='flex  items-center cursor-pointer'>
                           <p onClick={handleSidebar}><img src={edit} alt="" /></p>
                           <p className='text-sm font-semibold pl-4' onClick={() => navigate('/CreateProfile')} > Edit Profile</p>
                        </div>
                        <div className='flex  items-center pt-9 cursor-pointer'>
                           <p onClick={handleSidebar}><img src={play} alt="" /></p>
                           <p className='text-sm font-semibold pl-4'> How to use app</p>
                        </div>

                        <div className='flex  items-center pt-9 cursor-pointer'>
                           <p onClick={handleSidebar}><img src={programs} alt="" /></p>
                           <p className='text-sm font-semibold pl-4'> My Programs</p>
                        </div>

                        <div className='flex  items-center pt-9 cursor-pointer' onClick={() => navigate('/activities')}>
                           <p onClick={handleSidebar}><img src={activities} alt="" /></p>
                           <p className='text-sm font-semibold pl-4'> My Activities</p>
                        </div>
                        <div className='flex  items-center pt-9 cursor-pointer'>
                           <p onClick={handleSidebar}><img src={sessions} alt="" /></p>
                           <p className='text-sm font-semibold pl-4'> My Live Sessions</p>
                        </div>


                     </div>


                     <div className=''>

                        <div className='flex  items-center cursor-pointer'
                           onClick={() => { handleLogout(); handleSidebar() }} >
                           <p onClick={handleSidebar}><img src={exit} alt="" /></p>
                           <p className='text-sm font-semibold pl-4'> My Sign out</p>
                        </div>
                        <div className='flex  items-center pt-9 cursor-pointer'>
                           <p onClick={handleSidebar}><img src={faq} alt="" /></p>
                           <p className='text-sm font-semibold pl-4'> My FAQ</p>
                        </div>
                        <div className='flex  items-center pt-9 cursor-pointer'>
                           <p onClick={handleSidebar}><img src={contact} alt="" /></p>
                           <p className='text-sm font-semibold pl-4'> My Contact us</p>
                        </div>




                     </div>
                  </div>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default NavbarDesktop;