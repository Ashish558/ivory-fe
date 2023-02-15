import React from 'react'
// import liveSession from './assets/images/learn/liveSession.png';
import playIcon from "../../assets/images/enroll/play.png";
import videoBg from "../../assets/images/enroll/videoBg.png";
import greenTik from "../../assets/images/learn/greenTik.png";


export default function SingleLiveSession({ duration, title, img }) {


   return (
      <div className="py-3 mt-3 mx-5 border-t border-gray-200 flex">
         <div className="flex justify-start items-center w-[40vw] relative">
            <img
               src={img}
               alt=""
               className="h-[90px] object-cover rounded-xl"
            />
            <div className="flex flex-col justify-center items center h-full bg-[#30313026] absolute rounded-l-xl">
               <img src={greenTik} className="h-[30px] px-3" alt="" />
            </div>
         </div>
         <div className="flex flex-col justify-between ml-3 w-[60vw]">
            <div className="flex justify-between">
               <span className="text-sm text-gray-400"> {duration} </span>
            </div>
            <h1>
               <span className="text-gray-400">held on</span>
               <span className="text-green-500 font-bold">25 Feb 2023</span>
            </h1>
         </div>
      </div>
   )
}
