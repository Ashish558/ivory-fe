import React, { useEffect, useState } from 'react';
import Arrow from '../../Images/Icon.png';
import Logo1 from '../../Images/形状 (1).png'
import Logo2 from '../../Images/形状 (2).png'
import Logo3 from '../../Images/形状 (3).png'
import Logo4 from '../../Images/形状 (4).png'
import Logo5 from '../../Images/形状 (5).png'
import Logo6 from '../../Images/形状 (6).png'
import Logo7 from '../../Images/形状 (7).png'
import Logo8 from '../../Images/形状 (8).png'
import '../Home/Activities.css'
import SeeLogo from '../../Images/Group.png'
import { getCategories } from '../../services/activities';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';


const Activities = () => {

   const [activities, setActivities] = useState([])
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)

   const tempactivities = [
      {
         id: '1',
         name: 'Acrylic Painting',
         img: Logo1,
         color: '#26A925'
      },
      {
         id: '2',
         name: 'Splatter Painting',
         img: Logo2,
         color: '#7B34FB'
      },
      {
         id: '3',
         name: 'Water Colors',
         img: Logo3,
         color: '#7B34FB'
      },
      {
         id: '4',
         name: 'Water Colors',
         img: Logo4,
         color: '#F28400'
      },
      {
         id: '5',
         name: 'Acrylic Painting',
         img: Logo5,
         color: '#7B34FB'
      },
      {
         id: '6',
         name: 'Splatter Painting',
         img: Logo6,
         color: '#26A925'
      },
      {
         id: '7',
         name: 'Acrylic Painting',
         img: Logo7,
         color: '#26A925'
      },
      {
         id: '8',
         name: 'Splatter Painting',
         img: Logo8,
         color: '#7B34FB'
      },

   ]

   useEffect(() => {
      setLoading(true)
      getCategories()
         .then(res => {
            setLoading(false)
            // console.log('categories', res.data.data);
            if (res.data.data === null) return
            let data = res.data.data.filter(item => item.is_recommended === true)
            setActivities(data)
            const actCategories = {
               timestamp: new Date(),
               data: data
            }
            localStorage.setItem('actCategories', JSON.stringify(actCategories))
            // console.log(' updated', tempActivities);
         }).catch(err => {
            console.log(err.response);
            setLoading(false)
         })
   }, [])

   useEffect(() => {
      Date.prototype.addHours = function (h) {
         this.setTime(this.getTime() + (h * 60 * 60 * 1000));
         return this;
      }
      let actCategories = localStorage.getItem('actCategories')
      if (actCategories) {
         actCategories = JSON.parse(actCategories)
         let timestamp = new Date(actCategories.timestamp)
         let timestampValid = new Date(timestamp).addHours(2)
         // console.log('timestampValid', timestampValid);
         // console.log('new Date()', new Date());
         if (timestampValid > new Date()) {
            let data = actCategories?.data
            setActivities(data)
            setLoading(false)
         }
      }
   }, [])

   // lg:text-[48px]

   return (
      <div>
         <div className='pt-4 lg:ml-24 lg:mt-24'>
            <div className='lg:flex lg:items-center lg:mb-20'>
               <h1 className='text-xl font-black pl-4 cursor-pointer lg:text-5xl lg:font-semibold pb-4 lg:pb-0'
                  onClick={() => navigate(`/activities`)}>
                  Recommended activities
               </h1>
               <p className='pl-7 hidden lg:block cursor-pointer' onClick={() => navigate(`/activities`)}>
                  <img src={Arrow} alt="Arrow" />
               </p>
            </div>
            {
               loading ?
                  <div className='py-4 px-3'>
                     <Loader size='medium' />
                  </div>
                  :
                  <div className='grid grid-cols-3 lg:grid-cols-12 max-w-[800px] gap-3 px-3'>
                     {
                        activities.map((activity) =>
                           <div key={activity.id} className='flex flex-col justify-center items-center px-5 pb-3 pt-4 activity-box lg:col-span-2 activitycard'
                              onClick={() => navigate(`/activities/${activity.id}`)}>
                              <p><img src={activity.icon} alt="activity" /></p>
                              {
                                 activity?.name.length <= '17' ?
                                    <p className='text-center pt-2 font-semibold text-sm'
                                    // style={{ color: activity?.color }}
                                    >{activity?.name}</p>
                                    : <p className='text-center pt-2 font-semibold text-xs'
                                    // style={{ color: activity?.color }}
                                    >{activity?.name}</p>
                              }
                           </div>
                        )
                     }
                     <div style={{ backgroundColor: '#CDF7FF' }} className='flex flex-col justify-center items-center px-5 pb-3 pt-4 box lg:col-span-2 cursor-pointer'
                        onClick={() => navigate('/activities')} >
                        <p><img src={SeeLogo} alt="eye" /></p>
                        <div style={{ color: '#1B72C0' }}>
                           <p className='text-center text-sm pt-2 font-semibold' >See </p>
                           <p className='text-center text-sm  font-semibold pt-0' >All</p>
                        </div>
                     </div>
                  </div>
            }

         </div>
      </div>
   );
};

export default Activities;