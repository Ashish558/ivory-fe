import React from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';

import back from "../../assets/Back.svg";

const SignUp = () => {
    const locaion = useLocation();
    const NewLocation = useLocation();
 const from = locaion.state?.from || "/otp";
     const navigate = useNavigate();
     const goBack = () => {
       navigate(from, { replace: true });
     };
    return (
      <div className="h-screen" style={{ background: "rgb(211, 230, 254,.2)" }}>
        <div className="topAppBar mt-10 ml-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={back} alt="" onClick={goBack} />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-2xl font-bold ml-8">
            &#128588; Create an account
          </h1>
          <form>
            <div class="w-full mt-4 relative">
              <label className="ml-8 font-semibold text-lg">Name</label>
              <input
                class=" w-10/12 sm:w-auto  px-4 py-2 mt-2 text-gray-700 bg-white border  border-black placeholder-gray-400  focus:ring-opacity-40 focus:outline-none   justify-center flex mx-auto  rounded-xl ml-8"
                type="number"
                placeholder="Name"
              />
            </div>
            <div className="mt-8">
              <label className="ml-8 font-semibold text-lg">
                Date Of Birth
              </label>
              <div className="mt-2">
                <ul className="w-10/12 mx-auto flex flex-col">
                  <li className="bg-gray-30">
                    <ul className="flex items-center justify-center gap-5">
                      <li className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3">
                        17
                      </li>
                      <li className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3 ">
                        September
                      </li>
                      <li className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3 ">
                        1967
                      </li>
                    </ul>
                  </li>
                  <li className="bg-blue-200  rounded">
                    <ul className=" flex items-center justify-center gap-4">
                      <li className="  text-2xl font-bold border-b py-3 border-gray-600 px-2">
                        18
                      </li>
                      <li className="text-2xl font-bold border-b py-3 border-gray-600 px-2">
                        {" "}
                        October
                      </li>
                      <li className="text-2xl font-bold border-b py-3 border-gray-600 px-2">
                        1968
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul className="flex items-center justify-center gap-5">
                      <li className="text-gray-400 text-lg py-3 px-3">19</li>
                      <li className="text-gray-400 text-lg py-3 px-3">
                        November
                      </li>
                      <li className="text-gray-400 text-lg py-3 px-3">1969</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex items-center justify-between mt-4">
              <Link
                to="/congrates"
                state={{ from: NewLocation }}
                className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-2"
              >
                Continue
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
};

export default SignUp;