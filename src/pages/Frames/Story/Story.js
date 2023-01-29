import React, { useEffect, useState } from 'react'
import styles from "./story.module.css";

import BackIcon from '../../../assets/icons/back.svg'
import LikeIcon from '../../../assets/icons/like.svg'
import LikedIcon from '../../../assets/icons/liked.svg'
import ShareIcon from '../../../assets/icons/share.svg'

import StoryImg from '../../../assets/images/story-1.png'
import McqStoryImg from '../../../assets/images/story-mcq.png'
import McqCorrectImg from '../../../assets/images/mcq-correct.png'

import ReactPlayer from 'react-player/youtube'
import Mcq from './Mcq/Mcq';
import Mcq2 from './Mcq2/Mcq2';
import Sudoku from './Sudoku/Sudoku';
import QnA from './QnA/QnA';

const types = ['image', 'video', 'mcq', 'mcq2', 'sudoku', 'qna']
const url = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'

export default function Story() {

   const [storyType, setStoryType] = useState(types[5])


   return (
      <div className={styles.modalContainer}>
         <div className="w-full p-0 md:p-3 self-stretch overflow-auto">
            <div className={`w-full bg-primaryDark px-0 pt-2 md:py-9.5 md:px-9.5 flex-cl rounded-20 relative h-full overflow-auto fle z-10`}>
               <div className='flex flex-col self-stretch flex-1 overflow-auto pb-[80px]'>

                  {storyType === 'image' ?
                     <div className={styles.storyImg}>
                        <img src={StoryImg} />
                     </div>

                     : storyType === 'video' ?
                        <div className={styles.storyVideo}>
                           <ReactPlayer
                              width='100%'
                              height='80%'
                              url={url}
                              controls={true}
                           />
                        </div>
                        : storyType === 'mcq' ?
                           <Mcq />
                           : storyType === 'mcq2' ?
                              <Mcq2 />
                              : storyType === 'sudoku' ?
                                 <Sudoku />
                                 : storyType === 'qna' ?
                                 <QnA />
                                 : <></>
                  }
                  <div className={styles.backBtn}>
                     <img src={BackIcon} alt='back' />
                  </div>
                  <div className={styles.footer}>
                     <div className='flex flex-col items-center ml-auto mr-7'>
                        <img src={LikeIcon} alt='like' className='' />
                        Like
                     </div>
                     <div className='flex flex-col items-center'>
                        <img src={ShareIcon} alt='share' />
                        Share
                     </div>
                  </div>
               </div>
            </div>

            <div className={styles.modalOverlay}></div>
         </div>
      </div>
   )
}
