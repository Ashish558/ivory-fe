import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import back from "../../assets/Back.svg";
import loginMan from "../../assets/images/login/loginMan.png";
import logo from "../../assets/images/login/logolight.png";
import { updateLoggedIn } from '../../redux/slices/user';
import { registerUser,verifyOtp } from '../../services/auth';
import styles from "./SignUp.module.css";
import Slider from "react-slick";
import SignupTree from "../../assets/images/login/signupTree.png";
import { genNumbers } from '../../utils/utils';
import './slider.css'

const settings = {
  infinite: true,
  centerPadding: "10px",
  slidesToShow: 1,
  initialSlide: 0,
  arrows: false,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 2000,
  // dots: true,
  afterChange: function (index) {
    // console.log(
    //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    // );
  }
};
const sliderData = [
  {
    textPrimary: 'Engage',
    textSec: 'in interests that sharpen your mind',
    img: loginMan,
    imgClassName: ''
  },
  {
    textPrimary: 'Engage',
    textSec: 'in interests that sharpen your mind',
    img: SignupTree,
    imgClassName: 'max-w-[270px]'
  },
]

const Dob = () => {
  const locaion = useLocation();
  const [date, setDate] = React.useState(16);
  const [date2, setDate2] = React.useState(17);
  const [date3, setDate3] = React.useState(18);
  const [year, setYear] = React.useState(1966);
  const [year2, setYear2] = React.useState(1967);
  const [year3, setYear3] = React.useState(1968);
  const [monthPosition, setMonthPosition] = React.useState(8);
  const [monthPosition2, setMonthPosition2] = React.useState(9);
  const [monthPosition3, setMonthPosition3] = React.useState(10);
  const [name, setName] = React.useState("");

  const dateSliderRef = useRef();
  const monthSliderRef = useRef();
  const yearSliderRef = useRef();

  const [totalYears, setTotalYears] = useState(genNumbers(1950, 2023))
  const [totalDates, setTotalDates] = useState(genNumbers(1, 32))
  const [dateData, setDateData] = useState({
    month: 'February',
    date: '2',
    year: '1951',
  })

  const common = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    arrows: false,
  }
  const dateSettings = {
    ...common,
    afterChange: function (currentSlide) {
      let val = totalDates[currentSlide + 1]
      if (val === undefined) {
        val = totalDates[0]
      }
      setDateData({ ...dateData, date: val })
    }
  };
  const monthsSettings = {
    ...common,
    afterChange: function (currentSlide) {
      let val = months[currentSlide + 1]
      if (val === undefined) {
        val = months[0]
      }
      setDateData({ ...dateData, month: val })
    }
  };
  const yearsSettings = {
    ...common,
    afterChange: function (currentSlide) {
      let val = totalYears[currentSlide + 1]
      if (val === undefined) {
        val = totalYears[0]
      }
      setDateData({ ...dateData, year: val })
    }
  };

  const [nameError, setNameError] = React.useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const from = locaion.state?.from || "/otp";
  const stateData = locaion?.state;
  const { otp, otp_token, phone, countryCode } = stateData;
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const goBack = () => {
    navigate(from,{
      state: {
        otp: otp,
        otp_token: otp_token,
        phone: phone,
        countryCode: countryCode,
      
    } });
  };
  const handleDate = (e) => {
    // e.preventDefault();

    if (e.deltaY > 0) {

      if (date2 < 30) {
        setDate(date + 1);
        setDate2(date2 + 1);
        setDate3(date3 + 1);
      }
      // if (date2 === 31) {
      //   setDate3(1);
      // }
      // if (date2 === 1) {
      //   setDate(31);
      // }
    } else {
      if (date2 >= 2) {
        setDate(date - 1);
        setDate2(date2 - 1);
        setDate3(date3 - 1);
      }
      // if (date2 === 1) {
      //   setDate(31);
      // }
      // if (date2 === 31) {
      //   setDate3(31);
      // }
    }
  };
  const handleYear = (e) => {
    // e.preventDefault();
    if (e.deltaY > 0) {
      setYear(year + 1);
      setYear2(year2 + 1);
      setYear3(year3 + 1);
    } else {
      setYear(year - 1);
      setYear2(year2 - 1);
      setYear3(year3 - 1);
    }
  };
  const handleMonth = (e) => {
    // e.preventDefault();
    if (e.deltaY > 0) {
      if (monthPosition2 < 11) {

        setMonthPosition(monthPosition + 1);
        setMonthPosition2(monthPosition2 + 1);
        setMonthPosition3(monthPosition3 + 1);
        // if (monthPosition2 === 11) {
        //   setMonthPosition3(0);
        // }
        // if (monthPosition2 === 11) {
        //   setMonthPosition3(11);
        // }
      }
      if (monthPosition2 === 1) {
        setMonthPosition(1);
      }
    } else {
      if (monthPosition2 > 0) {
        setMonthPosition(monthPosition - 1);
        setMonthPosition2(monthPosition2 - 1);
        setMonthPosition3(monthPosition3 - 1);
      }
      if (monthPosition2 === 1) {
        setMonthPosition(11);
      }
    }
  }
  const data = {
    name,
    date: year2 + "-" + monthPosition2 + "-" + date2,
  };
  const handleReg = (e) => {
    e.preventDefault();
    console.log(data.name);
    const body = {
      country_code: countryCode,
      mobile_no: phone,
      otp: otp,
      otp_token: otp_token,
      name: name,
      dob: data.date,
    };
    const verifyBody = {
      country_code: countryCode,
      mobile_no: phone,
      otp: otp,
      otp_token: otp_token,
    };
    registerUser(body)
      .then((res) => {
        verifyOtp(verifyBody)
          .then((res) => {
            navigate("/congrates");
            const { refresh_token, access_token } = res.data.data
            dispatch(updateLoggedIn({ loggedIn: true }))
            localStorage.setItem('access', access_token)
            localStorage.setItem('refresh', refresh_token)
            localStorage.setItem('phone', phone)
          })
          .catch((err) => {
            console.log(err.response.data.error);
          });

      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }
  const handleName = (e) => {
    const { value } = e.target;
    // name should not be any number
    if (value.match(/^[a-zA-Z ]*$/)) {
      setNameError("")
      console.log(value);
      setName(value);
    } else {
      setNameError("Name should not contain any number");

      setName("");
    }


  }

  // console.log('dates', totalDates);
  // console.log('years', totalYears);
  console.log('dateData', dateData);

  return (
    <div className="h-screen overflow-x-hidden   bg-[#EEFDFC]">
      <div className="topAppBar mt-10 ml-8 sm:hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={back} alt="" onClick={goBack} />
          </div>
        </div>
      </div>
      <div className="sm:flex min-h-[100px] lg:min-h-[600px] overflow-y-auto  justify-around w-screen mt-0 sm:m-0">
        <div
          className="hidden sm:flex flex flex-col items-center min-h-screen self-stretch sm:w-[40vw]"
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
        <div className="mt-10 h-scren lg:h-auto sm:w-[60vw] sm:flex sm:flex-col sm:items-center sm:justify-center">
          <form
            onSubmit={handleReg}
            className="sm:w-[300px] mx-auto sm:flex sm:flex-col sm:justify-start"
          >
            <div className=" w-[300px] mx-auto relative">
              <h1 className="text-2xl font-bold  sm:ml-0 mb-6">
                &#128588; Create an account
              </h1>
              <label className="ml-2 sm:ml-0  font-semibold text-lg sm:text-xl ">
                Name
              </label>
              <input
                className=" w-full sm:w-[300px]  px-4 py-4 sm:py-4 text-gray-700 bg-white border  border-gray-400 shadow-sm placeholder-gray-400  focus:ring-opacity-40 focus:outline-none   justify-center flex mx-auto  rounded-md sm:rounded-md sm:ml-0 mt-5 sm:text-lg"
                type="text"
                placeholder="Name"
                onChange={(e) => handleName(e)}
                required
              />
              <p className="text-red-500 text-sm">{nameError}</p>
            </div>

            {/* <div className="mt-8  ">
              <h1 className="sm:ml-0 font-semibold text-lg mx-auto w-[300px]">
                Date Of Birth
              </h1>
              <div className="mt-2">
                <div className="flex items-center justify-between w-[225px]  mx-auto">
                  <div className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3">
                    {date}
                  </div>
                  <div className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3 ">
                    {months[monthPosition]}
                  </div>
                  <div className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3 ">
                    {year}
                  </div>
                </div>
              </div>
              <div className="mt-">
                <div className="flex items-center justify-center w-[300px] mx-auto bg-blue-200  rounded px-5">
                  <div
                    className="text-gray-700 text-2xl font-semibold border-b py-3 border-gray-400  px-2 w-10 bg-transparent mx-auto text-center "
                    
                    onTouchMove={handleDate}
                    onWheel={handleDate}
                  >
                    {date2}
                  </div>
                  <div
                    className="text-gray-700 text-2xl font-semibold border-b py-3 border-gray-400 w-[100px] bg-transparent mx-auto text-center "
                    
                    onTouchMove={handleMonth} 
                    onWheel={handleMonth} 
                  >
                    {months[monthPosition2]}
                  </div>
                  <div
                    className="text-gray-700 text-2xl font-semibold border-b py-3 border-gray-400 px-3 w-[70px]  bg-transparent text-center "
                    
                    onWheel={handleYear} onTouchMove={handleYear}
                  >
                    {year2}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between w-[225px] mx-auto ">
                  <div className="text-gray-400 text-lg  py-3 border-gray-400 px-3 ">
                    {date3}
                  </div>
                  <div className="text-gray-400 text-lg  py-3 border-gray-400 px-3 ">
                    {months[monthPosition3]}
                  </div>
                  <div className="text-gray-400 text-lg  py-3 border-gray-400 px-3 ">
                    {year3}
                  </div>
                </div>
              </div>
            </div> */}

            <div className='flex items-center  mt-8'>
              <Slider {...dateSettings} className={` h-[200px] w-[80px] dateSlider`} ref={dateSliderRef} >
                {totalDates.map(str => {
                  return <div className='px-2 py-4 flex justify-center items-center text-center'>
                    <p> {str} </p>
                  </div>
                })}
              </Slider>
              <Slider {...monthsSettings} className=' h-[200px] w-[130px] dateSlider' ref={monthSliderRef} >
                {months.map(str => {
                  return <div className='px-2 py-4 flex justify-center items-center text-center'>
                    <p> {str} </p>
                  </div>
                })}
              </Slider>
              <Slider {...yearsSettings} className=' h-[200px] w-[80px] dateSlider' ref={yearSliderRef} >
                {totalYears.map(str => {
                  return <div className='px-2 py-4 flex justify-center items-center text-center'>
                    <p> {str} </p>
                  </div>
                })}
              </Slider>
            </div>
            <div className="flex items-center justify-between mt-4">
              {nameError ? (
                <button
                  className="bg-[#B5CFEC] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-5 mb-5"
                  disabled
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-[80vw] sm:w-[300px] text-center justify-center flex mx-auto mt-2"
                >
                  Continue
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dob;