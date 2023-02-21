import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import BannerDesktop from '../../../Images/bannerPic.jpg';
import Download from '../../../Images/Group 5.png'
import { getBanners } from '../../../services/banners';
import './DesktopBanner.css'


const DesktopBanner = () => {

   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
   };

   const location = useLocation()
   const navigate = useNavigate()
   const [banners, setBanners] = useState([])

   useEffect(() => {
      getBanners()
         .then(res => {
            console.log( res.data.data);
            if (res.data.data === null) return
            let homeBanners = res.data.data.filter(item => item.location_link === location.pathname)
            setBanners(homeBanners)
         })
   }, [location.pathname])

   const handleNavigate = banner => {
      // console.log('banner', banner);
      window.open(banner.redirect_link)

   }
   console.log('banners', banners);

   return (
      <div className='container-banner pt-20  lg:mb-[90px] mb-14'>

         <Slider {...settings}>
            {
               banners.map(banner => {
                  return (
                     <div onClick={() => handleNavigate(banner)} >
                        <div className='flex items-center justify-around'>
                           <div>
                              <p><img src={Download} alt="" /></p>
                              <h1 className='big-text'>Download our app  </h1>
                              <h1 className='big-text'>to unlock free activities</h1>
                              <div className='pt-9'>
                                 <p>Unlock your full potential and have a blast doing it with Ivory.</p>
                                 <p>  Become a master at painting and writing with our fun and engaging app!</p>
                              </div>
                           </div>
                           <div>
                              <p> <img className='banner-pic' src={banner.image} alt="" /></p>
                           </div>
                        </div>
                        <div className='blur-img'>

                        </div>
                     </div>
                  )
               })
            }



         </Slider>
      </div>
   );
};

export default DesktopBanner;