import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import community from '../../../assets/images/learn/comunity.png';
import back from "../../../assets/Back.svg";
import downArrow from "../../../assets/images/learn/downArrow.svg";
import desktopCommunity from "../../../assets/images/learn/desktopCommunity.png";
import style from './Community.module.css';
const Community = () => {
  const locaion = useLocation();
  const from = locaion?.state?.from || "/login";
  const stateData = locaion?.state;

  const goBack = () => {
    Navigate(from, { replace: true });
  };
  return (
    <div className={` h-screen ${style.cusBg} sm:relative sm:px-24`}>
      <div className="topAppBar pt-10 ml-8 hidden sm:block absolute top-16 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 p-3 bg-white rounded-full">
            <img src={back} alt="back" onClick={goBack} />
          </div>
        </div>
      </div>
      <div className="flex justify-end flex-col sm:hidden">
        <img src={community} className="w-full h-screen sm:hidden" alt="community" />
        <div className=" rounded-xl flex flex-col justify-center gap-3 items-center mt-20 py-3 absolute top-0 ">
          <div className="flex flex-col justify-center items-center text-center w-[80%] mx-auto text-lg">
            Where unity blooms, the community shines, and soon its radiance
            will be our guide.
          </div>
          <h1 className="text-white font-bold text-2xl mt-10">Coming Soon</h1>
        </div>
      </div>
      <div className='hidden sm:block'>
        <div className="flex flex-col justify-start items-start pt-28 pl-28">
          <div className="flex gap-3">
            <h1 className="text-black text-3xl font-semibold">Community</h1>
            <img src={downArrow} className="w-[50px] -mt-2" alt="downArrow" />
          </div>
          <h1 className="text-blue-500 text-lg">Comming Soon</h1>
        </div>
        <div className="flex flex-col justify-center text-center items-center w-[500px] mx-auto mt-10 gap-4">
          <p className="text-gray-500 mx-2">
            Where unity blooms, the community shines, and soon its radiance
            will be our guide.
          </p>
          <img src={desktopCommunity} alt="desktopCommunity" />
        </div>
      </div>
    </div>
  );
};

export default Community;