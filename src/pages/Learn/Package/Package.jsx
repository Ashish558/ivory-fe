import React, { useEffect } from 'react';
import packageCross from "../../../assets/icons/packageCross.svg";
import packageTik from "../../../assets/icons/packageTik.svg";
import PrimaryButton from '../../../components/Buttons/PrimaryButton';

import { useLocation, useNavigate } from 'react-router-dom';
import packageBack from "../../../assets/icons/packageBack.svg";
import DesktopPackage from '../../../components/PackageTable/DesktopPackage';
import MobilePackage from '../../../components/PackageTable/MobilePackage';
import styles from "./Package.module.css";
import { getSubcriptions } from '../../../services/auth';


const Package = () => {
  const location = useLocation();
  const from = location?.state?.from || "/";


  // console.log(stateData.otpToken);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(from, { replace: true });
  };

  useEffect(() => {
    getSubcriptions()
    .then(res => {
      console.log('res', res.data.data);
    })
    .catch(err => {
      console.log('err', err);
    })
  }, [])

  //table data
  const array = [
    {
      name: "Activities",
      premium: "200+",
      free: "5"
    },

    {
      name: "Ivory on Call Support",
      premium: "200+",
      freeIcon: packageCross
    },

    {
      name: "Expert Sessions",
      premium: "200+",
      freeIcon: packageTik
    },

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
      className={`relative w-scree
      h-screen overflow-auto ${styles.cusBg} ${styles.mobileBg}`}
    >
      <div className=" h-[55vh] md:h-auto md:mt-20">
        <div className="topAppBar pt-5 ml-6 md:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={packageBack} alt="" onClick={goBack} />
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 justify-center items-center text-black px-7 pt-8 md:justify-start md:items-start md:px-28">
          <h1 className="px-7 md:px-0 font-bold md:font-inter md:font-medium md:text-[48px]">
            Try Ivory Premium today
          </h1>
          <p className="text-sm font-normal text-center md:text-base">
            Unlock the Ivory experience and transform your ageing experience
            with creativity{" "}
          </p>
        </div>

        {/* subscribtion cards*/}
        <div className="mx-auto w-[280px] md:w-auto md:justify-center flex flex-col gap-4 md:gap-10 mt-8 md:flex-row-reverse md:mt-20">
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
          <div className="h-[80px] w-[280px] flex justify-evenly items-center bg-white rounded-xl border border-[#CED4DA] text-[#74777F] ">
            <span className="font-bold text-base">3 months</span>
            <div className="flex flex-col justify-center items-center">
              <span className="font-bold text-xl">$999/- </span>
              <span className="text-base text-[#6D747A]">$1499 /- </span>
            </div>
          </div>
        </div>

      </div>
      <div className="h-[50vh] w-[100vw] absolute bottom-0 right-0 rounded-t-[48px] p-5 bg-white md:bg-transparent md:w-[1000px] md:mx-auto md:static md:mt-8">
        <table className="w-full text-center text-sm font-medium text-black ">
          <tr className=" border-b-[3px] border-primary font-bold text-base md:font-bold md:text-[26px] ">
            <th className="w-5/12 md:w-5/12 text-left "></th>
            <th className=" hidden md:block md:py-10">Free</th>
            <th className=" text-primary py-3">Premium</th>
            <th className=" md:hidden">Free</th>
            <th className={` text-primary py-3 ${styles.cusRes}`}>Premium</th>
          </tr>
          {array.map((item, index) => (
            <MobilePackage item={item} key={index}></MobilePackage>
          ))}
          {array.map((item, index) => (
            <DesktopPackage
              item={item}
              key={index}
              className={`${styles.tabelResponsive}`}
            ></DesktopPackage>
          ))}
        </table>
        <div className="w-full  md:mt-10 hidden lg:flex">
          <PrimaryButton
            children={"Pay $ 1999/-"}
            className="w-[300px] mx-auto  h-[40px]"
          />
        </div>
        <div className={`${styles.packageFooter}  lg:hidden flex`}>
          <div className=" w-full lg:hidden h-[64px] flex items-center">

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