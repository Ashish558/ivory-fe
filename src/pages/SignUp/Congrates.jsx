import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import back from '../../assets/Back.svg';
import loginMan from "../../assets/images/login/loginMan.png";
import logo from "../../assets/images/login/logolight.png";
import smile from '../../assets/smile.png';
import styles from "./Congrates.module.css";
const Congrates = () => {
    const locaion = useLocation();
    const from = locaion.state?.from || '/signup';
    const navigate = useNavigate();
    const goBack = () => {
      navigate(from, { replace: true });
    };
    return (
      <div className="h-screen overflow-hidden">
        <div className="topAppBar mt-10 ml-8 sm:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={back} alt="" onClick={goBack} />
            </div>
          </div>
        </div>
        <div className="sm:flex justify-around w-screen mt-10 sm:m-0">
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
                className={`text-4xl font-bold text-sky-50 mt-20 ${styles.cusStyle}`}
              >
                <span className="text-[#59E3FF]">Accomplish</span> your creative
                goals
              </h1>
            </div>
            <div className="flex justify-center items-center px-10 content-center mt-20 ">
              <img src={loginMan} alt="" className="" />
            </div>
          </div>
          <div className="h-screen sm:w-[60vw] sm:flex sm:flex-col sm:items-center sm:justify-start justify-center mt-48 ">
            <div className=''>
              <h1
                className={`text-4xl font-bold  text-[#004499] ${styles.cusLineH}`}
              >
                Congratulations! <br /> Your account is created.
              </h1>
            </div>
            <img src={smile} alt="" className="sm:hidden" />
          </div>
        </div>
      </div>
    );
};

export default Congrates;