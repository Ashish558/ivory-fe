import React from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import back from "../../assets/Back.svg";
const Login = () => {
    const locaion = useLocation();
    const NewLocation = useLocation();
     const from = locaion.state?.from || "/";
    const navigate = useNavigate();
    const goBack = () => {
        navigate(from,{replace:true})
    }
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
          <h1 className="text-3xl font-bold ml-8">
            &#128075; Hi, <br /> Welcome to Ivory!
          </h1>
          <form>
            <div class="w-full mx-auto mt-4 relative">
              <input
                class=" w-10/12 sm:w-auto  px-4 py-4 mt-2 text-gray-700 bg-white border-2  border-blue-500 placeholder-gray-400  focus:ring-opacity-40 focus:outline-none   justify-center flex mx-auto  rounded-xl pl-16 text-lg"
                type="number"
                placeholder="Phone Number"
              />
              <select
                name=""
                id=""
                style={{ appearance: "none" }}
                className=" border-r-2 border-blue-500 px-1 absolute top-5 left-10 pl-1 text-blue-600 text-lg"
              >
                <option value="+91" selected>
                  +91
                </option>
                <option value="+92">+92</option>
              </select>
            </div>

            <div class="flex items-center justify-between mt-4">
              <Link
                to="/otp"
                state={{ from: NewLocation }}
                replace
                className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-5"
              >
                Continue
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;