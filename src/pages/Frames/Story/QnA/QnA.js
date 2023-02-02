import React, { useEffect, useState } from 'react'
import styles from "./qna.module.css";

import StarsIcon from '../../../../assets/icons/stars.svg'
import QnaUnsolvedImg from '../../../../assets/images/qna-unsolved.png'
import QnaSolvedImg from '../../../../assets/images/qna-solved.png'
import McqCorrectImg from '../../../../assets/images/mcq-correct.png'
import axios from 'axios';
import { getAuthHeaders } from '../../../../services/constants';



export default function QnA({ image, answer_image, type, url, updateStory }) {

   const [answerActive, setAnswerActive] = useState(false)
   const [answers, setAnswers] = useState('')

   const handleSubmit = () => {
      setAnswerActive(!answerActive)
   }
   useEffect(() => {
      if (answerActive === true) {
         axios.get(`${url}submit/`, getAuthHeaders())
            .then(res => {
               console.log('submit res', res.data.data);
               updateStory({ ...res.data.data, type })
            }).catch(err => {
               console.log('submit err', err.data);
            })
      }
   }, [answerActive])
   // console.log(answerActive)
   return (
      <div className={styles.storySudoku}>
         <div className='flx items-center self-streth flex-1 overflow-aut'>
            {
               answerActive ?
                  <img src={image} className={styles.storyImage} alt='unsolved' />
                  :
                  <img src={answer_image} className={styles.storyImage} alt='solved' />
            }
         </div>

         {
            answerActive ?
               <div className={styles.sudokuAnswer}>
                  <img src={StarsIcon} className={styles.storyImage} alt='stars' />
                  <h4>
                     You submitted:
                  </h4>
                  <p className={styles.answer}>
                     {answers}
                  </p>
               </div>
               :
               <div className={styles.sudokuBottom}>
                  <p className='font-semibold text-center text-lg mb-3'>
                     Write the words you can spot:
                  </p>
                  <textarea className={styles.input} value={answers}
                     onChange={e => setAnswers(e.target.value)} />
                  <button className='flex justify-around items-center w-full disabled:opacity-60'
                     disabled={answers.trim().length === 0 ? true : false}
                     onClick={() => handleSubmit()} >
                     Submit
                  </button>
               </div>
         }

      </div>
   )
}
