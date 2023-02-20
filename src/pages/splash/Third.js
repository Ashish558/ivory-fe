import React from 'react'
import styles from "./Third.module.css"
import slideimage3 from "../../assets/slideimage3.png"
import { useNavigate } from 'react-router-dom'
import {delay, easeIn, easeOut, motion as m} from "framer-motion"

const Second = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate("/four");
      }, 3000);
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration: 1,ease: easeIn,ease: easeOut}} className={styles.fullscreen}>
      <img className={styles.imgup} src={slideimage3} alt="" />
      <div className={styles.down}>
        <span className={styles.head}>
          <p className='text-2xl tracking-widest font-bold'><span style={{color:"#60FFDE"}}>Accomplish </span>your creative goals</p>
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
            }} >Let's go</p>
        </div>
      </div>
    </m.div>
  )
}

export default Second
