import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import './SimpleSlider.css'
import Image from '../../Images/image 16.png';
import Image1 from '../../Images/Frame 554.png'
import EditProfileIcon from '../../Images/edit-profile.svg'
import { getBanners } from "../../services/banners";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ViewVideo } from "../../pages/Frames/ViewVideo.js/ViewVideo";
import { useSelector } from "react-redux";
import { GA_bannerClick } from "../../services/analytics";


const SliderCards = ({ banners, isActivityBanner, page }) => {

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
   const [videoActive, setVideoActive] = useState(false)
   const [videoLink, setVideoLink] = useState('')
   const { loggedIn, profileData } = useSelector(state => state.user)

   const handleNavigate = banner => {
      setVideoLink(banner.video_link)
      GA_bannerClick( page ? page :'home_page', banner.title)
      if (banner.title === "Complete your Profile!") {
         if(!loggedIn){
            return navigate('/login')
         }else{
            return navigate('/CreateProfile')
         }
      }
      if (banner.video_link) {
         setVideoActive(true)
      }
   }

   return (
      <>
         <div className="mt-6 lg:mb-[90px] mb-14">
            <Slider {...settings}>
               {
                  banners.map((banner, idx) => {
                     return (
                        <div onClick={() => handleNavigate(banner)}>
                           <div className={`slider-bg ${!isActivityBanner ? 'mx-4' : ''}`}>
                              <div style={{ height: '140px', margin: "0 auto" }}
                                 className="flex rounded-3xl justify-between items-end mx px-4 py-2 overflow-hidden relative z-10 banner-container">
                                 {/* <div className="flex flex-1 items-center self-stretch relative overflow-hidden"> */}
                                 <img className={`rounded-2xl w-full slider-bg-image h-full object-cover `}
                                    src={banner.image} alt="" />
                                 {/* </div> */}
                                 <div className="flex flex-1 items-start text-white pl-2 relative z-20 mb-1">
                                    
                                    <p className="play bg-black rounded-full mr-2 mt-1"></p>
                                    <div className=" text-xl font-bold">
                                       <p className="leading-normal">
                                          {banner.title}
                                       </p>
                                    </div>
                                 </div>
                              </div>
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



export default SliderCards;