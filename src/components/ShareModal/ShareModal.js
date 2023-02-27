import React, { useEffect, useState } from 'react'
import BottomSheet from "react-draggable-bottom-sheet";
import Twitter from '../../assets/icons/twitter.svg'
import Whatsapp from '../../assets/icons/whatsapp.svg'
import Facebook from '../../assets/icons/facebook.svg'
import Instagram from '../../assets/icons/instagram.svg'

import { FacebookShareButton, FacebookIcon, WhatsappShareButton, TwitterShareButton, InstapaperShareButton } from 'react-share';

export default function ShareModal({ open, close, url }) {
   
   const [shareUrl, setShareUrl] = useState(url)
   
   useEffect(() => {
      setShareUrl(url)
   }, [url])
   
   useEffect(() => {
      if(open === true){
         navigator.clipboard.writeText(url)
      }
   }, [url, open])

   // const handleWhatsAppShare = () => window.open(shareUrl)
   // console.log('url', data.url);
   // console.log('shareUrl', shareUrl);

   // console.log(data.url, 'unknown')
   return (
      <BottomSheet isOpen={open} close={close}>
         <div className='px-4 py-6'>
            <h3 className='text-xl mb-10 font-bold'>
               Share
            </h3>
            <div className='flex items-center justify-around'>
               <WhatsappShareButton url={shareUrl}>
                  <img className='cursor-pointer'
                     src={Whatsapp} alt='Whatsapp' />
               </WhatsappShareButton>

               <FacebookShareButton url={shareUrl}  >
                  <img className='cursor-pointer'
                     src={Facebook} alt='Facebook' />
               </FacebookShareButton>

               <InstapaperShareButton url={shareUrl} >
                  <img className='cursor-pointer'
                     src={Instagram} alt='Instagram' />
               </InstapaperShareButton>

               <TwitterShareButton url={shareUrl} >
                  <img className='cursor-pointer'
                     src={Twitter} alt='Twitter' />
               </TwitterShareButton>

            </div>
         </div>
      </BottomSheet>
   )
}
