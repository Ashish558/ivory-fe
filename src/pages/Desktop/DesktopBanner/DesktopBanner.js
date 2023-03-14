import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import BannerDesktop from '../../../Images/bannerPic.jpg';
import Download from '../../../Images/Group 5.png'
import { GA_bannerClick } from '../../../services/analytics';
import { getHomeBanners } from '../../../services/banners';
import { ViewVideo } from '../../Frames/ViewVideo.js/ViewVideo';
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
   const [videoActive, setVideoActive] = useState(false)
   const [videoLink, setVideoLink] = useState('')
   const { loggedIn, profileData } = useSelector(state => state.user)

   useEffect(() => {
      getHomeBanners()
         .then(res => {
            console.log('banners resp', res.data.data);
            let tempbanners = res.data.data
            tempbanners = tempbanners.map(banner => {
               if (banner.title === "Complete your Profile!" && profileData?.intrests?.length > 0) {
                  return
               } else {
                  return banner
               }
            }).filter(item => item !== undefined)
            // let homeBanners = res.data.data.filter(item => item.location_link === location.pathname)
            setBanners(tempbanners)
         })
   }, [location.pathname])


   const handleNavigate = banner => {
      setVideoLink(banner.video_link)
      GA_bannerClick('home_page', banner.title)
      if (banner.title === "Complete your Profile!") {
         if (!loggedIn) {
            return navigate('/login')
         } else {
            return navigate('/CreateProfile')
         }
      }
      if (banner.video_link) {
         setVideoActive(true)
      }
   }

   return (
      <>
         <div className='container-banner min-h-[700px] pt-20  lg:mb-[90px] mb-14'>
            <Slider {...settings}>
               {
                  banners.map((banner, idx) => {
                     return (
                        <div onClick={() => handleNavigate(banner)} >
                           <div className='flex items-center justify-around'>
                              <div>
                                 {
                                    idx === 0 &&
                                    <div onClick={(e) => { e.stopPropagation(); window.open('https://play.google.com/store/apps/details?id=io.ionic.ivoryapp&hl=en-US&ah=oZ8nR0yAxnh9MZJ8mK76K67bD5Q') }}
                                       className='cursor-pointer'>
                                       <img src={Download} alt="Download" />
                                    </div>
                                 }
                                 <h1 className='big-text'> {banner.title}  </h1>
                                 {/* <h1 className='big-text'>to unlock free activities</h1> */}
                                 <div className='pt-9'>
                                    <p> {banner.sub_title} </p>
                                    {/* <p>  Become a master at painting and writing with our fun and engaging app!</p> */}
                                 </div>
                              </div>
                              <div>
                                 <p> <img className='banner-pic' src={banner.image} alt="banner-pic" /></p>
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
         {
            videoActive &&
            <ViewVideo handleClose={() => setVideoActive(false)} source={videoLink} />
         }
      </>
   );
};

export default DesktopBanner;