import React from 'react'
import style from './styles.module.css'

export default function Toggle({ handleClick, active }) {


   return (
      <div className={`${style.toggle} ${active ? 'bg-[#CED4DA]' : ' bg-[#0055BF]'} border-0`}
         onClick={handleClick}>
         {active ? <div className={style.toggle_left}></div> :
            <div className={style.toggle_right}></div>}
      </div>
   )
}
