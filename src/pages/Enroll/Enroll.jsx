import React from "react";
import batch from "../../assets/images/enroll/batch.svg";
import doc from "../../assets/images/enroll/doc.svg";
import doc2 from "../../assets/images/enroll/doc2.svg";
import live from "../../assets/images/enroll/live.svg";
import playIcon from "../../assets/images/enroll/play.png";
import redLive from "../../assets/images/enroll/redLive.svg";
import tik from "../../assets/images/enroll/tik.svg";
import tik2 from "../../assets/images/enroll/tik2.svg";
import videoBg from "../../assets/images/enroll/videoBg.png";
import zoom from "../../assets/images/enroll/zoom.svg";
import zoom2 from "../../assets/images/enroll/zoom2.svg";

const Enroll = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 mb-20 sm:mb-0">
        <div className="text-gray-500 text-lg ml-6 mt-2">
          Programs > Publish your story
        </div>
        <div className="text-2xl font-bold text-black ml-6">
          Publish your own story
        </div>
        <div className="video flex justify-center items-center relative">
          <img src={videoBg} alt="video" className="w-full" />
          <img src={playIcon} alt="" className="absolute" />
        </div>
        <div className="text-2xl font-bold text-black ml-6">
          About this Program
        </div>
        <div className="text-gray-500 text-lg ml-6">
          For this exercise, you will need a canvas, paint (acrylic or tempera
          works well), and something to splatter the paint with (such as a
          paintbrush with stiff bristles or a toothbrush)....{" "}
          <span className="text-blue-500"> See more</span>
        </div>
        <div className="">
          <div className="text-2xl font-bold text-black ml-6">Benifits</div>
          <div className="">
            <div className="flex flex-col gap-6 mb-5 sm:mb-0 mt-10 ml-6">
              <ul className=" flex  flex-col gap-4 leading-none text-sm">
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={zoom} alt="" />
                  14 hours on demand video
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={live} alt="" />
                  10 live sessions
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={doc} alt="" />
                  100% free documents
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={batch} alt="" />
                  Completion Certificate
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={tik} alt="" />
                  Life time access
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={tik} alt="" />
                  24/7 support
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold text-black ml-6">Priceng</div>
        <div className="text-gray-500 text-lg ml-6">
          Next Batch starts on
          <span className="text-blue-500"> 20-Feb-2023</span>
        </div>
        <div className="text-2xl font-bold text-black ml-6 flex items-center gap-1">
          $1200{" "}
          <span className="text-gray-400 line-through font-normal text-base">
            $3499
          </span>{" "}
          <span className="text-blue-500 text-lg ml-2">80% OFF</span>
        </div>
        <button className="bg-sky-200 text-sky-900 font-semibold py-2 px-4 rounded-full border border-blue-400 mb-10 mx-5">
          {" "}
          Enroll
        </button>
        <div className=" mx-4 shadow-md rounded-md border-gray-300 border mb-10">
          <div className="text-2xl font-bold text-black ml-6 mt-3">
            Program content
          </div>
          <div className="">
            <div className="flex flex-col gap-6 mb-5 sm:mb-0 mt-6 ml-6">
              <ul className=" flex  flex-col gap-4 leading-none text-sm">
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={zoom2} alt="" />
                  How to meditate.
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={zoom2} alt="" />
                  How to meditate video.
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={redLive} alt="" />
                  Live Control anger
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={tik2} alt="" />
                  Assignment 1
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={zoom2} alt="" />
                  Brainstrom ideas
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={redLive} alt="" />
                  Live Control anger
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={redLive} alt="" />
                  Live Control anger
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={doc2} alt="" />
                  Think fast and correct
                </li>
                <li className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold">
                  <img src={tik2} alt="" />
                  Assignment 2
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-2xl font-bold text-black ml-6 mt-3">
            Similar Programs
          </div>
        </div>
        <div className="enrollFooter bg-sky-200 border-2 border-blue-400 flex flex-col py-5">
          <div className="text-gray-500 text-lg ml-6">
            Next Batch starts on
            <span className="text-blue-500"> 20-Feb-2023</span>
            <button className="bg-blue-800 text-white font-semibold py-2 w-[90%] rounded-full border mx-auto  self-center">
              {" "}
             Pay $ 1200 to Enroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
