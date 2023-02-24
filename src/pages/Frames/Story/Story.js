import React, { useEffect, useState } from 'react';
import styles from "./story.module.css";

import BackIcon from '../../../assets/icons/back.svg';
import LeftIcon from '../../../assets/icons/left.svg';
import LikeIcon from '../../../assets/icons/like.svg';
import LikedIcon from '../../../assets/icons/liked.svg';
import RightIcon from '../../../assets/icons/right.svg';
import ShareIcon from '../../../assets/icons/share.svg';

import Logo from '../../../assets/images/logo.png';

import axios from 'axios';
import ShareModal from '../../../components/ShareModal/ShareModal';
import { getAuthHeaders } from '../../../services/constants';
import Mcq from './Mcq/Mcq';
import Mcq2 from './Mcq2/Mcq2';
import QnA from './QnA/QnA';
import Sudoku from './Sudoku/Sudoku';
import ReactPlayer from 'react-player';
import { convertLinkToDataUrl, isValidYoutubeLink, toDataURL } from '../../../utils/utils';

const types = ['image', 'video', 'mcq', 'mcq2', 'sudoku', 'qna']
const url = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'

export default function Story(props) {
   const { handleClose, updateStory, selectNextStory, selectPrevStory, selectedIndex, isSingle } = props
   let story = props.story
   let { id, image, type, liked, share_message, title, url, views, video } = story
   const [storyType, setStoryType] = useState(type)
   const [shareModalOpen, setShareModalOpen] = useState(false)

   const hideHtmlOverflow = () => {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
   }

   useEffect(() => {
      if (type === 'mcq') {
         let isSngleLetteredAnswer = true
         story.choices.forEach(choice => {
            if (choice.choice.length > 3) {
               isSngleLetteredAnswer = false
            }
         })
         if (isSngleLetteredAnswer === true) {
            setStoryType(type)
         } else {
            setStoryType('mcq2')
         }
      } else {
         setStoryType(type)
      }
   }, [type, image])

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
   }, [selectedIndex])

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
   const shareStory = () => {
      console.log('image', image);
      convertLinkToDataUrl(image, (res)=>{
         console.log('res', res);
      })
      if (navigator.share) {
         navigator.share({
            title: 'Ivory Story',
            text: share_message ? share_message : 'Ivory Activity',
            url: `https://ivory-test.netlify.app/home?type=${story.type}&id=${story.id}`,
            // files: [image]
         })
            .then(() => console.log('Successful share'))
            .catch(error => console.log('Error sharing:', error));
      }
      // console.log(location.pathname);
      // setShareModalOpen(true);
   }
   // console.log('story', storyType)
   // console.log('story', story)
   // console.log('video', video)
   // console.log('share_message', share_message)
   let storyProps = { url, updateStory, type }
   // let video = 'https://www.youtube.com/watch?v=GGo3MVBFr1A'
   return (
      <>

         <div className={styles.modalContainer}>
            <div className="w-full p-0  self-stretch overflow-aut">
               <div className={`w-full bg-primaryDark px-0 pt-2 md:py-9.5 md:px-9.5 flex-cl rounded-20 relative h-full overflow-auto fle z-10`}>
                  <div className={`flex flex-col self-stretch flex-1 overflow-auto relative pb-[80px] ${styles.storyContainer} ${storyType === 'image' ? 'h-full ' : ''} `}>

                     {storyType === 'image' ?
                        <div className={styles.storyImg}>
                           <img src={image} />
                        </div>

                        : storyType === 'video' ?
                           <>
                              {
                                 isValidYoutubeLink(video)
                                    ?
                                    <div className={`${styles.storyVideo} ${styles.storyVideoYoutube}`}>
                                       <ReactPlayer
                                          width='300px'
                                          height='500px'
                                          url={video}
                                          controls={true}
                                       />
                                    </div>
                                    :
                                    <div className={styles.storyVideo}>
                                       <video width='100%' height='100%' className={`max-h-[688px] ${styles.video}`} controls controlsList="nodownload" >
                                          <source src={video} type="video/mp4" />
                                       </video>
                                    </div>
                              }
                           </>
                           : storyType === 'mcq' && story.choices !== undefined ?
                              <Mcq {...story} {...storyProps} />
                              : storyType === 'mcq2' ?
                                 <Mcq2  {...story} {...storyProps} />
                                 : storyType === 'sudoku' ?
                                    <Sudoku {...story} updateStory={updateStory} />
                                    : storyType === 'qna' ?
                                       <QnA {...story} updateStory={updateStory} {...storyProps} />
                                       : <></>
                     }
                     <div className={styles.backBtn}>
                        <img src={BackIcon} alt='back' className='cursor-pointer' onClick={handleClose} />
                        <img src={Logo} alt='logo' className={styles.logo} />
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
                              onClick={() => shareStory()} >
                              <img src={ShareIcon} alt='share' />
                           </div>
                           Share
                        </div>
                     </div>
                     {
                        isSingle !== true &&
                        <>
                           <img src={LeftIcon} alt='left' className={`${styles.leftIcon} `}
                              onClick={selectPrevStory} />
                           <img src={RightIcon} alt='right' className={styles.RightIcon}
                              onClick={selectNextStory} />
                        </>
                     }
                  </div>
               </div>

               <div className={styles.modalOverlay}></div>
            </div>
         </div>
         <ShareModal open={shareModalOpen}
            shareMessage={share_message}
            url={`https://ivory-test.netlify.app/home?type=${story.type}&id=${story.id}`}
            close={() => {
               setShareModalOpen(false);
            }} />
      </>
   )
}
