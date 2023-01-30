import React,{ useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import back from "../../assets/Back.svg";
import "./Otp.module.css";
const Otp = () => {
    const [ otp, setOtp ] = useState(false);
     const locaion = useLocation();
     const NewLocation = useLocation();
      const from = locaion.state?.from || "/login";
     const navigate = useNavigate();
     const goBack = () => {
       navigate(from, { replace: true });
  };
  const handleNextInput = (e) => {
    if (e.keyCode === 39) {
      e.target.nextElementSibling.focus();
    }
    else if(e.keyCode === 37) {
      e.target.previousElementSibling.focus();
    
    }
  
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
        <div className="flex flex-col  justify-between mt-8">
          <h1 className="text-2xl font-bold ml-8">
            Verify with OTP sent to 9876543210
          </h1>
          <form id="otp" className="flex flex-row mx-auto  mt-5">
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="number"
              maxlength="1"
              onKeyUp={(e) => handleNextInput(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="number"
              maxlength="1"
              onKeyUp={(e) => handleNextInput(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="number"
              maxlength="1"
              onKeyUp={(e) => handleNextInput(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="number"
              maxlength="1"
              onKeyUp={(e) => handleNextInput(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="number"
              maxlength="1"
              onKeyUp={(e) => handleNextInput(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="number"
              maxlength="1"
              onKeyUp={(e) => handleNextInput(e)}
            />
          </form>
          <div className="flex ml-8 mt-5">
            <span>
              <div className="flex items-center justify-center">
                <div
                  className="spinner-border inline-block w-5 h-5 border-4 rounded-full mt-1 border-blue-500 border-t-blue-500 border-b-blue-500 border-l-blue-500 border-r-transparent mr-2"
                  role="status"
                ></div>
              </div>
            </span>
            <p className="text-gray-500">Auto fetching OTP</p>
          </div>
        </div>
        {otp ? (
          <Link
            to="/signup"
            state={{ from: NewLocation }}
            className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-5 mb-5"
          >
            Continue
          </Link>
        ) : (
          <Link
            to="/signup"
            state={{ from: NewLocation }}
            className="bg-[#B5CFEC] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-5 mb-5"
          >
            Continue
          </Link>
        )}

        <Link to="/resend" className="text-blue-500 ml-8">
          {" "}
          Resend OTP
        </Link>
        <br />
        <Link to="/resend" className=" ml-8">
          {" "}
          Didn't receive OTP? Try again in 00:30
        </Link>
        <div
          className="text-xl text-center w-[400px] text-gray-500 px-5 mt-5 mb-5"
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            textAlign: "center",
            left: "0",
          }}
        >
          By clicking continue, I accept the{" "}
          <Link to="/" className="text-black font-bold">
            terms{" "}
          </Link>
          of service and
          <Link to="/" className="text-black font-bold">
            {" "}
            privacy policy
          </Link>
        </div>
      </div>
    );
};

export default Otp;