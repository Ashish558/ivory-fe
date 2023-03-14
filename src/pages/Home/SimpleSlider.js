import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import '../Home/SimpleSlider.css'
import Image from '../../Images/image 16.png';
import Image1 from '../../Images/Frame 554.png'
import { getBanners } from "../../services/banners";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ViewVideo } from "../Frames/ViewVideo.js/ViewVideo";
import { GA_bannerClick } from "../../services/analytics";


const SimpleSlider = ({ banners, isActivityBanner, page }) => {

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

   const handleNavigate = banner => {
      // console.log('banner', banner);
      GA_bannerClick(page ? page : 'home_page', banner.title)
      if (banner.is_external === false) {
         navigate(banner.redirect_link)
      } else {
         window.open(banner.redirect_link)
      }
   }
   // console.log('banners', banners);

   return (
      <>
         <div className="mt-6 lg:mb-[90px] mb-14">
            <Slider {...settings}>
               {
                  banners.map(banner => {
                     return (
                        <div onClick={() => handleNavigate(banner)}>
                           <div className={`slider-bg ${!isActivityBanner ? 'mx-4' : ''}`}>
                              <div style={{ height: '140px', margin: "0 auto" }}
                                 className="flex rounded-3xl justify-between items-end mx px-4 py-2 overflow-hidden relative z-10 banner-container">
                                 {/* <div className="flex flex-1 items-center self-stretch relative overflow-hidden"> */}
                                 <img className="rounded-2xl w-full slider-bg-image h-full object-cover"
                                    src={banner.image} alt="Banner_Image" />
                                 {/* </div> */}
                                 <div className="flex flex-1 items-start text-white pl-2 relative z-20">
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
            <ViewVideo handleClose={() => setVideoActive(false)} />
         }
      </>
   );
};



export default SimpleSlider;