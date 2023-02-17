import React, { useEffect } from 'react'
import styles from "./LogoLanding.module.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import slideimage1 from "../../assets/slideimage1.png"
import useWindowDimensions from '../../hooks/useWindowDimensions';

const LogoLanding = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width > 990) {
      navigate("/home")
    } else {
      setTimeout(() => {
        navigate("/landing")
      }, 3000)
    }
  }, [])

  return (
    <>
      
      <img src={slideimage1} className={styles.imgg} alt="" />
      <div className={styles.logoland}>
        <img src={logo} alt="" />
      </div>
      
    </>
  )
}

export default LogoLanding
