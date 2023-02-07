import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import activity from '../../Images/Activities.png';
import community from '../../Images/Community.png';
import home from '../../Images/Home.png';
import learn from '../../Images/Learn.png';
import '../Home/Footer.css';


const toExclude = ['/login','/otp','/signup','/congrates','/dob','/','/logolanding','/four','/third','/second','/landing']

const Footer = () => {

   const navigate = useNavigate()
   const location = useLocation()

   if (toExclude.includes(location.pathname)) return <></>

   let currentPath = `/${location.pathname.split('/')[1]}`
   // console.log(currentPath);
   return (
      <div className='pt-4 mt-6 footer-bg px-3 pb-3 lg:hidden'>
         <div className='flex justify-around'>
            <div className='flex flex-col cursor-pointer justify-around items-center'
               onClick={() => navigate('/home')}>
               <p>
                  <img className={`${currentPath === '/home' ? 'icon-bg' : 'icon-bg-2'}`}
                     src={home} alt="" />
               </p>
               <p className='text-base pt-2.5'>Home</p>
            </div>

            <div className='flex flex-col cursor-pointer justify-center items-center'
               onClick={() => navigate('/activities')} >
               <p>
                  <img className={`${currentPath === '/activities' ? 'icon-bg' : 'icon-bg-2'}`}
                     src={activity} alt="" />
               </p>
               <p className='text-base pt-3'>Activities</p>
            </div>
            <div className='flex flex-col cursor-pointer justify-center items-center'>
               <p>
                  <img className={`${currentPath === '/learn' ? 'icon-bg' : 'icon-bg-2'}`}
                     src={learn} alt="" /></p>
               <p className='text-base pt-1.5'>Learn</p>
            </div>
            <div className='flex flex-col cursor-pointer justify-center items-center relative'>

               <p>
                  <img className={`${currentPath === '/community' ? 'icon-bg' : 'icon-bg-2'}`}
                     src={community} alt="" />
               </p>
               <div className='count flex items-center justify-center'>
                  <p> 3</p>
               </div>
               <p className='text-base pt-2'>Community</p>
            </div>
         </div>
      </div>
   );
};

export default Footer;