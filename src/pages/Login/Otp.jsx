import React,{ useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import back from "../../assets/Back.svg";
import loginMan from "../../assets/images/login/loginMan.png";
import logo from "../../assets/images/login/logolight.png";
import { updateLoggedIn } from '../../redux/slices/user';
import { sendOtp,verifyOtp } from '../../services/auth';
import styles from "./Login.module.css";
import "./Otp.module.css";

const Otp = () => {
  const [otp, setOtp] = useState([]);
  const [otpStatus, setOtpStatus] = useState('');
  const locaion = useLocation();
  const NewLocation = useLocation();
  const from = locaion.state?.from || "/login";
  const stateData = locaion?.state;
  const { otp: otpData, otp_token, phone, countryCode } = stateData;
  const dispatch = useDispatch()

  // console.log(stateData.otpToken);
  const navigate = useNavigate();
  useEffect(() => {

    const otpArray = stateData.otp.split("");;
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
        if (res.data.data === null) {
          navigate("/dob", {
            state: {
              otp: otpData,
              otp_token,
              phone,
              countryCode,
            },
          });
        } else {
          console.log('verify', res.data.data);
          const { refresh_token, access_token } = res.data.data
          dispatch(updateLoggedIn({ loggedIn: true }))
          localStorage.setItem('access', access_token)
          localStorage.setItem('refresh', refresh_token)
          localStorage.setItem('phone', phone)
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
    <div className="h-screen bg-[#EEFDFC]">
      <div className="topAppBar pt-10 ml-8 sm:hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={back} alt="" onClick={goBack} />
          </div>
        </div>
      </div>
      <div className="sm:flex justify-around w-screen">
        <div
          className="hidden sm:block h-screen sm:w-[40vw]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 85, 191, 0.8) 1.84%, rgba(89, 227, 255, 0.8) 130.78%)",
          }}
        >
          <div className="pl-4 md:pl-20 pt-10">
            <img src={logo} alt="" />
          </div>
          <div className="flex flex-col items-left justify-center gap-2 h-[200px] xl:pl-28 md:pl-10 pl-0 sm:w-[500px]">
            <h1
              className={`text-4xl font-bold text-sky-50 mt-10 ${styles.cusStyle}`}
            >
              <span className="text-[#59E3FF]">Engage</span> in interests that
              sharpen your mind
            </h1>
          </div>
          <div className="flex-justify-center items-center px-10">
            <img src={loginMan} alt="" className="md:w-full mx-auto" />
          </div>
        </div>
        <div className=" h-screen sm:w-[60vw] sm:flex sm:flex-col sm:items-center sm:justify-center mt-20 sm:mt-0">
          <div className="flex flex-col  justify-between mt-8">
            <form className="flex flex-col" onSubmit={handleOpt}>
              <h1 className="text-2xl font-bold ml-8">
                Verify with OTP sent to 9876543210
              </h1>
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
                  className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-5 mb-1"
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
            <br />
            {otpStatus === "failed" && (
              <div>
                <Link to="/resend" className=" ml-8">
                  {" "}
                  Didn't receive OTP? Try again in 00:30
                </Link>
              </div>
            )}
            <Link
              to="/resend"
              className="text-blue-500 ml-8"
              onClick={handleResend}
            >
              {" "}
              Resend OTP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;