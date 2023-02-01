import React,{ useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import back from '../../assets/Back.svg';
import loginMan from "../../assets/images/login/loginMan.png";
import logo from "../../assets/images/login/logolight.png";
import mobileSignupTree from "../../assets/images/login/mobileSignupTree.png";
import vector from "../../assets/images/login/Vector.png";
import vector1 from "../../assets/images/login/Vector1.png";
import vector2 from "../../assets/images/login/Vector2.png";
import vector3 from "../../assets/images/login/Vector3.png";
import vector4 from "../../assets/images/login/Vector4.png";
import vector5 from "../../assets/images/login/Vector5.png";
import styles from "./Congrates.module.css";
const Congrates = () => {
    const locaion = useLocation();
    const from = locaion.state?.from || '/signup';
    const navigate = useNavigate();
    const goBack = () => {
      navigate(from, { replace: true });
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     return navigate('/home');
  //   },2000);
  // }, [navigate]);
    return (
      <div className="h-[100vh] overflow-hidden">
        
        <div className="sm:flex justify-around w-screen mt-10 sm:mt-0 sm:m-0">
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
          <div className="h-screen sm:w-[60vw] sm:flex sm:flex-col sm:items-center sm:justify-start sm:mt-48 ">
            <div className="">
              <h1
                className={`sm:text-4xl text-3xl font-bold flex justify-center text-center text-[#004499] ${styles.cusLineH}`}
              >
                Congratulations! <br /> Your account is created.
              </h1>
            </div>
            <div className="">
              <img
                src={mobileSignupTree}
                alt=""
                className="sm:hidden absolute bottom-0 w-[200px]"
              />
              <img
                src={vector}
                alt=""
                className={`sm:hidden ${styles.vector}`}
              />
              <img
                src={vector1}
                alt=""
                className={`sm:hidden ${styles.vector1}`}
              />
              <img
                src={vector2}
                alt=""
                className={`sm:hidden ${styles.vector2}`}
              />
              <img
                src={vector3}
                alt=""
                className={`sm:hidden ${styles.vector3}`}
              />
              <img
                src={vector4}
                alt=""
                className={`sm:hidden ${styles.vector4}`}
              />
              <img
                src={vector5}
                alt=""
                className={`sm:hidden ${styles.vector5}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Congrates;