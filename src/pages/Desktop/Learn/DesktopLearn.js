import React from 'react';
import Slider from 'react-slick';
import Arrow from '../../../Images/Icon.png';
import './DesktopLearn.css';
import Learn1 from '../../../Images/Learn/Learn (1).png';
import Learn2 from '../../../Images/Learn/Learn (2).png';
import Learn3 from '../../../Images/Learn/Learn (3).png';
import Learn4 from '../../../Images/Learn/Learn (4).png';
import Star from '../../../Images/Learn/Star.png'
import { getPrograms } from '../../../services/program';
import { useEffect } from 'react';
import { useState } from 'react';
import { getFormattedDuration, getPricingDiscountedText, getPricingMainText } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';



const DesktopLearn = () => {
   const settings = {
      infinite: false,
      centerPadding: "60px",
      slidesToShow: 3,
      initialSlide: 0,
      arrows: false,
      swipeToSlide: true,
      initialSlide: 0,
      responsive: [
         {
            breakpoint: 1300,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 2.5,
            },

         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2.5,
            },
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2.3,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1.5,
            },
         }
      ],
      afterChange: function (index) {
         console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
         );
      }
   };

   const [allPrograms, setAllPrograms] = useState([])

   const navigate = useNavigate()

   useEffect(() => {
      getPrograms()
         .then(res => {
            if (res.data.data === null) return setAllPrograms([])
            console.log('programs', res.data.data);
            setAllPrograms(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   }, [])

   const handleNavigate = (id) => {
      navigate(`/learn/${id}`)
   }

   return (
      <div className='pt-10 pb-40'>
         <div style={{ marginTop: '88px' }} className='ml-24'>
            <div className=' flex items-center mb-20'>
               <h1 className='text-5xl  font-semibold cursor-pointer' onClick={() => navigate('/learn')}>
                  Learn with Ivory
               </h1>
               <p className='pl-7 cursor-pointer' onClick={() => navigate('/learn')}  >
                  <img src={Arrow} alt="" />
               </p>
            </div>


            <Slider {...settings}>
               {
                  allPrograms.map(program => {
                     const { id, myPrograms, image, name, live_sessions_count, modules_duration, price, discounted_price, isUserProgram, userProgramId, is_completed, percentage_completed, is_live, is_free, discount } = program
                     return (
                        <div onClick={() => handleNavigate(id)}>
                           <div class="card custom-card-learn  cursor-pointer">
                              <figure><img className='w-full object-cover h-[214px]' src={image} alt="Shoes" /></figure>
                              <div class="px-4">
                                 <div>
                                    <p className='text-base font-bold position-Ivory'>
                                       {name}
                                    </p>
                                 </div>
                                 <div className='pt-4 flex items-center justify-between'>
                                    <div>
                                       <p style={{ color: '#6C7277' }} className='font-medium text-lg'>
                                          {getFormattedDuration(modules_duration)}
                                       </p>
                                    </div>
                                 </div>

                                 <h1 className='text-xl pt-3 font-semibold'>
                                    {name}
                                 </h1>
                                 <p className='pt-1'>
                                    Issac John
                                 </p>
                                 <div className='pt-9  pb-4 '>
                                    <p className='price-learn  text-right'>
                                       {getPricingMainText(is_free, price, discounted_price, discount)}
                                       <span className='pl-1 discount-learn text-right'>
                                          {getPricingDiscountedText(is_free, price, discounted_price, discount
                                          )}
                                       </span></p>

                                 </div>
                              </div>
                           </div>
                        </div>

                     )
                  })
               }

            </Slider>
         </div>
      </div>

   );
};

export default DesktopLearn;