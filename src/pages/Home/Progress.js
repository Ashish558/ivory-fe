import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Logoo from '../../Images/Rectangle 2943 (1).png'
import ProgressBar from "react-percent-bar";
const Progress = () => {
    const navigate = useNavigate();
    const [card,setcard]=useState([
        {
          Content:"Learn to paint like a PRO ",
          lesson:"16 lessons",
          price:"20% completed"
        },
        {
          Content:"Publish your short story",
          lesson:"16 lessons",
          price:"20% completed"
        },
        {
          Content:"Learn to CANVA",
          lesson:"16 lessons",
          price:"20% completed"
        }
       ])
       const perc = 20;
  return (
    <>
     <div className="h-20 w-full flex justify-around bg-sky-100" >
        <button className="h-12 w-28 font-bold text-lg rounded-3xl bg-cyan-200 mt-5" onClick={() => navigate('/learn')}>Programs</button>
        <button className="h-12 w-32 font-bold text-lg rounded-3xl bg-cyan-200 mt-5">My Program</button>
    </div>
    <div className='h-32  mt-4 mx-4 bg-LightSky rounded-3xl'></div>
    <div className='h-28 w-full flex justify-center'>
        <button className='h-12 w-28 rounded-l-2xl mt-8 bg-LightSky border-2 text-lg font-medium'>On Going</button>
        <button className='h-12 w-28 rounded-r-2xl mt-8 bg-white border-2 text-lg font-medium'>Completed</button>
    </div>
    <div className='h-full w-full'>
      {
        card.map((ele,index)=>(
    <div className='h-36 flex py-2 mt-4 mx-4 shadow-md rounded-3xl border-gray-300'>
      <img src={Logoo} className='h-32 mx-2 w-28 rounded-3xl '/>
      <div className='h-32 w-72 '>
        <h1 className='text-xl font-bold'>{ele.Content}</h1>
        <p>{ele.name}</p>
        <p className='text-lg font-normal'>{ele.lesson}</p>
        {/* <br /> */}
        <p className='mt-2'>20% completed</p>
        <ProgressBar
        percent={perc}
        fillColor={perc > 50 ? "#D1E2F9" : "#2C70FB"}
        width="90%"
        height="15px"
      />
      </div>
    </div>
        ))
      }
    </div>
    </>
  )
}

export default Progress
