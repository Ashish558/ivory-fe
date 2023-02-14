import React from 'react'
import styles from "./Four.module.css"
import slideimage4 from "../../assets/slideimage4.png"
import {delay, easeIn, easeOut, motion as m} from "framer-motion"
import { useNavigate } from 'react-router-dom'

const Second = () => {
  const navigate = useNavigate()
  return (
    <m.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.75 ,ease:easeOut}}  className={styles.fullscreen}>
      <img className={styles.imgup} src={slideimage4} alt="" />
      <div className={styles.down}>
        <span className={styles.head}>
            <p><span style={{color:"#60FFDE"}}>Belong</span> to a community that matters </p>
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
            }}
            onClick={()=>navigate('/login')}
            >Let's go</p>
        </div>
      </div>
    </m.div>
  )
}

export default Second
