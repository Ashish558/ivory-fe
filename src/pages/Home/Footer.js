import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import activity2 from '../../assets/icons/activeActivities.svg';
import community2 from '../../assets/icons/community.svg';
import home2 from '../../assets/icons/home2.svg';
import videoIcon from '../../assets/icons/videoIcon.svg';
import activity from '../../Images/Activities.png';
import community from '../../Images/Community.png';
import home from '../../Images/Home.png';

import learn from '../../Images/Learn.png';
import '../Home/Footer.css';


const toExclude = ['/login','/otp','/signup','/congrates','/dob','/','/logolanding','/four','/third','/second','/landing','/confirmation','/live','/enroll','/community','/']

const Footer = () => {

   const navigate = useNavigate()
   const location = useLocation()

   if (toExclude.includes(location.pathname)) return <></>

   let currentPath = `/${location.pathname.split('/')[1]}`
   // console.log(currentPath);
   return (
      <div className='pt-3 mt-6 footer-bg px-3 pb-3 lg:hidden'>
         <div className='flex justify-around'>
            <div className='flex flex-col cursor-pointer justify-around items-center'
               onClick={() => navigate('/home')}>
               <p>
                  {currentPath === '/home' ? <img className='icon-bg '
                     src={home} alt="" /> : <img className={`icon-bg-2`}
                        src={home2} alt="" />
                  }


               </p>
               <p className={`text-base pt-0 ${currentPath === '/home' ? 'font-bold' : ''} `}>Home</p>
            </div>

            <div className='flex flex-col cursor-pointer justify-between items-center'
               onClick={() => navigate('/activities')} >
               <p>
                  {currentPath === '/activities' ? <img className='icon-bg '
                     src={activity2} alt="" /> : <img className={`icon-bg-2`}
                        src={activity} alt="" />
                  }

               </p>
               <p className={`text-base pt-0 ${currentPath === '/activities' ? 'font-bold' : ''} `}>Activities</p>
            </div>
            <div className='flex flex-col cursor-pointer justify-between items-center'
               onClick={() => navigate('/learn')}>
               <p>
                  {currentPath === '/learn' ? <img className='icon-bg '
                     src={videoIcon} alt="" /> : <img className={`icon-bg-2`}
                        src={learn} alt="" />
                  }
               </p>
               <p className={`text-base pt-0 ${currentPath === '/learn' ? 'font-bold' : ''} `}>Learn</p>
            </div>
            <div className='flex flex-col cursor-pointer justify-between items-center relative'>

               <p>
                  {currentPath === '/community' ? <img className='icon-bg '
                     src={community2} alt="" /> : <img className={`icon-bg-2`}
                        src={community} alt="" />
                  }

               </p>
               <div className='count flex items-center justify-center'>
                  <p> 3</p>
               </div>
               <p className={`text-base pt-0 ${currentPath === '/community' ? 'font-bold' : ''} `}>Community</p>
            </div>
         </div>
      </div>
   );
};

export default Footer;