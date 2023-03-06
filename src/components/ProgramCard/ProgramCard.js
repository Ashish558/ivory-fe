import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getFormattedDuration,getPricingDiscountedText,getPricingMainText } from '../../utils/utils'
import './program.css'
export default function ProgramCard({ id,myPrograms,image,name,live_sessions_count,modules_duration,price,discounted_price,isUserProgram,userProgramId,is_completed,percentage_completed,is_live,is_free,discount,scrollToTop }) {

   const navigate = useNavigate()

   const handleScrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   }
   const handleNavigate = () => {
      if (isUserProgram) {
         navigate(`/program/${userProgramId}`)
      } else {
         navigate(`/learn/${id}`)
         if (scrollToTop) {
            window.location.reload()
         }
      }
   }

   return (
      <div className="py-3 my-3 sm:px-0 sm:pt-0 sm:rounded-[48px] mx-5 md:mx-0 border-gray-200 shadow-sm lg:shadow-md border px-3 rounded-3xl flex sm:flex-col sm:gap-2 hover:bg-LightSky" onClick={handleNavigate} >
         <div className=" sm:h-auto flex justify-start items-center sm:w-auto relative PimgContainer">
            <span className="text-normal sm:text-base sm:font-roboto text-white absolute top-6 left-6 hidden sm:block z-20">
               {/* {name} */} Ivory Exclusive
            </span>
            <img
               src={image}
               alt=""
               className="h-[124px] w-[124px] sm:h-[228px] sm:w-full object-cover rounded-[20px] sm:rounded-none sm:rounded-t-[48px]"
            />
         </div>
         <div className="flex flex-col justify-between ml-4 w-[60vw] sm:w-full sm:gap-2 lg:h-[195px]">
            <span className="text-sm sm:text-base text-gray-500 hidden sm:block sm:font-inter">
               {getFormattedDuration(modules_duration)} {
                  is_live === true &&
                  <button className="bg-[#FFE3E3] text-[#CB1537] p-1 px-2 rounded-full font-semibold hidden lg:inline-block ml-2">
                     {live_sessions_count} live sessions
                  </button>
               }
            </span>
            <h1 className="text-[16px] font-bold sm:text-xl">
               {name.length > 18 ? <>
                  {name} <span className=" text-[#6D747A] text-[13px] sm:text-[16px] sm:text-black">
                     | Ankit dua
                  </span>
               </> : name}
            </h1>
            {name.length < 18 &&
               <span className="text-[13px] text-[#6D747A] sm:text-base sm:text-black">
                  Ankit dua
               </span>}
            <div className="flex justify-between">
               {
                  is_live === true &&
                  <button className="bg-[#FFE3E3] text-[#CB1537] p-1 px-2 rounded-full font-semibold hidden lg:inline-block ml-2 lg:hidden">
                     {live_sessions_count} live sessions
                  </button>
               }
            </div>
            <div className="">
               {
                  myPrograms ? <div>
                     <p className='mt-2 text-base text-lightGray font-medium lg:mt-5'>
                        <span className="text-[#0055BF]"> {percentage_completed}% </span>completed
                     </p>
                     <progress className="progress bg-[#D1E2F9] progress-primary lg:w-[183px] h-[12px]" value={percentage_completed} max="100"></progress>
                  </div> :
                     price >= 1 ?
                        <div className=" mr-10 lg:mt-5 lg:p-3 relative">
                           <div className="text-xl lg:text-2xl font-bold text-[#1B72C0]  lg:ml-0 flex items-end gap-1 sm:justify-end">
                              {getPricingMainText(is_free,price,discounted_price,discount)}
                              <span className="text-gray-400 line-through font-normal text-xl">
                                 {getPricingDiscountedText(
                                    is_free,
                                    price,
                                    discounted_price,
                                    discount
                                 )}
                              </span>{" "}
                              {discount > 0 && !is_free && (
                                 <span className="text-[#1B72C0] text-lg ml-2">
                                    {" "}
                                    {(discounted_price * 100) / price}% OFF
                                 </span>
                              )}
                           </div>
                        </div> :
                        <div className=" mr-10 sm:mt-5 sm:p-3 relative">
                           <div className="text-xl lg:text-2xl font-bold  text-primary sm:ml-0 flex items-center gap-1 sm:justify-end sm:items-end ">
                              Free
                           </div>
                        </div>
               }
            </div>
         </div>
      </div>
   )
}
