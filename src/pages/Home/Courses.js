import React, { useEffect, useState } from 'react';
import Banner1 from '../../Images/Canva.png'
import Banner2 from '../../Images/Laptop.png'
import './Courses.css'
import Star from '../../Images/star.png'
import { useNavigate } from 'react-router-dom';
import { getPrograms } from '../../services/program';
import { getPricingDiscountedText, getPricingMainText } from '../../utils/utils';

const Courses = () => {

   const courses = [
      {
         name: 'Learn to CANVA',
         author: 'Ankit dua',
         banner: Banner1,
         stars: '3',
         price: '399',

      },
      {
         name: 'Learn using a laptop',
         author: 'Ritu Shreshtha',
         banner: Banner2,
         stars: '4',
         price: '199',
         discount: '499'
      }
   ]

   const [allPrograms, setAllPrograms] = useState([])

   const navigate = useNavigate()

   useEffect(() => {
      getPrograms()
         .then(res => {
            if (res.data.data === null) return setAllPrograms([])
            // console.log('programs', res.data.data);
            setAllPrograms(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   }, [])

   const handleNavigate = (id) => {
      navigate(`/learn/${id}`)
   }

   return (
      <div className='pt-8'>
         <h1 className='text-xl font-black pl-4 '>Learn with Ivory</h1>
         {
            allPrograms.map(program => {
               const { id, myPrograms, image, name, live_sessions_count, modules_duration, price, discounted_price, isUserProgram, userProgramId, is_completed, percentage_completed, is_live, is_free, discount } = program
               return (
                  <div className="m-4 box"  onClick={() => handleNavigate(id)}>
                     <div className='flex align-items '>
                        <div className='p-1.5 self-stretch'>
                           <img className='rounded-3xl w-[129px] object-cover h-full' src={image} alt="Program" />
                        </div>
                        <div className="pt-4 pl-2">
                           <h2 className="text-base font-semibold">
                              {name}
                           </h2>
                           <p className='text-xs small-text'>
                              {'Author name'}
                           </p>

                           <div className='flex'>
                              <h2 className='price pt-6'>
                                 {getPricingMainText(is_free, price, discounted_price, discount)}
                              </h2>
                              {
                                 getPricingDiscountedText(is_free, price, discounted_price, discount)
                              }
                           </div>
                        </div>
                     </div>
                  </div>
               )
            }
            )
         }

      </div>
   );
};

export default Courses;