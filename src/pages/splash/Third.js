import { easeIn, easeInOut, easeOut, motion as m } from "framer-motion"
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import third from "../../assets/images/login/third.png"
import styles from "./Third.module.css"

const Third = ({ clearTimeouts }) => {
  const navigate = useNavigate();
  // setTimeout(() => {
  //   navigate("/four");
  // },3000);
  const nextpage = () => {
    navigate('/login')
    clearTimeouts()
  }

  return (
    <m.div initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: easeIn, ease: easeOut }} className={`${styles.fullscreen} h-screen overflow-hidden`}>
      <img className={styles.imgup} src={third} alt="" />
      <div className="flex items-end justify-end content-end w-full h-[]">
        <Link
          to="/home"
          className=" bg-[#00000027] absolute right-[40px] top-7 px-3 py-1 text-center text-white rounded-full absolute text-lg"
        >
          skip
        </Link>
      </div>
      <div className={styles.down}>
        <span className={styles.head}>
          <p className='text-2xl tracking-widest font-bold'><span style={{ color: "#60FFDE" }}>Accomplish </span>your creative goals</p>
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
            "textAlign": "center",
            "color": "white",
            "font-size": "18px",
            "marginTop": "6px"
          }} onClick={nextpage} >Let's go</p>
        </div>
      </div>
    </m.div>
  )
}

export default Third
