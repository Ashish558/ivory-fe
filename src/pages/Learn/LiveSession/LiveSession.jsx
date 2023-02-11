import React from 'react';
// import liveSession from './assets/images/learn/liveSession.png';
import greenTik from "../../../assets/images/learn/greenTik.png";
import liveSession from "../../../assets/images/learn/liveSession.png";
import module2 from "../../../assets/images/learn/module2.png";
import module3 from "../../../assets/images/learn/module3.png";
import module4 from "../../../assets/images/learn/module4.png";
const LiveSession = () => {
    const [sesstionStatus, setSesstionStatus] = React.useState("finished");
    return (
      <div className="mb-28">
        <div>
          {sesstionStatus === "upcomming" && (
            <img src={liveSession} alt="" className="w-full" />
          )}

          <div className="py-3 px-5 mt-2">
            <ul className="flex  justify-around  border-b  border-gray-300">
              <li className="capitalize font-bold text-normal  pb-3">
                all modules
              </li>
              <li className="capitalize font-bold text-normal flex flex-col justify-between">
                <span className="px-2">Live Sessions</span>

                <hr className=" border-b-4  w-full border-blue-600 rounded-full" />
              </li>
              <li className="capitalize font-bold text-normal  pb-3 ">
                Assignments
              </li>
            </ul>
          </div>
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
                <h1 className="text-normal font-semibold">
                  Getting Started with Acrylics
                </h1>
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
              <h1 className="underline text-lg text-blue-500 font-semibold ml-4">
                Instructions to join
              </h1>
            </div>
          </div>
        )}

        <h1 className="font-bold text-lg ml-5 mt-5">
          Getting Started with Arcrylics
        </h1>

        <div className="py-4 mt-3 mx-5 border-t border-gray-200 flex">
          <div className="h-[90px] flex justify-start items-center w-[40vw] relative">
            <img
              src={module2}
              alt=""
              className="h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between ml-3 w-[60vw]">
            <h1 className="text-normal font-semibold">
              Module 2
            </h1>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">1 hr 25 min</span>
              <button className="bg-red-100 text-red-500 px-1 rounded-full">
                live session
              </button>
            </div>
            <h1>
              <span className="text-gray-400">scheduled</span>
              <span className="text-blue-800 font-bold"> 04 Mar 2023</span>
            </h1>
          </div>
        </div>
        <div className="py-4 mx-5 border-t border-gray-200 flex">
          <div className="h-[90px] flex justify-start items-center w-[40vw] relative">
            <img
              src={module3}
              alt=""
              className="h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between ml-3 w-[60vw]">
            <h1 className="text-normal font-semibold">
             Module 3
            </h1>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">1 hr 25 min</span>
              <button className="bg-red-100 text-red-500 px-1 rounded-full">
                live session
              </button>
            </div>
            <h1>
              <span className="text-blue-800 font-bold">
                yet to be scheduled
              </span>
            </h1>
          </div>
        </div>
        <div className="py-4  mx-5 border-t border-gray-200 flex mb-28">
          <div className="h-[90px] flex justify-start items-center w-[40vw] relative">
            <img
              src={module4}
              alt=""
              className="h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between ml-3 w-[60vw]">
            <h1 className="text-normal font-semibold">
              Module 4
            </h1>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">1 hr 25 min</span>
              <button className="bg-red-100 text-red-500 px-1 rounded-full">
                live session
              </button>
            </div>
            <h1>
              <span className="text-blue-800 font-bold">
                yet to be scheduled
              </span>
            </h1>
          </div>
        </div>
      </div>
    );
};

export default LiveSession;