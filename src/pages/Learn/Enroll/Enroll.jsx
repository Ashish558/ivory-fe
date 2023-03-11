import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

import useRazorpay from "react-razorpay";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import greenTik from "../../../assets/images/learn/greenTik.png";
import shareImg from "../../../assets/images/learn/share.svg";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../../components/Buttons/SecondaryButton";
import ProgramCard from "../../../components/ProgramCard/ProgramCard";
import {
  createUserProgram,
  enrollProgram,
  getPrograms,
  getSingleProgram,
  getUserPrograms
} from "../../../services/program";
import {
  getPricingDiscountedText,
  getPricingMainText,
  shareLink
} from "../../../utils/utils";
import { GA_programRegister, GA_share } from "../../../services/analytics";
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

  const location = useLocation()
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
        GA_programRegister()
        // GA_share('program', programResp.data.data.program.id )
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
        navigate(`/program/${res.data.data.id}`)
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

  const onShare = () => {
    GA_share('program', programData.id)
    shareLink('ivory Program', 'ivory Program', `https://ivory-test.netlify.app${location.pathname}`)
  }


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
      <div className="text-[#74777F] text-base ml-6 lg:ml-0 lg:mt-20 cursor-pointer lg:mb-10 mt-2 font-poppins sm:text-xl sm:font-medium">
        <span onClick={() => navToLearn()}>Programs </span>
        {">"} {name}
      </div>
      <div className=" lg:flex">
        <div className="lg:w-[800px] lg:mr-16">
          <div className="flex flex-col sm:mb-0  gap-5 lg:gap-0">
            <div className=" text-xl lg:text-[40px] font-medium text-black ml-6 lg:ml-0 mt-3 lg:mb-10 font-inter">
              {name}
            </div>
            <div className="video flex justify-start items-center relative">
              <img
                src={image}
                alt="video"
                className="w-[800px] sm:rounded-[48px] md:max-h-[392px] object-cover"
              />
              {/* <img src={playIcon} alt="" className="absolute" /> */}
            </div>
            <div className="text-xl lg:text-2xl font-bold text-black ml-6 lg:ml-0 lg:mt-8 lg:mb-[17px]">
              About this Program
            </div>
            <div className="text-[#44474E] text-sm lg:text-lg ml-6 lg:ml-0 lg:mb-10">
              <div dangerouslySetInnerHTML={{ __html: description }} />
              {/* {description.length > 150 && (
                <span className="text-blue-500"> See more</span>
              )} */}
              {/* <span className="text-blue-500"> See more</span> */}
            </div>
            <div className="">
              <div className="text-xl lg:text-2xl font-bold text-black ml-6 lg:ml-0">
                Benefits
              </div>
              <div className="">
                <div className="flex flex-col gap-6 mb-5 sm:mb-0 mt-10 ml-6 lg:ml-0">
                  <ul className=" flex  flex-col gap-4 leading-none text-sm">
                    {benefits?.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="mr-8 flex justify-start items-center gap-2 text-[13px] lg:text-base font-semibold"
                        >
                          <span className="w-[32px] h-[32px] bg-[#EEFCFF] rounded-md flex justify-center items-center font-inter text-black">
                            <img src={item.icon} alt="item_icon" />
                          </span>
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xl lg:text-2xl font-bold text-black ml-6 lg:ml-0 lg:mb-6 lg:mt-10">
                {" "}
                Pricing{" "}
              </div>
              {/* conditionally renders on free, reg ,  */}
              <div>
                <div className="text-lightGray text-sm lg:text-xl ml-6 lg:ml-0 py-2 mb-3 lg:mb-5 lg:p-0">
                  Next Batch starts{" "}
                  <span className="text-[#0055BF] font-semibold text-base">
                    {next_batch_start_date
                      ? next_batch_start_date
                      : " Yet to be scheduled"}
                  </span>
                </div>{" "}
                <div className="text-4xl font-bold text-black ml-6 lg:ml-0 flex items-center gap-1 mb-3 lg:mb-11 lg:font-inter">
                  {getPricingMainText(
                    is_free,
                    price,
                    discounted_price,
                    discount
                  )}
                  <span className="text-[#939CA3] line-through font-normal text-base">
                    {getPricingDiscountedText(
                      is_free,
                      price,
                      discounted_price,
                      discount
                    )}
                  </span>{" "}
                  {discount > 0 && !is_free && (
                    <span className="text-[#0055BF] text-base lg:text-lg ml-2">
                      {" "}
                      {(discounted_price * 100) / price}% OFF
                    </span>
                  )}
                </div>
              </div>
              {next_batch_start_date === null && (
                <div className="text-[#C16901] text-sm font-medium mx-6 sm:mx-0 lg:mb-5">
                  To participate in the program, simply register for free. Once
                  batches are scheduled, you will be notified. If the timings
                  align with your schedule, you can choose to enroll in one of
                  the available batches by making a payment
                </div>
              )}
            </div>
            <div className="sm:flex sm:mb-10 flex-col sm:flex-row flex">
              {isEnrolled ? (
                <SecondaryButton
                  children={"Already Enrolled"}
                  // onClick={handleEnroll}
                  className=" pt-2 lg:w-[40%] pb-2  w-[90%]  mx-auto lg:mx-0  mb-3 lg:mb-0 bg-[#EEFCFF] text-[#9EBEE7] border border-[#9EBEE7] lg:h-[46px] text-sm"
                />
              ) : (
                <button
                  className="bg-[#EEFCFF] lg:w-[40%] w-[90%] text-[#0055BF] font-semibold py-2 px-4 rounded-full border border-primary mb-3 sm:mb-0 mx-5 sm:mx-0 lg:h-[46px] text-sm"
                  onClick={handleEnroll}
                >
                  {next_batch_start_date === null
                    ? "Register for free"
                    : is_free
                      ? "Enroll for free"
                      : "Enroll"}
                </button>
              )}

              <button
                className="bg-white text-[#0055BF] font-semibold py-2 lg:w-[40%] w-[90%] rounded-full border border-[#1B72C0]  self-center flex justify-center items-center gap-3 md:ml-3  lg:h-[46px]"
                onClick={onShare}
              >
                {" "}
                <img src={shareImg} alt="shareImg" />
                <span className="text-sm"> Share</span>
              </button>
            </div>
            <div className=" sm:mx-0 shadow-sm rounded-xl  border border-[#EBEDF0] lg:w-[336px] pb-7 w-[90%] mx-auto pt-6 pl-4">
              <div className="text-xl lg:text-2xl font-semibold text-black">
                Program content
              </div>
              <div className="">
                <div className="flex flex-col gap-6sm:mb-0 mt-5 ">
                  <ul className=" flex  flex-col gap-5 leading-none text-sm lg:text-base">
                    {contents?.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="mr-8 flex justify-start items-center gap-2 text-normal lg:text-base font-normal text-[#6D747A]"
                        >
                          <img src={item.icon} alt="item_icon" />
                          {item.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-10 mt-10">
            <div className="text-xl lg:text-2xl font-semibold text-black ml-6 lg:ml-0 mb-3 ">
              Similar Programs
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-2 gap-12 mt-50 overflow-x-scroll lg:overflow-hidden">
            {allPrograms.map((item, index) => (
              <ProgramCard key={item.id} {...item} />
            ))}
          </div>
          <div className="lg:flex justify-end w-full hidden ">
            {/* <span className="ml-auto mr-3 text-blue-600 text-lg mt-6">
              See all
            </span> */}
          </div>
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
        <div className="w-[416px] mt-16  ml-5 hidden lg:block">
          <div className="enrollFooter bg-[#EEFCFF] w-[416px]  flex flex-col py-8 mb-20 rounded-[48px] px-3 fixed top-50">
            <div className="text-2xl font-semibold text-black ml-6 mb-16">
              {name}
            </div>
            <div className="text-[#74777F] text-lg ml-6  mb-2 ">
              <span className="text-xl text-lightGray font-medium">
                Next Batch starts{" "}
                <span className="text-[#0055BF] text-2xl font-medium">
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
                  <span className="text-[#0055BF] text-[16px] ml-2">
                    {(discounted_price * 100) / price}% OFF
                  </span>
                )}
              </div>
              {isEnrolled ? (
                <SecondaryButton
                  children={"Already Enrolled"}
                  // onClick={handleEnroll}
                  className=" mt-2 pt-2.5 pb-2.5 w-[90%]  mb-3 bg-[#EEFCFF] text-[#9EBEE7] border border-[#9EBEE7] lg:h-[46px]"
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
                  className="pt-2.5  pb-2.5 w-[90%] lg:h-[46px]"
                />
              )}
              {/* <button
                className="bg-[#0055BF] text-white font-medium py-4 w-[90%] rounded-full border mx-auto  self-center my-4 mt-3 text-sm"
                onClick={handleEnroll}
              >
                {" "}
                {next_batch_start_date === null
                  ? "Register for free"
                  : is_free
                    ? "Enroll for free"
                    : "Enroll"}
              </button> */}
              <button
                className="bg-white text-[#1B72C0] font-medium w-[90%] rounded-full border border-[#1B72C0]  self-center flex justify-center items-center gap-3  h-[46px]"
                onClick={onShare}
              >
                {" "}
                <img src={shareImg} alt="shareImg" />
                <span> Share</span>
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.startActivityFooter}  lg:hidden flex`}>
          <div className=" w-full lg:hidden h-[64px] flex items-center">
            {isEnrolled ? (
              <SecondaryButton
                children={"Already enrolled"}
                // onClick={handleEnroll}
                className="w-full h-[64px]"
                img={`${greenTik}`}
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
                className="w-[90%] mx-auto  h-[40px]"
              />
            )}
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
          <ProgramCard key={item.id} {...item} scrollToTop={true} />
        ))}
      </div> 
      */}
    </div>
  );
};

export default Enroll;
