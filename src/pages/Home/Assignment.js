import React from 'react'
import note from "../../Images/Note.png";
import style from "./Assignment.module.css"
import { useNavigate } from 'react-router-dom';
const Assignment = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='h-16 w-11/12  flex justify-around border-b mx-4 border-slate-400'>
        <button className='h-16 w-32 mt-3 text-lg font-semibold'>All Modules</button>
        <button className='h-16 w-32 mt-3 text-lg font-semibold'>Live Sessions</button>
        <button className='h-16 w-32 mt-3 text-lg font-semibold'>Assignment</button>
      </div>
      <div className='h-32 w-11/12  flex border-b mx-4 border-slate-400' onClick={() => navigate("/Assignment1")}>
        <div className='h-28 w-36 rounded-xl mt-2 mx-4 bg-gray pt-5 px-10'><img className='h-16 w-16 ' src={note} alt="note" /></div>
        <div className='h-28 w-36 mt-2'>
          <p className='mt-5 text-lg font-semibold'>Module 1</p>
          <p>1 hr 25 min</p>
        </div>
      </div>
      <div className='h-32 w-11/12  flex border-b mx-4 border-slate-400'>
        <div className='h-28 w-36 rounded-xl mt-2 mx-4 bg-gray pt-5 px-10'><img className='h-16 w-16 ' src={note} alt="note" /></div>
        <div className='h-28 w-36 mt-2'>
          <p className='mt-5 text-lg font-semibold'>Module 2</p>
          <p>1 hr 25 min</p>
        </div>
      </div>
      <div className='h-32 w-11/12  flex border-b mx-4 border-slate-400'>
        <div className='h-28 w-36 rounded-xl mt-2 mx-4 bg-gray pt-5 px-10'><img className='h-16 w-16 ' src={note} alt="note" /></div>
        <div className='h-28 w-36 mt-2'>
          <p className='mt-5 text-lg font-semibold'>Module 3</p>
          <p>1 hr 25 min</p>
        </div>
      </div>
    </>
  )
}

export default Assignment
