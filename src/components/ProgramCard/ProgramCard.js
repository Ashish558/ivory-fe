import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getFormattedDuration } from '../../utils/utils'

export default function ProgramCard({ id,myPrograms,image,name,live_sessions_count,modules_duration,price,discounted_price,isUserProgram,userProgramId,is_completed,percentage_completed,is_live }) {

   const navigate = useNavigate()

   const handleNavigate = () => {
      if (isUserProgram) {
         navigate(`/program/${userProgramId}`)
      } else {
         navigate(`/learn/${id}`)
      }
   }

   return (
      <div className="py-3 my-3 lg:px-0 lg:pt-0 lg:rounded-[48px] mx-5 border-gray-200 shadow-md border-t px-3 rounded-3xl flex lg:flex-col lg:gap-2" onClick={handleNavigate} >
         <div className=" lg:h-auto flex justify-start items-center w-[40vw] lg:w-auto relative">
            <span className="text-normal text-white absolute top-6 left-6 hidden lg:block">
               {/* {name} */}
            </span>
            <img
               src={image}
               alt=""
               className="h-[124px] w-[112px] lg:h-[228px] lg:w-full object-cover rounded-[20px] lg:rounded-none lg:rounded-t-[48px]"
            />
         </div>
         <div className="flex flex-col justify-between ml-4 w-[60vw] lg:w-full lg:gap-2">
            <span className="text-sm text-gray-500 hidden lg:block">
               {getFormattedDuration(modules_duration)}
            </span>
            <h1 className="text-[16px] font-bold lg:text-xl">
               {name.length > 18 ? <>
                  {name} <span className="text-sm text-gray-400 font-normal">
                     | Ankit dua
                  </span>
               </> : name}
            </h1>
            {name.length < 18 &&
               <span className="text-sm text-gray-400">
                  Ankit dua
               </span>}
            <div className="flex justify-between">
               {
                  is_live === true &&
                  <button className="bg-red-100 text-red-500 p-1 px-2 rounded-full font-semibold">
                     {live_sessions_count} live sessions
                  </button>
               }
            </div>

            {
               myPrograms ? <div>
                  <p className='mt-2'>
                     20% completed
                  </p>
                  <progress className="progress progress-primary w-56" value="40" max="100"></progress>
               </div> :
                  price >= 1 ?
                     <div className=" mr-10 lg:mt-5 lg:p-3">
                        <div className="text-2xl font-bold text-sky-600  lg:ml-0 flex items-center gap-1">
                           &#8377;{price} {"  "}
                           <span className="text-gray-400 line-through font-normal text-base">
                              &#8377;{discounted_price}
                           </span>{" "}
                        </div>
                     </div> :
                     <div className=" mr-10 lg:mt-5 lg:p-3">
                        <div className="text-2xl font-bold text-sky-600 lg:ml-0 flex items-center gap-1">
                           Free

                        </div>
                     </div>
            }


         </div>
      </div>
   )
}
