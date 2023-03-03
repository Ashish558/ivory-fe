import React from 'react'
// import liveSession from './assets/images/learn/liveSession.png';
import playIcon from "../../assets/images/enroll/play.png";
import videoBg from "../../assets/images/enroll/videoBg.png";
import greenTik from "../../assets/images/learn/greenTik.png";
import { getFormattedDuration } from '../../utils/utils';
import './styles.module.css'


export default function SingleLiveSession({ id, duration, name, image, is_completed, handleModulechange, selectedModule, type, isCompleted }) {

   // console.log(isCompleted);
   return (
      <div className={`py-3 mt-3 mx-5 border-t border-gray-200 flex ${selectedModule !== undefined ? id === selectedModule.id ? 'bg-secondary' : '' : ''}`}
         onClick={() => handleModulechange(id)} >
         <div className="flex justify-start items-center w-[40vw] relative">
            <img
               src={image}
               alt=""
               className="h-[90px] object-cover rounded-xl"
            />
            {
               isCompleted &&
               <div className="flex flex-col justify-center items center h-full bg-[#30313026] absolute rounded-l-xl">
                  <img src={greenTik} className="h-[30px] px-3" alt="" />
               </div>
            }
         </div>
         <div className="flex flex-col justify-between text-sm ml-3 w-[60vw] relative">
            <div>
               <div className="fle justify-between">
                  <p className='font-bold mb-1'>
                     {name}
                  </p>
                  <span className="text-sm text-gray-400">
                     {getFormattedDuration(duration)}
                  </span>
               </div>
            </div>
            <p>  <button style={{ color: '#CB1537' }} className="bg-red-100  p-1 w-[105px] rounded-full mt-5 font-bold text-sm position-btn">
               live session
            </button></p>
            <h1>
               {/* <span className="text-gray-400">held on</span>
               <span className="text-green-500 font-bold">
                  25 Feb 2023
               </span> */}

               <span className="text-gray-400">scheduled</span>
               <span style={{ color: '#0055BF' }} className="pl-2 font-bold">
                  25 Feb 2023
               </span>
            </h1>
         </div>
      </div>
   )
}
