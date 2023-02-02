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
import axios from 'axios';
import { getAuthHeaders } from '../../../services/constants';
import ShareModal from '../../../components/ShareModal/ShareModal';

const types = ['image', 'video', 'mcq', 'mcq2', 'sudoku', 'qna']
const url = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'

export default function Story(props) {
   const { handleClose, updateStory } = props
   let story = props.story
   let { id, image, type, liked, share_message, title, url, views } = story
   const [storyType, setStoryType] = useState(type)
   const [shareModalOpen, setShareModalOpen] = useState(false)

   const hideHtmlOverflow = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
   }

   useEffect(() => {
      hideHtmlOverflow()
   }, [shareModalOpen])

   useEffect(() => {
      hideHtmlOverflow()
      return () => {
         document.body.style.overflow = "unset";
         document.documentElement.style.overflow = "unset";
      };
   }, []);

   //view story
   useEffect(() => {
      axios.get(`${url}view/`, getAuthHeaders())
         .then(res => {
            // console.log('view res', res.data);
            updateStory({ ...res.data.data, type })
         })
         .catch(err => {
            console.log('view err', err.data);
         })
   }, [])

   const handleLike = () => {
      axios.get(`${url}like/`, getAuthHeaders())
         .then(res => {
            // console.log('like res', res.data.data);
            updateStory({ ...res.data.data, type })
         }).catch(err => {
            console.log('like err', err.data);
         })
   }

   const handleDislike = () => {
      axios.get(`${url}dislike/`, getAuthHeaders())
         .then(res => {
            // console.log('dislike res', res.data);
            updateStory({ ...res.data.data, type })
         }).catch(err => {
            console.log('dislike err', err.data);
         })
   }

   // console.log('story', story)
   return (
      <>

         <div className={styles.modalContainer}>
            <div className="w-full p-0  self-stretch overflow-aut">
               <div className={`w-full bg-primaryDark px-0 pt-2 md:py-9.5 md:px-9.5 flex-cl rounded-20 relative h-full overflow-auto fle z-10`}>
                  <div className={`flex flex-col self-stretch flex-1 overflow-aut pb-[80px] ${styles.storyContainer} `}>

                     {storyType === 'image' ?
                        <div className={styles.storyImg}>
                           <img src={image} />
                        </div>

                        : storyType === 'video' ?
                           <div className={styles.storyVideo}>
                              <ReactPlayer
                                 width='100%'
                                 height='100%'
                                 url={url}
                                 controls={true}
                              />
                           </div>
                           : storyType === 'mcq' ?
                              <Mcq {...story} />
                              : storyType === 'mcq2' ?
                                 <Mcq2 />
                                 : storyType === 'sudoku' ?
                                    <Sudoku {...story} updateStory={updateStory} />
                                    : storyType === 'qna' ?
                                       <QnA {...story} updateStory={updateStory} />
                                       : <></>
                     }
                     <div className={styles.backBtn}>
                        <img src={BackIcon} alt='back' onClick={handleClose} />
                     </div>
                     <div className={styles.footer}>
                        <div className='flex flex-col items-center ml-auto mr-7 md:mr-0 md:ml-0 md:flex-row md:mb-6'>
                           <div className={styles.iconContainer}
                              onClick={liked === false ? handleLike : handleDislike} >
                              <img src={liked === false ? LikeIcon : LikedIcon} alt='like' className='' />
                           </div>
                           Like
                        </div>
                        <div className='flex flex-col items-center md:flex-row'>
                           <div className={styles.iconContainer}
                              onClick={() => setShareModalOpen(true)} >
                              <img src={ShareIcon} alt='share' />
                           </div>
                           Share
                        </div>
                     </div>
                  </div>
               </div>

               <div className={styles.modalOverlay}></div>
            </div>
         </div>
         <ShareModal open={shareModalOpen} close={() => {
            setShareModalOpen(false);
         }} />
      </>
   )
}
