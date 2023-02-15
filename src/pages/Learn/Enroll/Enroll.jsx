import React from "react";
import batch from "../../../assets/images/enroll/batch.svg";
import doc from "../../../assets/images/enroll/doc.svg";
import doc2 from "../../../assets/images/enroll/doc2.svg";
import live from "../../../assets/images/enroll/live.svg";
import playIcon from "../../../assets/images/enroll/play.png";
import redLive from "../../../assets/images/enroll/redLive.svg";
import tik from "../../../assets/images/enroll/tik.svg";
import videoBg from "../../../assets/images/enroll/videoBg.png";
import zoom from "../../../assets/images/enroll/zoom.svg";
import zoom2 from "../../../assets/images/enroll/zoom2.svg";
import acrilyc from "../../../assets/images/learn/acrylic.png";
import canva from "../../../assets/images/learn/canva.png";
import shortStory from "../../../assets/images/learn/shortStory.png";




const Enroll = () => {
    //enrollType "", "reg", "free"
    const [enrollType, setEnrollType] = React.useState("");
  return (
    <div className=" flex sm:mx-20">
      <div className="sm:w-[calc(100%-400px)]">
        <div className="flex flex-col gap-5 mb-20 sm:mb-0">
          <div className="text-gray-500 text-lg ml-6 mt-2">
            Programs > Publish your story
          </div>
          <div className="text-2xl font-bold text-black ml-6">
            Publish your own story
          </div>
          <div className="video flex justify-center items-center relative">
            <img
              src={videoBg}
              alt="video"
              className="w-full sm:rounded-[48px]"
            />
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
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-black ml-6">Pricing</div>
            {enrollType === "free" ? (
              ""
            ) : (
              <div>
                <div className="text-lightGray text-lg ml-6 py-2">
                  Next Batch starts on
                  <span className="text-blue-600"> 20-Feb-2023</span>
                </div>
                <div className="text-2xl font-bold text-black ml-6 flex items-center gap-1">
                  &#8377;1200{" "}
                  <span className="text-gray-400 line-through font-normal text-base">
                    &#8377;3499
                  </span>{" "}
                  <span className="text-blue-500 text-lg ml-2">80% OFF</span>
                </div>
              </div>
            )}
            {enrollType === "free" && (
              <div className="text-2xl font-bold text-black ml-6 flex items-center gap-1">
                &#8377;0{" "}
                <span className="text-gray-400 line-through font-normal text-base">
                  &#8377;3499
                </span>{" "}
                <span className="text-blue-500 text-lg ml-2">100% OFF</span>
              </div>
            )}
            {enrollType === "reg" && (
              <div className="text-yellow-600 text-md mx-6">
                To participate in the program, simply register for free. Once
                batches are scheduled, you will be notified. If the timings
                align with your schedule, you can choose to enroll in one of the
                available batches by making a payment
              </div>
            )}
          </div>
          <div className="sm:flex sm:mb-10">
            {enrollType === "" && (
              <button className="bg-sky-200 w-[30%] text-sky-900 font-semibold py-2 px-4 rounded-full border border-blue-400 mb-10 sm:mb-0 mx-5">
                {" "}
                Enroll
              </button>
            )}
            {enrollType === "reg" && (
              <button className="bg-sky-200 text-sky-900 font-semibold py-2 px-4 rounded-full border border-blue-400 mb-10 mx-5">
                {" "}
                Register for free
              </button>
            )}
            {enrollType === "free" && (
              <button className="bg-sky-200 text-sky-900 font-semibold py-2 px-4 rounded-full border border-blue-400 mb-10 mx-5">
                {" "}
                Enroll for free
              </button>
            )}
            <button className="bg-white text-[#1B72C0] font-semibold py-2 w-[30%] rounded-full border border-[#1B72C0]  self-center">
              {" "}
              Share
            </button>
          </div>
          <div className=" mx-4 shadow-md rounded-md  border-t border-gray-100 w-[336px] pb-5">
            <div className="text-2xl font-bold text-black ml-6 mt-3">
              Program content
            </div>
            <div className="">
              <div className="flex flex-col gap-6 mb-5 sm:mb-0 mt-6 ml-6">
                <ul className=" flex  flex-col gap-5 leading-none text-sm">
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
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-2xl font-bold text-black ml-6 mt-3">
            Similar Programs
          </div>
        </div>
        <div className="md:grid md:grid-cols-2">
          <div className="py-3 my-3 mx-5 border-gray-200 shadow-lg border-t px-3 rounded-2xl flex">
            <div className="h-[110px] flex justify-start items-center w-[40vw] relative">
              <img
                src={canva}
                alt=""
                className="h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-between ml-3 w-[60vw]">
              <h1 className="text-normal font-bold">Learn to CANVA</h1>
              <span className="text-sm text-gray-400">Ankit dua</span>
              <div className="flex justify-between">
                <button className="bg-red-100 text-red-500 px-1 rounded-full">
                  4 live sessions
                </button>
              </div>
              <h1>
                <span className="text-sky-600 font-bold text-lg"> Free</span>
              </h1>
            </div>
          </div>
          <div className="py-3 my-3 mx-5 border-gray-200 shadow-lg border-t px-3 rounded-2xl flex">
            <div className="h-[110px] flex justify-start items-center w-[40vw] relative">
              <img
                src={shortStory}
                alt=""
                className="h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-between ml-3 w-[60vw]">
              <h1 className="text-normal font-bold">Learn to CANVA</h1>
              <span className="text-sm text-gray-400">Ankit dua</span>
              <div className="flex justify-between">
                <button className="bg-red-100 text-red-500 px-1 rounded-full">
                  6 live sessions
                </button>
              </div>
              <h1>
                <span className="text-sky-600 font-bold text-lg"> Free</span>
              </h1>
            </div>
          </div>
          <div className="py-3 my-3 mx-5 border-gray-200 shadow-lg border-t px-3 rounded-2xl flex">
            <div className="h-[110px] flex justify-start items-center w-[40vw] relative">
              <img
                src={acrilyc}
                alt=""
                className="h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-between ml-3 w-[60vw]">
              <h1 className="text-normal font-bold">Learn to CANVA</h1>
              <span className="text-sm text-gray-400">Ankit dua</span>
              <div className="flex justify-between">
                <button className="bg-red-100 text-red-500 px-1 rounded-full">
                  6 live sessions
                </button>
              </div>
              <h1>
                <span className="text-sky-600 font-bold text-lg"> Free</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="enrollFooter bg-sky-100 border-2 border-blue-400 flex flex-col py-5 mb-20 sm:hidden">
          <div className="text-lightGray text-lg ml-6">
            {enrollType === "" && (
              <span>
                Batch starts
                <span className="text-blue-500"> 20-Feb-2023</span>
              </span>
            )}
            <button className="bg-blue-800 text-white font-semibold py-2 w-[90%] rounded-full border mx-auto  self-center">
              {" "}
              Pay &#8377; 1200 to Enroll
            </button>
          </div>
        </div>
      </div>
      <div className="w-[400px] mt-28 ml-5 hidden sm:block">
        <div className="enrollFooter bg-sky-100  flex flex-col py-10 mb-20 rounded-[48px] p-3">
          <div className="text-2xl font-bold text-black ml-6 mb-5">
            Publish your own story
          </div>
          <div className="text-lightGray text-lg ml-6 mb-2 mt-10">
            <span>
              Batch starts
              <span className="text-blue-500"> 20-Feb-2023</span>
            </span>
            <div className="text-4xl font-bold text-black flex items-center gap-1 mt-3">
              &#8377; 1200{" "}
              <span className="text-lightGray line-through font-normal text-sm">
                &#8377; 3499
              </span>{" "}
              <span className="text-blue-500 text-lg ml-2">100% OFF</span>
            </div>
            <button className="bg-blue-800 text-white font-semibold py-2 w-[90%] rounded-full border mx-auto  self-center my-2 mt-3">
              {" "}
              Pay &#8377; 1200 to Enroll
            </button>
            <button className="bg-white text-[#1B72C0] font-semibold py-2 w-[90%] rounded-full border mt-3 border-[#1B72C0] mx-auto  self-center">
              {" "}
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
