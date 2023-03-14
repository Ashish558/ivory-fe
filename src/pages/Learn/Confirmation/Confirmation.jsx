import React from 'react';
import confimation from '../../../assets/images/learn/confirmation.png';
import greenTik from "../../../assets/images/learn/greenTik.png";
import style from '../Community/Community.module.css';

const Confirmation = () => {
  return (
    <>
      <div className={` h-screen ${style.cusBg} sm:relative sm:px-24 hidden sm:block`}>
        <div className=" flex justify-center items-center pt-28">
          <div className="w-[490px] h-[607px]  bg-white rounded-[48px] shadow-xl relative pt-16 ">
            <div className="shadow-lg sm:shadow-none  flex justify-left gap-3 items-center bg-white mx-6">
              <img src={greenTik} className="h-[40px] pb-1 px-3" alt="greenTik" />
              <div className="flex flex-col justify-center items-left ">
                <span className="font-semibold sm:text-green-600">
                  The payment confirms,
                </span>{" "}
                a pathway opens, to gain new abilities and broaden horizons.
              </div>
            </div>
            <img
              src={confimation}
              className="rounded-b-[48px] w-[300px] absolute bottom-0"
              alt="confimation"
            />
          </div>
        </div>
      </div>
      <div
        className=" flex justify-end flex-col h-screen pt-20 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 85, 191, 0.75) 1.84%, rgba(89, 227, 255, 0.75) 130.78%), #FFFFFF",
        }}
      >
        <div className="shadow-lg sm:shadow-none rounded-xl flex justify-left gap-3 items-center bg-white mt-20 py-3 absolute top-3 mx-5 ">
          <img src={greenTik} className="h-[40px] pb-1 px-3" alt="greenTik" />
          <div className="flex flex-col justify-center items-left">
            <span className="font-semibold sm:text-green-600">
              The payment confirms,
            </span>{" "}
            a pathway opens, to gain new abilities and broaden horizons.
          </div>
        </div>
        <img src={confimation} className="w-full" alt="confimation" />
      </div>
    </>
  );
};

export default Confirmation;