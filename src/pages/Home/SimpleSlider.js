import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import '../Home/SimpleSlider.css'
import Image from '../../Images/image 16.png';
import Image1 from '../../Images/Frame 554.png'
import { getBanners } from "../../services/banners";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const SimpleSlider = () => {

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
            if (res.data.data === null) return
            let homeBanners = res.data.data.filter(item => item.location_link === location.pathname)
            setBanners(homeBanners)
         })
   }, [location.pathname])

   const handleNavigate = banner => {
      console.log('banner', banner);
      window.open(banner.redirect_link)
   }
   // console.log('banners', banners);

   return (
      <div className="mt-6">
         <Slider {...settings}>
            {
               banners.map(banner => {
                  return (
                     <div  onClick={() => handleNavigate(banner)}>
                        <div className="slider-bg mx-4">
                           <div style={{ height: '140px', margin: "0 auto" }}
                              className="flex justify-between items-center mx px-4 py-2 overflow-hidden">
                              <div className="flex flex-1 items-center self-stretch overflow-hidden">
                                 <img className="rounded-2xl w-full h-full object-cover"
                                  src={banner.image} alt="" />
                                 <p className="play bg-black rounded-full"></p>
                              </div>
                              <div className="flex flex-1 items-center pl-2">
                                 <div style={{ fontWeight: '700' }} className=" text-xl ">
                                    <p>
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

            {/* <div>
               <div className="slider-bg mx-4">

                  <div style={{ height: '140px', margin: "0 auto" }} className="grid grid-cols-2 mx">
                     <div className="flex items-center pl-6">
                        <div className="banner">
                           <img className="rounded-2xl " src={Image} alt="" />
                           <p className="play bg-black rounded-full"></p>
                        </div>
                     </div>
                     <div className="flex items-center pl-2">
                        <div style={{ fontWeight: '700' }} className=" text-xl ">
                           <p >Learn how</p>
                           <p>to use Ivory</p>
                           <p>app</p></div>
                     </div>
                  </div>

               </div>
            </div>
            <div>
               <div className="slider-bg mx-4">

                  <div style={{ height: '140px', margin: "0 auto" }} className="grid grid-cols-2 mx">
                     <div className="flex items-center pl-6">
                        <div className="banner">
                           <img className="rounded-2xl " src={Image} alt="" />
                           <p className="play bg-black rounded-full"></p>
                        </div>
                     </div>
                     <div className="flex items-center pl-2">
                        <div style={{ fontWeight: '700' }} className=" text-xl ">
                           <p >Learn how</p>
                           <p>to use Ivory</p>
                           <p>app</p></div>
                     </div>
                  </div>

               </div>
            </div> */}

         </Slider>
      </div>
   );
};



export default SimpleSlider;