import React from 'react'
import paint from "../../assets/images/activity.png"
import note from "../../Images/Note.png";
const Assignment1 = () => {
  return (
    <>
      <div className='h-16 w-11/12  flex justify-around border-b mx-4 border-slate-400'>
        <button className='h-16 w-32 mt-3 text-lg font-semibold'>All Modules</button>
        <button className='h-16 w-32 mt-3 text-lg font-semibold'>Live Sessions</button>
        <button className='h-16 w-32 mt-3 text-lg font-semibold'>Assignment</button>
      </div>
      <div>
        <p className='text-2xl font-bold mb-3 text-center mt-3'>Acrylic Painting Assignment 1</p>
        <div className='sm:flex sm:items-start sm:justify-start  sm:w-[100%] border-b'>
          <img className='h-48 sm:rounded-3xl sm:w-[100%] object-cover sm:mx-0 mx-auto' src={paint} alt="paint" />
        </div>
        <div>
          <h2 className='text-xl font-bold mt-5 mx-5'>Description</h2>
          <p className='w-11/12 mx-5 font-medium mt-3'>For this exercise, you will need a canvas, paint (acrylic or tempera works well), and something to splatter the paint with (such as a paintbrush with stiff bristles or a toothbrush).<br /><span className='text-cyan-600'>See more</span></p>
        </div>
        <div className='flex mt-4'>
          <button className='h-11 w-48 mx-3 bg-SkyBlue rounded-3xl text-white'><span className='mx-2'>&#10003;</span>Mark Completed</button>
          <button className='h-11 w-28 rounded-3xl bg-white border-2 border-cyan-300 text-sky-300'>
            <i className="fa fa-share-alt mx-2" ></i>
            Share</button>
        </div>
        <div>
          <p className='w-9/12 mt-6 mx-5 font-bold'>Submit your work to get feedback
            from our expert:</p>
          <button className='h-12 flex w-11/12 rounded-3xl mx-4 mt-3 bg-green text-lime-700'><i class="fa fa-whatsapp text-3xl ml-20 mt-1 mx-2"></i>
            <p className='mt-3 text-base mx-1'>submit via WhatsApp</p></button>
        </div>
      </div>
      <div className=''>
        <p className='text-2xl mx-5 mt-7 font-bold'>Next Assignments</p>
        <div className='h-32 w-11/12  flex border-b mx-2 border-slate-400'>
          <div className='h-28 w-36 rounded-xl mt-2 mx-4 bg-gray pt-5 px-10'><img className='h-16 w-16 ' src={note} alt="note" /></div>
          <div className='h-28 w-36 mt-2'>
            <p className='mt-5 text-lg font-semibold'>Module 1</p>
            <p>1 hr 25 min</p>
          </div>
        </div>
        <div className='h-32 w-11/12  flex border-b mx-2 border-slate-400'>
          <div className='h-28 w-36 rounded-xl mt-2 mx-4 bg-gray pt-5 px-10'><img className='h-16 w-16 ' src={note} alt="note" /></div>
          <div className='h-28 w-36 mt-2'>
            <p className='mt-5 text-lg font-semibold'>Module 2</p>
            <p>1 hr 25 min</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Assignment1
