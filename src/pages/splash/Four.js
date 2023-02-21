import React from 'react'
import styles from "./Four.module.css"
import four from "../../assets/images/login/four.png"
import {delay, easeIn, easeOut, motion as m} from "framer-motion"
import { Link, useNavigate } from 'react-router-dom'

const Second = () => {
  const navigate = useNavigate()
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.75,ease: easeIn,ease:easeOut }} className={`${styles.fullscreen} overflow-hidden`}>
      <div className="topAppBar ml-8 z-[9999] absolute top-16 right-0">
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
      <img className={styles.imgup} src={four} alt="" />
      <div className={styles.down}>
        <span className={styles.head}>
          <p className='text-2xl tracking-[2px] font-bold'><span style={{color:"#60FFDE"}}>Belong</span> to a community that matters </p>
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
