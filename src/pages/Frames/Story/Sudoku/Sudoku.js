import React, { useEffect, useState } from 'react'
import styles from "./sudoku.module.css";

import PlayIcon from '../../../../assets/icons/play.svg'
import EyeShowIcon from '../../../../assets/icons/eye-show.svg'
import EyeHideIcon from '../../../../assets/icons/eye-hide.svg'
import SudokuStoryImg from '../../../../assets/images/sudoku-unsolved.png'
import SudokuSolvedSImg from '../../../../assets/images/sudoku-solved.png'
import McqCorrectImg from '../../../../assets/images/mcq-correct.png'
import axios from 'axios';
import { getAuthHeaders } from '../../../../services/constants';



export default function Sudoku({ image, answer_image, answer_viewed, type, url, updateStory, help_link, help_text }) {


   const [answerActive, setAnswerActive] = useState(false)

   useEffect(() => {
      if (answerActive === true) {
         if (answer_viewed === true) return
         axios.get(`${url}view-answer/`, getAuthHeaders())
            .then(res => {
               console.log('view-answer res', res.data.data);
               updateStory({ ...res.data.data, type })
            }).catch(err => {
               console.log('view-answer err', err.data);
            })
      }
   }, [answerActive, answer_viewed])

   return (
      <div className={`${styles.storySudoku} lg:grid-rows-6`}>


         <div className='flx items-center self-streth flex- lg:h-full lg:row-span-4 lg:gap-y-1'>
            {
               answerActive ?
                  <img src={answer_image} className={styles.storyImage} alt='answer_image' />
                  :
                  <img src={image} className={styles.storyImage} alt='answer_image' />
            }

         </div>

         <div className={`${styles.sudokuBottom}  lg:row-span-2`}>
            {
               help_link !== null &&
               <div className={styles.helpContainer}>
                  <p className='text-[#001C38] font-semibold pr-3 flex-1'>
                     {help_text} <br></br>
                  </p>
                  <div className='flex' onClick={() => window.open(help_link)} >
                     <img src={PlayIcon} alt='play' />
                  </div>
               </div>
            }
            <button className='flex justify-around items-center w-full'
               onClick={() => setAnswerActive(!answerActive)} >
               {
                  answerActive ?
                     <>
                        <img src={EyeHideIcon} alt='play' className='mr-3' />
                        Hide Answer
                     </> :
                     <>
                        <img src={EyeShowIcon} alt='play' className='mr-3' />
                        Show Answer
                     </>
               }
            </button>
         </div>
      </div>
   )
}
