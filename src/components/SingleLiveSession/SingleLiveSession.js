import React from 'react'
// import liveSession from './assets/images/learn/liveSession.png';
import playIcon from "../../assets/images/enroll/play.png";
import videoBg from "../../assets/images/enroll/videoBg.png";
import greenTik from "../../assets/images/learn/greenTik.png";
import { getFormattedDate, getFormattedDuration } from '../../utils/utils';
import styles from './SingleLiveSession.module.css'


export default function SingleLiveSession({ id, duration, name, image, is_completed, handleModulechange, selectedModule, type, isCompleted, scheduled_on, scheduled_on_end_time, live_session_type }) {

   return (
      <div className={`py-3 mt-3 mx-5 border-t border-gray-200 flex ${selectedModule !== undefined ? id === selectedModule.id ? 'bg-secondary' : '' : ''}`}
         onClick={() => handleModulechange(id)} >
         <div className="flex justify-start items-center w-[40vw] relative">
            <img
               src={image}
               alt="session"
               className="h-[90px] object-cover rounded-xl"
            />
            {
               isCompleted &&
               <div className="flex flex-col justify-center items center h-full bg-[#30313026] absolute rounded-l-xl">
                  <img src={greenTik} className="h-[30px] px-3" alt="greenTik" />
               </div>
            }
         </div>
         <div className="flex flex-col justify-between text-sm ml-3 w-[60vw] relative">
            <div>
               <div className="fle justify-between">
                  <p className='font-bold mb-1 '>
                     {name}
                  </p>
                  <span className="text-sm text-gray-400">
                     {getFormattedDuration(duration)}
                  </span>
               </div>
            </div>
            {
               type === 'live_session' && live_session_type === 'completed' ?
                  <button style={{ color: '#44474E' }} className={`bg-[#E3E3E3]  p-1 w-[86px] rounded-full mt-5 font-bold text-sm ${styles.positionbtn}`}>
                     live ended
                  </button> : type === 'live_session' ?
                     <button style={{ color: '#CB1537' }} className={`bg-red-100  p-1 w-[105px] rounded-full mt-5 font-bold text-sm ${styles.positionbtn}`}>
                        live session
                     </button> : <></>
            }
            {
               type === 'video' &&
               <button className={`bg-[#DEF9FF] text-[#22B8CF] leading-normal p-1 w-[55px] rounded-full mt-5 font-bold text-sm ${styles.positionbtn}`}>
                  Video
               </button>
            }
            <h1>
               {/* <span className="text-gray-400">held on</span>
               <span className="text-green-500 font-bold">
                  25 Feb 2023
               </span> */}
               {
                  scheduled_on !== null &&
                  <span className="text-gray-400">scheduled</span>
               }
               <span style={{ color: isCompleted || live_session_type === 'completed' ? 'rgba(38, 169, 37, 1)' : '#0055BF' }} className="pl-2 font-bold">
                  {scheduled_on === null ? 'Yet to be scheduled' : getFormattedDate(scheduled_on)}
               </span>
            </h1>
         </div>
      </div >
   )
}
