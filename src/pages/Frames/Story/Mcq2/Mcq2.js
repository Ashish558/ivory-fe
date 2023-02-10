import React, { useEffect, useState } from 'react'
import styles from "./mcq.module.css";

import StoryImg from '../../../../assets/images/story-1.png'
import McqStoryImg from '../../../../assets/images/story-mcq.png'
import McqCorrectImg from '../../../../assets/images/mcq-correct.png'
import axios from 'axios';
import { getAuthHeaders } from '../../../../services/constants';

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

export default function Mcq2({ image, choices, url, updateStory, type, question}) {
   const [options, setOptions] = useState([])

   const [mcqResponse, setMcqResponse] = useState({
      selected: false,
      isCorrect: false
   })

   useEffect(() => {
      if(!choices) return
      setOptions(choices.map(choice => ({ ...choice, selected: false })))
   }, [choices])

   useEffect(() => {
      setMcqResponse({
         selected: false,
         isCorrect: false
      })
   }, [choices])

   const [optionDisabled, setOptionDisabled] = useState(false)
   let timeOutId = null

   // console.log(mcqResponse);
   // console.log(options);
   useEffect(() => {
      if (!options) return
      if (mcqResponse.selected) return
      options.map(choice => {
         if (choice.is_answered === true) {
            if (choice.is_correct === true) {
               setMcqResponse({
                  selected: true,
                  isCorrect: true
               })
               let tempOptions = options.map(item => {
                  return item.id === choice.id ? { ...item, selected: true } : { ...item, selected: false }
               })
               setOptions(tempOptions)
            } else {
               let tempOptions = options.map(item => {
                  return item.id === choice.id ? { ...item, selected: true } : { ...item, selected: false }
               })
               setOptions(tempOptions)
               setMcqResponse({
                  selected: true,
                  isCorrect: false
               })
            }
         }

      })
   }, [options])

   useEffect(() => {
      return () => {
         setOptions([])
         setMcqResponse({
            selected: false,
            isCorrect: false
         })
      }
   }, [])
   const selectAns = option => {
      console.log(option);

      axios.post(`${url}answer/`, { answer: option.id }, getAuthHeaders())
         .then(res => {
            console.log('answer res', res.data.data);
            updateStory({ ...res.data.data, type })
         }).catch(err => {
            console.log('answer err', err.data);
         })

      // return
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
      <div className={`${styles.storyMcq} lg:grid-rows-6`}>
         {
            mcqResponse.selected === true
               ?
               mcqResponse.isCorrect === true ?
                  <div className={`${styles.mcqResponseCorrect} lg:row-span-4`}>
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
                     <div className={`${styles.mcqResponseInCorrect} lg:row-span-4`}>
                        <div className='px-4'>
                           <h1>
                              OOPS!
                           </h1>
                           <h2> Incorrect Answer. </h2>
                        </div>
                     </div>
                     : <></> :
               <div className='flx lg:row-span-4 items-center self-streth flex-1 overflow-aut lg:h-full'>
                  <img src={image} className={styles.storyImage} />
               </div>
         }
         <div className={`${styles.mcqOptions} lg:row-span-2`}>
            <p className='font-semibold mb-4' >
              {question}
            </p>
            <div className='flex flex-col gap-y-2 justify-around items-center' >
               {options.map(option => {
                  return <div key={option.id}
                     className={`w-full bg-white py-1 flex justify-center items-center font-bold rounded-full cursor-pointer ${option.selected ? `${styles.selectedOption}` : ''} ${mcqResponse.selected === true && option.is_correct === true ? `${styles.correctOption}` : ''}`}
                     onClick={() => optionDisabled === false && selectAns(option)} >
                     <p> {option.choice} </p>
                  </div>
               })}
            </div>
         </div>
      </div>
   )
}
