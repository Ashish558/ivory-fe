import React from 'react';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
// import SecondaryButton from '../../../components/Buttons/SecondaryButton';

import greenTik from "../../../assets/images/learn/greenTik.png";
import packageTik from "../../../assets/icons/packageTik.svg";
import packageCross from "../../../assets/icons/packageCross.svg";

import packageBack from "../../../assets/icons/packageBack.svg";
import styles from "./Package.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Package = () => {
  const location = useLocation();
  const from = location?.state?.from || "/";
  

    // console.log(stateData.otpToken);
    const navigate = useNavigate();
    const goBack = () => {
      navigate(from, { replace: true });
  };
  

  const array = [
    { name: "Activities", premium: "200+", free: "5" },
    { name: "Ivory on Call Support", premium: "200+", freeIcon: packageCross },
    { name: "Expert Sessions", premium: "200+", freeIcon: packageTik },
    {
      name: "Community Access",
      premiumIcon: packageTik,
      freeIcon: packageCross,
    },
    {
      name: "Discount on Paid Programs",
      premium: "200+",
      freeIcon: packageCross,
    },
  ];
    return (
      <div
        className="relative w-scree
      h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 85, 191, 0.28) 1.84%, rgba(89, 227, 255, 0.28) 130.78%), #FFFFFF",
        }}
      >
        <div className=" h-[55vh] md:h-auto md:mt-20">
          <div className="topAppBar pt-5 ml-6 md:hidden">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={packageBack} alt="" onClick={goBack} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center text-black px-7 pt-8 md:justify-start md:items-start">
            <h1 className="px-7 font-bold md:font-inter md:font-medium md:text-3">Try Ivory Premium today</h1>
            <p className="text-sm font-normal text-center">
              Unlock the Ivory experience and transform your ageing experience
              with creativity{" "}
            </p>
          </div>
          <div className="mx-auto w-[280px] flex flex-col gap-4 mt-8">
            <div
              className="h-[80px] w-[280px] bg-gradient-to-b from-blue-500 to-[#59E3FF] flex justify-center items-center rounded-xl"
              style={{ boxShadow: " 0px 4px 10px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="h-[74px] w-[274px]  flex justify-evenly items-center bg-[#BDF4FF] rounded-xl mx-auto">
                <span className="font-bold text-base">12 months</span>
                <div className="flex flex-col justify-center items-center">
                  <span className="font-bold text-xl">$1999/- </span>
                  <span className="text-base text-[#6D747A]">$3999 /-</span>
                </div>
              </div>
            </div>
            <div className="h-[80px] w-[280px] flex justify-evenly items-center bg-white rounded-xl border border-[#CED4DA] text-[#74777F]">
              <span className="font-bold text-base">3 months</span>
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold text-xl">$999/- </span>
                <span className="text-base text-[#6D747A]">$1499 /- </span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[50vh] w-[100vw] absolute bottom-0 right-0 rounded-t-[48px] p-5 bg-white">
          <table className="w-full text-center text-sm font-medium text-black">
            <tr className=" border-b-[3px] border-primary font-bold text-base">
              <th className="w-5/12 text-left"></th>
              <th className=" text-primary py-3">Premium</th>
              <th className="">Free</th>
            </tr>
            {array.map((item, index) => (
              <tr className="text-center border-b border-gray-300 ">
                <td className="py-3 text-sm font-medium text-left">
                  {item.name}
                </td>
                {item?.premium ? (
                  <td className="text-sm font-medium text-[#26A925]">
                    {item.premium}
                  </td>
                ) : (
                  <td className=" ">
                    <img src={item.premiumIcon} className="m-auto" alt="" />
                  </td>
                )}

                {item?.free ? (
                  <td className="text-sm font-medium text-[#26A925]">
                    {item.free}
                  </td>
                ) : (
                  <td className="">
                    <img src={item.freeIcon} className="mx-auto" alt="" />
                  </td>
                )}
              </tr>
            ))}
          </table>
          <div className={`${styles.startActivityFooter}  lg:hidden flex`}>
            <div className=" w-full lg:hidden h-[64px] flex items-center">
              {/*              
                <SecondaryButton
                  children={"Already enrolled"}
                  // onClick={handleEnroll}
                  className="w-full h-[64px]"
                  img={`${greenTik}`}
                /> */}
              <PrimaryButton
                children={"Pay $ 1999/-"}
                className="w-[90%] mx-auto  h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Package;