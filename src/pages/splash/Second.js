import React from 'react'
import styles from "./Second.module.css"
import slideimage2 from "../../assets/slideimage2.png"
import { useNavigate } from 'react-router-dom'
import {delay, easeIn, easeOut, motion as m} from "framer-motion"

const Second = () => {
    const navigate = useNavigate();
    const nextpage = ()=>{
    }
    setTimeout(() => {
        navigate("/third");
        // navigate("/second")
      }, 2000);
  return (
    <m.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.75 ,ease:easeOut}} className={styles.fullscreen}>
      <img className={styles.imgup} src={slideimage2} alt="" />
      <div className={styles.down}>
        <span className={styles.headsecond}>
            <p><span style={{color:"#60FFDE"}}>Engage</span> in interests that sharpen your mind </p>
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
"font-size": "22px",
"marginTop": "4px"

            }} onClick={nextpage}>Let's go</p>
        </div>
      </div>
    </m.div>
  )
}

export default Second
