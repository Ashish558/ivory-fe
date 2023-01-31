import React,{ useEffect,useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import back from "../../assets/Back.svg";
import { sendOtp,verifyOtp } from '../../services/auth';
import "./Otp.module.css";
const Otp = () => {
  const [otp,setOtp] = useState([]);
  const [otpStatus,setOtpStatus] = useState('');
  const locaion = useLocation();
  const NewLocation = useLocation();
  const from = locaion.state?.from || "/login";
  const stateData = locaion?.state;
  const { otp: otpData, otp_token, phone, countryCode } = stateData;

  // console.log(stateData.otpToken);
  const navigate = useNavigate();
  useEffect(() => {
    
    const otpArray = stateData.otp.split(""); ;
     const otpValues = {
       field1: otpArray[0],
       field2: otpArray[1],
       field3: otpArray[2],
       field4: otpArray[3],
       field5: otpArray[4],
       field6: otpArray[5],
    };
    setOtp(otpValues);
  }, [stateData]);

  const otpValuesArray = Object.values(otp);
  
  if (!stateData) {
    return <div>404</div>;
  }

  const goBack = () => {
    navigate(from, { replace: true });
  };

  const handleOpt = (e) => {
    e.preventDefault();
  const body = {
    country_code: countryCode,
    mobile_no: phone,
    otp: otpData,
    otp_token: otp_token,
  };
    // console.log(body);
    verifyOtp(body)
      .then((res) => {
          if (res.data.data=== null) {
            navigate("/signUp", {
              state: {
                otp: otpData,
                otp_token,
                phone,
                countryCode,
              },
            });
          } else {
            navigate("/home");
          }
          
      })
      .catch((err) => {
        console.log(err);
      });

  };
   const handleResend = (e) => {
     e.preventDefault();
      setOtpStatus("failed");
   
       const body = {
         country_code: countryCode,
         mobile_no: phone,
       };
     sendOtp(body).then((res) => {
        
          if (res.status === 202) {
            setOtpStatus('success');
          }
       })
         .catch((err) => {
           console.log(err);
           
              setOtpStatus("failed");
            
          });
          
   };
  const handleOptCursor = (e) => {
    // const { name,value } = e.target;
    // const otpValues = { ...otp,[name]: value }
    // if (value.length === 0) {
    //   delete otpValues[name];
    // }

    // setOtp(otpValues);
    e.preventDefault();
    if (e.keyCode === 39) {
      e.target.nextElementSibling.focus();
    } else if (e.keyCode === 37) {
      e.target.previousElementSibling.focus();
    }
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
      <div className="flex flex-col  justify-between mt-8">
        <h1 className="text-2xl font-bold ml-8">
          Verify with OTP sent to 9876543210
        </h1>
        <form className="flex flex-col" onSubmit={handleOpt}>
          <div className="flex flex-row mx-auto  mt-5">
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="text"
              value={otp.field1}
              name="field1"
              maxLength="1"
              onKeyUp={(e) => handleOptCursor(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="text"
              value={otp.field2}
              name="field2"
              maxlength="1"
              onKeyUp={(e) => handleOptCursor(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="text"
              name="field3"
              value={otp.field3}
              maxlength="1"
              onKeyUp={(e) => handleOptCursor(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="text"
              name="field4"
              value={otp.field4}
              maxlength="1"
              onKeyUp={(e) => handleOptCursor(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="text"
              name="field5"
              value={otp.field5}
              maxlength="1"
              onKeyUp={(e) => handleOptCursor(e)}
            />
            <input
              className="m-1 border border-gray-400 shadow h-10 w-10 text-center form-control rounded   focus:ring-blue-500 focus:outline-none focus:ring text-lg font-semibold text-gray-500 caret-blue-500"
              type="text"
              name="field6"
              value={otp.field6}
              maxlength="1"
              onKeyUp={(e) => handleOptCursor(e)}
            />
          </div>
          {otpValuesArray.length < 1 && (
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
          )}

          {otpValuesArray.length === 6 ? (
            <button
              type="submit"
              className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-5 mb-5"
            >
              Continue
            </button>
          ) : (
            <Link
              to="/signup"
              state={{ from: NewLocation }}
              className="bg-[#B5CFEC] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-5 mb-5"
            >
              Continue
            </Link>
          )}
        </form>
      </div>

      
      <br />
      {
        otpStatus === "failed" && (
        <div>
          <Link to="/resend" className="text-blue-500 ml-8" onClick={handleResend}>
          {" "}
          Resend OTP
                </Link>
                <Link to="/resend" className=" ml-8">
          {" "}
          Didn't receive OTP? Try again in 00:30
                </Link>
        </div>)}
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