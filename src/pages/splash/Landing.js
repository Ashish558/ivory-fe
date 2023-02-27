import React from 'react'
import styles from "./Landing.module.css"
import slideimage1 from "../../assets/slideimage1.png"
import { Link, useNavigate } from 'react-router-dom'
import {delay, easeIn, easeInOut, easeOut, motion as m} from "framer-motion"

const Landing = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/second")
  }, 3000);
  const nextpage = () => {
    
  }
  return (
    <>
      <m.div initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.7,ease: easeIn,ease: easeOut }} className={`${styles.fullscreen} h-screen overflow-hidden`}>
      
      <img className={styles.imgup} src={slideimage1} alt="" />
      <div className={styles.down}>
        <span className={styles.head}>
            <p className='text-2xl tracking-widest font-bold'>Tailored for adults <span style={{color:"#60FFDE"}}> above 50</span></p>
        </span>
        <div className={styles.circles}>
            <div className={styles.CircleShape1} >
                
            </div>
            <div className={styles.CircleShape2} >
                
            </div>
            <div className={styles.CircleShape3} >
                
            </div>
            <div className={styles.CircleShape4} >
                
            </div>
        </div>
        <div className={styles.button}>
            <p style={{
              "textAlign":"center",
              "color":"white",
              "font-size": "18px",
              "marginTop": "6px"
          
            }} onClick={nextpage}>Let's go</p>
        </div>
      </div>
    </m.div>
    </>
  )
}

export default Landing
