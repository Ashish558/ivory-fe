import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

import useRazorpay from "react-razorpay";
import { useNavigate, useParams } from "react-router-dom";
import shareImg from "../../../assets/images/learn/share.svg";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton";
import {
  createUserProgram,
  enrollProgram,
  getPrograms,
  getSingleProgram,
  getUserPrograms,
} from "../../../services/program";
import {
  getPricingDiscountedText,
  getPricingMainText,
} from "../../../utils/utils";
import ProgramCard from "../../../components/ProgramCard/ProgramCard";

const Enroll = () => {
  //enrollType "", "reg", "free"
  const [enrollType, setEnrollType] = useState("reg");
  const [enrollStatus, setEnrollStatus] = useState("");
  const [programData, setProgramData] = useState({});
  const { id } = useParams();
  const { loggedIn, profileData } = useSelector((state) => state.user);
  const [programExist, setProgramExist] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userProgramId, setUserProgramId] = useState(null);
  const Razorpay = useRazorpay();
  const [allPrograms, setAllPrograms] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getSingleProgram(id, loggedIn)
      .then((res) => {
        console.log("resp", res);
        if (!res.data.data) return;
        setProgramData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id, loggedIn]);

  useEffect(() => {
    getPrograms()
      .then(res => {
        if (res.data.data === null) return setAllPrograms([])
        // console.log('programs', res.data.data);
        let data = res.data.data.filter(program => program.id !== parseInt(id))
        setAllPrograms(data)
      }).catch(err => {
        console.log(err.response);
      })
  }, [])

  const handleEnroll = () => {
    // console.log('asda');
    if (!loggedIn) {
      navigate('/login')
    }
    const body = {
      state: 'na',
      payment_status: 'na',
      program: id,
    }
    if (programExist === true) {
      enrollforProgram(userProgramId)
      return
    }
    createUserProgram(body)
      .then(programResp => {
        console.log('program resp', programResp.data);
        enrollforProgram(programResp.data.data.id)
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 406) {
          enrollforProgram()
        }
      })
  }

  const enrollforProgram = (userProgramId) => {
    enrollProgram(userProgramId)
      .then((res) => {
        fetchUserPrograms();
        console.log("enroll resp", res.data.data);
        const { state, payment_status, order_id } = res.data.data;
        if (order_id === null) {
        } else {
          handlePayment(order_id);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getPrefillData = () => {
    if (profileData.name) {
      return {
        name: profileData.name,
        email: profileData.email,
        contact: profileData.mobile_no,
      };
    } else {
      return {};
    }
  };

  const handlePayment = async (order_id) => {
    const options = {
      key: "rzp_test_npF0jgKQZLUW02", // Enter the Key ID generated from the Dashboard
      name: "Ivory",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        console.log(response);
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        fetchUserPrograms();
      },
      prefill: getPrefillData(),
      notes: {
        address: "Razorpay address",
      },
      theme: {
        color: "#1B72C0",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      console.log(response);
      fetchUserPrograms();
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  const fetchUserPrograms = () => {
    getUserPrograms()
      .then((res) => {
        if (res.data.data === null) return;
        console.log("all programs", res.data.data);
        res.data.data.forEach((item) => {
          if (item.program.id === parseInt(id)) {
            setProgramExist(true);
            setUserProgramId(item.id);
            if (item.state === "enrolled") {
              setIsEnrolled(true);
            }
          }
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    fetchUserPrograms();
  }, []);
  // console.log("programData", programData);
  // console.log("programExist", programExist);
  // console.log("isEnrolled", isEnrolled);
  // console.log('user', profileData);
  // console.log('allPrograms', allPrograms);

  const {
    image,
    name,
    description,
    live_sessions_count,
    modules_duration,
    price,
    discounted_price,
    benefits,
    next_batch_start_date,
    contents,
    discount,
    is_free,
  } = programData;
  const navToLearn = (categoryId) => {
    navigate(`/learn`);
  };
  return (
    <div className=" sm:mx-20 mb-20">
      <div className="text-gray-500 text-lg ml-6 lg:ml-0 mt-20 cursor-pointer mb-10">
        <span onClick={() => navToLearn()}>Programs </span>
        {">"} {name}
      </div>
      <div className=" lg:flex">
        <div className="lg:w-[calc(100%-400px)]">
          <div className="flex flex-col gap-5 mb-20 sm:mb-0">
            <div className="text-2xl font-bold text-black ml-6 lg:ml-0 mt-3 mb-2">
              {name}
            </div>
            <div className="video flex justify-center items-center relative">
              <img
                src={image}
                alt="video"
                className="w-full sm:rounded-[48px] md:max-h-[492px] object-cover"
              />
              {/* <img src={playIcon} alt="" className="absolute" /> */}
            </div>
            <div className="text-2xl font-bold text-black ml-6 lg:ml-0 mt-4">
              About this Program
            </div>
            <div className="text-gray-500 text-lg ml-6 lg:ml-0">
              <div dangerouslySetInnerHTML={{ __html: description }} />
              {/* {description.length > 150 && (
                <span className="text-blue-500"> See more</span>
              )} */}
              {/* <span className="text-blue-500"> See more</span> */}
            </div>
            <div className="">
              <div className="text-2xl font-bold text-black ml-6 lg:ml-0">
                Benefits
              </div>
              <div className="">
                <div className="flex flex-col gap-6 mb-5 sm:mb-0 mt-10 ml-6 lg:ml-0">
                  <ul className=" flex  flex-col gap-4 leading-none text-sm">
                    {benefits?.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold"
                        >
                          <img src={item.icon} alt="" />
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold text-black ml-6 lg:ml-0">
                {" "}
                Pricing{" "}
              </div>
              {/* conditionally renders on free, reg ,  */}
              <div>
                <div className="text-lightGray text-lg ml-6 lg:ml-0 py-2 my-3">
                  Next Batch starts
                  <span className="text-blue-600">
                    {next_batch_start_date
                      ? next_batch_start_date
                      : " Yet to be scheduled"}
                  </span>
                </div>{" "}
                <div className="text-2xl font-bold text-black ml-6 lg:ml-0 flex items-center gap-1 mb-3">
                  {getPricingMainText(
                    is_free,
                    price,
                    discounted_price,
                    discount
                  )}
                  <span className="text-gray-400 line-through font-normal text-base">
                    {getPricingDiscountedText(
                      is_free,
                      price,
                      discounted_price,
                      discount
                    )}
                  </span>{" "}
                  {discount > 0 && !is_free && (
                    <span className="text-blue-500 text-lg ml-2">
                      {" "}
                      {(discounted_price * 100) / price}% OFF
                    </span>
                  )}
                </div>
              </div>
              {next_batch_start_date === null && (
                <div className="text-[#C16901] text-sm font-medium mx-6 sm:mx-0">
                  To participate in the program, simply register for free. Once
                  batches are scheduled, you will be notified. If the timings
                  align with your schedule, you can choose to enroll in one of
                  the available batches by making a payment
                </div>
              )}
            </div>
            <div className="sm:flex sm:mb-10 flex-col sm:flex-row flex">
              {isEnrolled ?
                <SecondaryButton
                  children={"Already Enrolled"}
                  // onClick={handleEnroll}
                  className="w-full pt-2 lg:w-[40%] pb-2  w-[90%] mr-3"
                /> :
                <button
                  className="bg-[#EEFCFF] lg:w-[40%] w-[90%] text-sky-900 font-semibold py-2 px-4 rounded-full border border-blue-400 mb-3 sm:mb-0 mx-5 sm:mx-0"
                  onClick={handleEnroll}
                >
                  {next_batch_start_date === null
                    ? "Register for free"
                    : is_free
                      ? "Enroll for free"
                      : "Enroll"}
                </button>
              }
              <button className="bg-white text-[#1B72C0] font-semibold py-2 lg:w-[40%] w-[90%] rounded-full border border-[#1B72C0]  self-center flex justify-center items-center gap-3 md:ml-3">
                {" "}
                <img src={shareImg} alt="" />
                <span> Share</span>
              </button>
            </div>
            <div className=" sm:mx-0 shadow-sm rounded-xl  border-t border-gray-100 lg:w-[336px] pb-8 w-[90%] mx-auto p-5">
              <div className="text-2xl font-bold text-black ml-6 mt-3">
                Program content
              </div>
              <div className="">
                <div className="flex flex-col gap-6 mb-5 sm:mb-0 mt-6 ml-6">
                  <ul className=" flex  flex-col gap-5 leading-none text-sm">
                    {contents?.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="mr-8 flex justify-start items-center gap-2 text-normal font-semibold"
                        >
                          <img
                            src={item.icon}
                            alt=""
                            className="bg-[#EEFCFF] p-3 rounded-md"
                          />
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="">
            <div className="text-2xl font-bold text-black ml-6 lg:ml-0 my-3 mt-5">
              Similar Programs
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 "></div>
          <div className="lg:flex justify-end w-full hidden ">
            <span className="ml-auto mr-3 text-blue-600 text-lg">See all</span>
          </div>
          <div className="lg:grid lg:grid-cols-3  mt-50 overflow-x-scroll lg:overflow-hidden" >
            {allPrograms.map((item, index) => (
              <ProgramCard key={item.id} {...item} />
            ))}
          </div> */}
          {/* conditionally render on register successfully */}
          {/* {enrollStatus === "enrolled" ? (
            <div className="enrollFooter bg-sky-100 border-2 border-blue-400 flex flex-col py-5 mb-20 lg:hidden">
              <button className="bg-sky-100 text-black font-semibold py-2 w-[90%] rounded-full mx-auto  self-center flex justify-center">
                <img src={greenTik} className="h-[30px] pb-1 px-3" alt="" />{" "}
                Enrolled Successfully
              </button>
            </div>
          ) : (
            <div className="enrollFooter bg-sky-100 border-2 border-blue-400 flex flex-col py-5 mb-20 lg:hidden">
              <div className="text-lightGray text-lg ml-6 lg:ml-0">
                {enrollType === "" && (
                  <span>
                    Batch starts
                    <span className="text-blue-500">
                      20-Feb-2023
                    </span>
                  </span>
                )}
                <button className="bg-blue-800 text-white font-semibold py-2 w-[90%] rounded-full border mx-auto  self-center"    onClick={handleEnroll}>
                  {" "}
                  {
                    next_batch_start_date === null ?
                      "Register for free" :
                      is_free ?
                        "Enroll for free" :
                        "Enroll"
                  }
                </button> */}
          {/* </div> */}
          {/* </div>
          )} */}
        </div>
        <div className="w-[400px] mt-16 pt-3 ml-5 hidden lg:block">
          <div className="enrollFooter bg-sky-100   flex flex-col py-10 mb-20 rounded-[48px] p-3">
            <div className="text-2xl font-bold text-black ml-6 mb-5">
              {name}
            </div>
            <div className="text-lightGray text-lg ml-6  mb-2 mt-10">
              <span className="text-sm">
                Batch starts
                <span className="text-blue-500">
                  {next_batch_start_date
                    ? next_batch_start_date
                    : "Yet to be scheduled"}
                </span>
              </span>
              <div className="text-4xl font-medium text-black flex items-center gap-1 mt-3">
                {getPricingMainText(is_free, price, discounted_price, discount)}
                <span className="text-lightGray line-through font-normal text-[16px]">
                  {getPricingDiscountedText(
                    is_free,
                    price,
                    discounted_price,
                    discount
                  )}
                </span>{" "}
                {discount > 0 && !is_free && (
                  <span className="text-blue-500 text-[16px] ml-2">
                    {(discounted_price * 100) / price}% OFF
                  </span>
                )}
              </div>
              {isEnrolled ? (
                <SecondaryButton
                  children={"Already Enrolled"}
                  // onClick={handleEnroll}
                  className="w-ful mt-2 pt-2.5 pb-2.5  w-[90%]"
                />
              ) : (
                <PrimaryButton
                  children={
                    next_batch_start_date === null
                      ? "Register for free"
                      : is_free
                        ? "Enroll for free"
                        : "Enroll"
                  }
                  onClick={handleEnroll}
                  className="pt-2.5 mt-2 pb-2.5 w-[90%]"
                />
              )}
              <button className="bg-white text-[#1B72C0] font-semibold py-2 w-[90%] rounded-full border mt-3 border-[#1B72C0]  self-center flex justify-center items-center gap-3">
                {" "}
                <img src={shareImg} alt="" />
                <span> Share</span>
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.startActivityFooter} lg:hidden`}>
          <div className="max-w-[328px] mx-auto ">
            {isEnrolled ? (
              <SecondaryButton
                children={"Already Enrolled"}
                // onClick={handleEnroll}
                className="w-full pt-2.5 pb-2.5"
              />
            ) : (
              <PrimaryButton
                children={
                  next_batch_start_date === null
                    ? "Register for free"
                    : is_free
                      ? "Enroll for free"
                      : "Enroll"
                }
                onClick={handleEnroll}
                className="w-full pt-2.5 pb-2.5"
              />
            )}
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-2xl font-bold text-black ml-6 lg:ml-0 my-3 mt-5">
          Similar Programs
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 "></div>
      <div className="lg:flex justify-end w-full hidden ">
        <span className="ml-auto mr-3 text-blue-600 text-lg">See all</span>
      </div>
      <div className="lg:grid lg:grid-cols-3  mt-50 overflow-x-scroll lg:overflow-hidden" >
        {allPrograms.map((item, index) => (
          <ProgramCard key={item.id} {...item} scrollToTop={true} />
        ))}
      </div>
    </div>
  );
};

export default Enroll;
