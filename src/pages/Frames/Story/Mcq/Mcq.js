import React, { useEffect, useState } from 'react'
import styles from "./mcq.module.css";

import StoryImg from '../../../../assets/images/story-1.png'
import McqStoryImg from '../../../../assets/images/story-mcq.png'
import McqCorrectImg from '../../../../assets/images/mcq-correct.png'

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

export default function Mcq({ image, choices }) {

   const [options, setOptions] = useState(choices.map(choice => ({ ...choice, selected: false })))

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
      if (option.is_correct === true) {
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
                     <img src={McqCorrectImg} className={styles.storyImage} />
                     <div className='px-4'>
                        <h2>
                           Genius
                        </h2>
                        <h2> Your answer is correct. </h2>
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
               <div className='flx items-center self-streth flex-1 overflow-aut h-[342px]'>
                  <img src={image} className={styles.storyImage} />
               </div>
         }
         <div className={styles.mcqOptions}>
            <p className='font-semibold mb-4' >
               How many differences can you spot?
            </p>
            <div className='flex justify-around items-center' >
               {options.map(option => {
                  return <div key={option.id}
                     className={`w-12 bg-white h-12 flex justify-center items-center font-bold rounded-full cursor-pointer ${option.selected ? `${styles.selectedOption}` : ''} ${mcqResponse.selected === true && option.is_correct === true ? `${styles.correctOption}` : ''}`}
                     onClick={() => optionDisabled === false && selectAns(option)} >
                     <p> {option.choice} </p>
                  </div>
               })}
            </div>
         </div>
      </div>
   )
}
