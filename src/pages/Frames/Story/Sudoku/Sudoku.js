import React, { useEffect, useState } from 'react'
import styles from "./sudoku.module.css";

import PlayIcon from '../../../../assets/icons/play.svg'
import EyeShowIcon from '../../../../assets/icons/eye-show.svg'
import EyeHideIcon from '../../../../assets/icons/eye-hide.svg'
import SudokuStoryImg from '../../../../assets/images/sudoku-unsolved.png'
import SudokuSolvedSImg from '../../../../assets/images/sudoku-solved.png'
import McqCorrectImg from '../../../../assets/images/mcq-correct.png'



export default function Sudoku() {


   const [answerActive, setAnswerActive] = useState(false)


   return (
      <div className={styles.storySudoku}>


         <div className='flx items-center self-streth flex-1 overflow-auto h-[342px]'>
            {
               answerActive ?
                  <img src={SudokuSolvedSImg} className={styles.storyImage} />
                  :
                  <img src={SudokuStoryImg} className={styles.storyImage} />
            }

         </div>

         <div className={styles.sudokuBottom}>
            <div className={styles.helpContainer}>
               <p className='text-[#001C38] font-semibold pr-3 flex-1'>
                  Need help? <br></br> Check how to play Sudoku
               </p>
               <div className='flex'>
                  <img src={PlayIcon} alt='play' />
               </div>
            </div>
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
