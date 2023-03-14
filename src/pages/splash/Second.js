import { easeIn, easeInOut, easeOut, motion as m } from "framer-motion"
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import slideimage2 from "../../assets/slideimage2.png"
import styles from "./Second.module.css"

const Second = ({ clearTimeouts }) => {
  const navigate = useNavigate();
  const nextpage = () => {
    navigate('/login')
    clearTimeouts()
  }
  // setTimeout(() => {
  //   navigate("/third");
  //   // navigate("/second")
  // },3000);

  return (
    <m.div initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: easeIn, ease: easeOut }} className={`${styles.fullscreen} h-screen overflow-hidden`}>
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
      <img className={styles.imgup} src={slideimage2} alt="slideimage2" />
      <div className={styles.down}>
        <span className={styles.headsecond}>
          <p className='text-2xl tracking-widest font-bold'><span style={{ color: "#60FFDE" }}>Engage</span> in interests that sharpen your mind </p>
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

          }} onClick={nextpage}>Let's go</p>
        </div>
      </div>
    </m.div>
  )
}

export default Second
