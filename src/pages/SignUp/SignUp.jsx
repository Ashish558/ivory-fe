import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateLoggedIn } from '../../redux/slices/user';
import { registerUser, verifyOtp } from '../../services/auth';


const SignUp = () => {
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
   const dispatch = useDispatch()

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

   const navigate = useNavigate();
   const goBack = () => {
      navigate(from, { replace: true });
   };
   const handleDate = (e) => {
      // e.preventDefault();

      if (e.deltaY > 0) {

         if (date2 <= 30) {
            setDate(date + 1);
            setDate2(date2 + 1);
            setDate3(date3 + 1);
         }
         // if (date2 === 31) {
         //   setDate3(1);
         // }
         if (date2 === 1) {
            setDate(31);
         }
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
            // console.log(res.data);
            verifyOtp(verifyBody)
               .then((res) => {
                  console.log('verify', res.data);
                  dispatch(updateLoggedIn({ loggedIn: true }))
                  const { refresh_token, access_token } = res.data.data
                  localStorage.setItem('access', access_token)
                  localStorage.setItem('refresh', refresh_token)
               })
            navigate("/home");
         })
         .catch((err) => {
            console.log(err.response.data.error);
         });
   }

   return (
      <div
         className="h-[90vh] overflow-hidden"
         style={{ background: "rgb(211, 230, 254,.2)" }}
      >
         <div className="mt-10">
            <h1 className="text-2xl font-bold ml-8">
               &#128588; Create an account
            </h1>
            <form onSubmit={handleReg}>
               <div className="w-full mt-4 relative">
                  <label className="ml-8 font-semibold text-lg">Name</label>
                  <input
                     className=" w-10/12 sm:w-auto  px-4 py-2 mt-2 text-gray-700 bg-white border  border-black placeholder-gray-400  focus:ring-opacity-40 focus:outline-none   justify-center flex mx-auto  rounded-xl ml-8"
                     type="text"
                     placeholder="Name" onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div className="mt-8">
                  <label className="ml-8 font-semibold text-lg">
                     Date Of Birth
                  </label>
                  <div className="mt-2">

                     <div className="flex items-center justify-between w-[225px] mx-auto">
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
                  <div className="mt-2">

                     <div className="flex items-center justify-center w-[300px] mx-auto bg-blue-200  rounded px-5">
                        <input
                           className="text-gray-700 text-xl font-semibold border-b py-3 border-gray-400  px-2 w-10 bg-transparent mx-auto text-center "
                           onWheel={handleDate}
                           name="date"
                           type="text"
                           value={date2}
                        />

                        <input
                           className="text-gray-700 text-xl font-semibold border-b py-3 border-gray-400 w-[100px] bg-transparent mx-auto text-center "
                           onWheel={handleMonth}
                           name="month"
                           value={months[monthPosition2]}
                        />
                        <input
                           className="text-gray-700 text-xl font-semibold border-b py-3 border-gray-400 px-3 w-[70px]  bg-transparent text-center "
                           onWheel={handleYear}
                           type="text"
                           name="year"
                           value={year2}
                        />
                     </div>
                  </div>
                  <div className="mt-2">
                     {/* <ul className="w-10/12 mx-auto flex flex-col">
                  <li className="bg-gray-30">
                    <ul className="flex items-center justify-center gap-5">
                      <li className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3">
                        17
                      </li>
                      <li className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3 ">
                        September
                      </li>
                      <li className="text-gray-400 text-lg border-b py-3 border-gray-400 px-3 ">
                        1967
                      </li>
                    </ul>
                  </li>
                  <li className="bg-blue-200  rounded">
                    <ul className=" flex items-center justify-center gap-4">
                      <li className="  text-2xl font-bold border-b py-3 border-gray-600 px-2">
                        18
                      </li>
                      <li className="text-2xl font-bold border-b py-3 border-gray-600 px-2">
                        {" "}
                        October
                      </li>
                      <li className="text-2xl font-bold border-b py-3 border-gray-600 px-2">
                        1968
                      </li>
                    </ul>
                  </li>
                  <li>
                    <ul className="flex items-center justify-center gap-5">
                      <li className="text-gray-400 text-lg py-3 px-3">19</li>
                      <li className="text-gray-400 text-lg py-3 px-3">
                        November
                      </li>
                      <li className="text-gray-400 text-lg py-3 px-3">1969</li>
                    </ul>
                  </li>
                </ul> */}
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
               </div>
               <div className="flex items-center justify-between mt-4">
                  <button
                     type="submit"

                     className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-2"
                  >
                     Continue
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default SignUp;