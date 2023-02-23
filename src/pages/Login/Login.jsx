import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import logo from "../../assets/images/login/logolight.png";
import SignupTree from "../../assets/images/login/signupTree.png";
import { sendOtp } from '../../services/auth';
import styles from "./Login.module.css";

const settings = {
  infinite: true,
  centerPadding: "10px",
  slidesToShow: 1,
  initialSlide: 0,
  arrows: false,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 2000,
  afterChange: function (index) {
    console.log(
      `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    );
  }
};

const sliderData = [

  {
    textPrimary: "Accomplish",
    textSec: "your creative goals",
    img: SignupTree,
    imgClassName: "max-w-[270px]",
  },
];
const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState('');
  const [error, setError] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("+880");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (JSON.stringify(phone).length < 10) {

      setError("Phone number must be 11 digits");
    } else if (phone.length > 10) {
      setError("Phone number cannot be more than 11 digits");
    } 
    else {
      setCountryCode(e.target.countryCode.value);
      const body = {
        country_code: countryCode,
        mobile_no: phone,
      };
      sendOtp(body).then((res) => {
        console.log(res);
        navigate("/otp", {
          state: {
            otp: res.data.data.otp,
            otp_token: res.data.data.otp_token,
            phone: phone,
            countryCode: countryCode,
          },
        });
      });
    }
  }
  return (
    <div className="overflow-x-hidden bg-[#EEFDFC] overflow-hidden h-screen">
      

      <div className="sm:flex  min-h-[667px] overflow-hidden  justify-around  w-screen mt-16 sm:m-0">
        <div className="topAppBar mt-10 ml-8 sm:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-end justify-end content-end w-full">
              <Link
                to="/home"
                className=" bg-slate-400 px-3 py-1 text-center mr-10 text-white rounded-full absolute text-lg"
              >
                skip
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hidden sm:flex flex flex-col items-center min-h-screen h-full sm:w-[40vw] overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 85, 191, 0.8) 1.84%, rgba(89, 227, 255, 0.8) 130.78%)",
          }}
        >
          <div className="pl-4 md:pl-20 pt-10 self-stretch">
            <img src={logo} alt="" />
          </div>
          <div className='flex-1 w-full'>
            <Slider {...settings} className='w-full flex-1 h-auto' >
              {
                sliderData.map((item, idx) => {
                  return (
                    <div>
                      <div className="flex flex-col items-left justify-center gap-2 h-[200px] xl:pl-20 md:pl-10 pl-0 sm:w-[500px]">
                        <h1
                          className={`text-4xl font-bold text-sky-50 mt-10 ${styles.cusStyle}`}
                        >
                          <span className="text-[#59E3FF]"> {item.textPrimary} </span>
                          {item.textSec}
                        </h1>
                      </div>
                      <div className="flex justify-center mx-auto items-center flex-1 w-[300px] h-[300px] overflow-hidden rounded-full bg-secondary mt-10">
                        <img src={item.img} alt="" className={`md:w-full ${item.imgClassName} mx-auto w-full-h-full object-contain`} />
                      </div>
                    </div>
                  )
                })
              }

            </Slider>
          </div>
        </div>
        <div className="  h-screen sm:w-[60vw] mt-10 sm:mt-0 sm:flex sm:flex-col sm:items-center sm:justify-center">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="sm:w-[328px] mx-auto sm:flex sm:flex-col sm:justify-start"
          >
            <h1 className="text-3xl font-bold ml-8 sm:ml-0 sm:text-left">
              &#128075; Hi, <br /> Welcome to Ivory!
            </h1>
            <div class="w-full sm:w-[328px] mx-auto lg:mt-6 mt-10 relative">
              <input
                class=" w-10/12 sm:w-[328px]  px-4 py-4 sm:py-3 mt-2 text-gray-700 bg-white border-2  border-blue-500 placeholder-gray-400  focus:ring-opacity-40 focus:outline-none   justify-center flex mx-auto  rounded-xl pl-16 text-lg"
                // type="tel"
                type={JSON.stringify(phone)?.length < 10 ? "number" : "number"}
                maxLength="10"
                // pattern='[0-9]{11}'
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                required
              />
              <p className="ml-8 text-red-300">{error}</p>
              <select
                name="countryCode"
                id=""
                style={{ appearance: "none" }}
                className=" border-r-2 border-blue-500 px-1 absolute top-5 sm:top-6 left-[10%] sm:left-4 pl-1 text-blue-600 text-[16px]"
              >
                <option value="+91" selected>
                  +91
                </option>
                <option value="+92">+92</option>
              </select>
            </div>
            <div class="flex items-center justify-between mt-4">
              {phone.length === 10 ?
                (
                  <button
                    type="submit"
                    className="bg-[#1B72C0] flex items-center lg:h-[43px] text-xl py-2 lg:text-sm font-semibold px-20 rounded-full text-white w-10/12 sm:w-full text-center justify-center flex mx-auto mt-5 lg:w-full"
                  >
                    Continue
                  </button>
                ) : (
                <button       
                  className="bg-[#B5CFEC] flex items-center lg:h-[43px]  text-xl py-2 px-20 lg:text-sm font-semibold rounded-full text-white w-10/12 sm:w-full text-center justify-center flex mx-auto mt-5 mb-5" disabled
                >
                  Continue
                </button>
              )}
              </div>
              <div className="lg:text-xs lg:text-left text-center w-[328px] text-gray-500  mt-5 mb-5 mx-auto hidden sm:block">
                By clicking continue, I accept the{" "}
                <Link to="/" className="text-black font-bold underline">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link to="/" className="text-black font-bold underline">
                  {" "}
                  privacy policy
                </Link>
              </div>
            </form>
          <div
            className=" text-[11px] text-center w-[400px] text-gray-500 px-1 mt-5 mb-5 sm:hidden"
            style={{
              position: "absolute",
              bottom: 10,
              width: "100%",
              textAlign: "center",
              left: "0",
            }}
          >
            By clicking continue, I accept the{" "}
            <Link to="/" className="text-black font-bold underline">
              terms of service
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-black font-bold underline">
              {" "}
              privacy policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;