import React, { useEffect, useState } from 'react'
import styles from "./mcq.module.css";

import McqStoryImg from '../../../../assets/images/story-mcq-2.png'
import McqCorrectImg from '../../../../assets/images/mcq-correct-2.png'
import McqIncorrectImg from '../../../../assets/images/mcq-incorrect.png'

const tempOptions = [
   {
      id: 1,
      text: '8',
      selected: false,
      correct: false,

   },
   {
      id: 2,
      text: '12',
      selected: false,
      correct: false,
   },
   {
      id: 3,
      text: '16',
      selected: false,
      correct: false,
   },
   {
      id: 4,
      text: '20',
      selected: false,
      correct: true,
   },
]

export default function Mcq2() {

   const [options, setOptions] = useState(tempOptions)

   const [mcqResponse, setMcqResponse] = useState({
      selected: false,
      isCorrect: false
   })
   const [optionDisabled, setOptionDisabled] = useState(false)
   let timeOutId = null

   const selectAns = option => {
      let updated = options.map(opt => {
         if (opt.id === option.id) {
            return { ...opt, selected: true }
         } else {
            return { ...opt, selected: false }
         }
      })
      setOptionDisabled(true)
      setOptions(updated)
      if (option.correct === true) {
         timeOutId = setTimeout(() => {
            setMcqResponse({
               selected: true,
               isCorrect: true
            })
         }, 2000);
      } else {
         timeOutId = setTimeout(() => {
            setMcqResponse({
               selected: true,
               isCorrect: false
            })
         }, 2000);
      }
   }

   useEffect(() => {


      return () => clearTimeout(timeOutId)
   }, [])

   return (
      <div className={styles.storyMcq}>
         {
            mcqResponse.selected === true
               ?
               mcqResponse.isCorrect === true ?
                  <div className={`${styles.mcqResponseCorrect}`}>
                     <div className='px-0'>
                      
                        <img src={McqCorrectImg} className={styles.storyImage} />
                     </div>
                  </div>
                  :
                  mcqResponse.isCorrect === false ?
                     <div className={`${styles.mcqResponseInCorrect}`}>
                        <div className='px-4'>
                           <h1>
                              OOPS!
                           </h1>
                           <h2> Incorrect Answer. </h2>
                        </div>
                     </div>
                     : <></> :
               <div className='flx items-center self-streth flex-1 overflow-auto h-[342px]'>
                  <img src={McqStoryImg} className={styles.storyImage} />
               </div>
         }
         <div className={styles.mcqOptions}>
            <p className='font-semibold mb-4' >
               Dharmendra and Amitabh worked together in which movie?
            </p>
            <div className='flex flex-col items-center' >
               {options.map(option => {
                  return (
                     <div key={option.id}
                        className={`mb-3 bg-white py-1 text-black self-stretch flex justify-center items-center font-bold bg-[#1B72C0] rounded-full cursor-pointer ${option.selected ? `${styles.selectedOption}` : ''} ${mcqResponse.selected === true && option.correct === true ? styles.correctOption : ''}`}
                        onClick={() => optionDisabled === false && selectAns(option)} >
                        <p> {option.text} </p>
                     </div>
                  )
               })}
            </div>
         </div>
      </div>
   )
}
