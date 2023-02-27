import React, { useEffect } from 'react'
import styles from "./LogoLanding.module.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import slideimage1 from "../../assets/slideimage1.png"
import useWindowDimensions from '../../hooks/useWindowDimensions';

const LogoLanding = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions()

  // useEffect(() => {
  //   if (width > 990) {
  //     navigate("/home")
  //   } else {
  //     setTimeout(() => {
  //       navigate("/second")
  //     }, 2500)
  //   }
  // }, [])

  return (
    <>
      <div className="topAppBar ml-8 absolute top-16 right-0">
        <div className="flex justify-between items-center">
          <div className="flex items-end justify-end content-end w-full">
            <Link
              to="/home"
              className=" bg-[#00000027] px-3 py-1 text-center mr-10 text-white rounded-full absolute text-lg"
            >
              skip
            </Link>
          </div>
        </div>
      </div>
      <img src={slideimage1} className={styles.imgg} alt="" />
      <div className={styles.logoland}>
        <img src={logo} alt="" />
      </div>
      
    </>
  )
}

export default LogoLanding
