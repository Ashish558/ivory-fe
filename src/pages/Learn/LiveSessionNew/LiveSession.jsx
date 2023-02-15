import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css'

// import liveSession from './assets/images/learn/liveSession.png';
import playIcon from "../../../assets/images/enroll/play.png";
import videoBg from "../../../assets/images/enroll/videoBg.png";
import greenTik from "../../../assets/images/learn/greenTik.png";
import liveSession from "../../../assets/images/learn/liveSession.png";
import module2 from "../../../assets/images/learn/module2.png";
import module3 from "../../../assets/images/learn/module3.png";
import module4 from "../../../assets/images/learn/module4.png";
import { tempData } from './data';
import SingleLiveSession from '../../../components/SingleLiveSession/SingleLiveSession';

const LiveSession = () => {

  const [sesstionStatus, setSesstionStatus] = useState("");
  const [moduleStatus, setModuleStatus] = useState('running');
  const [tab, setTab] = useState("liveSession");
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div className="mb-28 mt-[0px] lg:px-10 lg:mt-[70px]">
      <div>
        {tab === "liveSession" && (
          <img src={liveSession} alt="" className="w-full lg:hidden" />
        )}
        {tab === "allModules" && (
          <div className="video flex justify-center items-center relative lg:hidden">
            <img src={videoBg} alt="video" className="w-full" />
            <img src={playIcon} alt="" className="absolute" />
          </div>
        )}
        <p className='text-[40px] mb-8 px-10 hidden lg:block font-medium  pt-7'> Publish your own story </p>
        <div className='flex items-center  hidden lg:flex lg:px-10 gap-x-7 mb-7'>
          <div className=" w-[800px] flex-1 ">
            <div className='video flex h-[451px] justify-center overflow-hidden object-cover items-center relative rounded-[24px]'>
              <img src={videoBg} alt="video" className="w-full " />
              <img src={playIcon} alt="" className="absolute" />
            </div>
            <div className='mt-7'>
              <h4 className='font-semibold text-2xl mb-3'> About this Program </h4>
              <p>
                For this exercise, you will need a canvas, paint (acrylic or tempera works well), and something to splatter the paint with (such as a paintbrush with stiff bristles or a toothbrush). For this exercise, you will need a canvas, paint (acrylic or tempera works well), and something to splatter the paint with (such as a paintbrush with stiff bristles or a toothbrush).For this exercise, you will need a canvas, paint (acrylic or tempera works well), and something to
              </p>
            </div>
          </div>
          <div className='max-w-[400px] self-stretch overflow-auto max-h-[700px]'>
            {[...tempData,].map(item => {
              return <SingleLiveSession key={item.id} {...item} />
            })}
          </div>
        </div>

        <div className="py-3 px-5 mt-2">
          <ul className="flex  justify-around lg:justify-start lg:gap-x-8  border-b  border-gray-300">
            <li className="capitalize font-bold text-normal flex flex-col justify-between h-10">
              <span className="px-2  lg:px-5">all Modules</span>
              {tab === "allModules" && (
                <hr className=" border-b-4  w-full border-blue-600 rounded-full" />
              )}
            </li>
            <li className="capitalize font-bold text-normal flex flex-col justify-between h-10">
              <span className="px-2">Live Sessions</span>
              {tab === "liveSession" && (
                <hr className=" border-b-4  w-full border-blue-600 rounded-full" />
              )}
            </li>
            <li className="capitalize font-bold text-normal flex flex-col justify-between h-10">
              Assignments
              {tab === "assignments" && (
                <hr className=" border-b-4  w-full border-blue-600 rounded-full " />
              )}
            </li>
          </ul>
        </div>
        {tab === "allModules" && (
          <div className='block lg:hidden'>
            <div className="text-2xl font-bold text-black ml-6">
              Learn to paint like a PRO
            </div>
            <div className="text-gray-500 text-lg ml-6">
              For this exercise, you will need a canvas, paint (acrylic or
              tempera works well), and something to splatter the paint with
              (such as a paintbrush with stiff bristles or a toothbrush)....{" "}
              <span className="text-blue-500"> See more</span>
            </div>
          </div>
        )}

        {sesstionStatus === "finished" && (
          <div className="py-3 mt-3 mx-5 border-t border-gray-200 flex">
            <div className="flex justify-start items-center w-[40vw] relative">
              <img
                src={liveSession}
                alt=""
                className="h-[90px] object-cover rounded-xl"
              />
              <div className="flex flex-col justify-center items center h-full bg-[#30313026] absolute rounded-l-xl">
                <img src={greenTik} className="h-[30px] px-3" alt="" />
              </div>
            </div>
            <div className="flex flex-col justify-between ml-3 w-[60vw]">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">1 hr 25 min</span>
              </div>
              <h1>
                <span className="text-gray-400">held on</span>
                <span className="text-green-500 font-bold">25 Feb 2023</span>
              </h1>
            </div>
          </div>
        )}
      </div>
      {sesstionStatus === "upcomming" && (
        <div>
          <div className="sessionDetails flex flex-col gap-3 ml-5">
            <button className="bg-red-100 text-red-500 p-1 w-[200px] rounded-full mt-5">
              upcomming session
            </button>
            <h1 className="font-bold text-lg">
              Getting Started with Arcrylics
            </h1>
            <div className="flex flex-col gap-3">
              <ul>
                <li className="list-none">
                  <span className="text-gray-400 font-semibold">Date: </span>{" "}
                  <span className="font-bold text-normal">25 Feb 2023</span>
                </li>
                <li className="list-none">
                  <span className="text-gray-400 font-semibold">Time: </span>{" "}
                  <span className="font-bold text-normal">
                    02:00 PM to 03:30 PM{" "}
                  </span>
                </li>
                <li className="list-none">
                  <span className="text-gray-400 font-semibold">
                    Duration:{" "}
                  </span>{" "}
                  <span className="font-bold text-normal">1 hr 30 min</span>
                </li>
                <li className="list-none">
                  <span className="text-gray-400 font-semibold">Host: </span>{" "}
                  <span className="font-bold text-normal text-blue-500">
                    Mike Winkelmann
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col ml-5 justify-start gap-3">
            <div className="bg-sky-50 shadow-xl p-3 flex flex-col gap-3 rounded-lg w-[89%] mt-5">
              <ul className="ml-2 mt-2">
                <li className="list-none text-lg text-gray-400 font-semibold">
                  Zoom Meeting ID:{" "}
                  <span className="font-bold text-black">340012</span>
                </li>
                <li className="list-none text-lg text-gray-400 font-semibold">
                  Zoom meeting link:{" "}
                </li>
                <li className="list-none text-lg font-semibold text-blue-400">
                  https://zoom.us/j/1234567890
                </li>
              </ul>
            </div>
            <button className="bg-sky-800 text-white font-semibold py-2 w-[90%] rounded-full border mx-auto  self-center">
              {" "}
              Join Joom Session
            </button>
          </div>
        </div>
      )}
      {tab === "liveSession" && (
        <h1 className="font-bold text-lg ml-5 mt-5">
          upcoming live sessions
        </h1>
      )}
      {tab === "allModules" && (
        <div className="text-black text-lg ml-6 font-bold mt-5">
          8 Videos
          <span className="text-gray-500 text-normal font-normal">
            {" "}
            ( 3 hrs 15 min )
          </span>{" "}
          | 4 live sessions
        </div>
      )}
      <div className='lg:max-w-[350px]'>
      {tempData.map(item => {
        return <SingleLiveSession key={item.id} {...item} />
      })}
      </div>
    </div>
  );
};

export default LiveSession;