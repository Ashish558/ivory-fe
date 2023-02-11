import React from 'react'
import BottomSheet from "react-draggable-bottom-sheet";
import Twitter from '../../assets/icons/twitter.svg'
import Whatsapp from '../../assets/icons/whatsapp.svg'
import Facebook from '../../assets/icons/facebook.svg'
import Instagram from '../../assets/icons/instagram.svg'

import { FacebookShareButton, FacebookIcon, WhatsappShareButton, TwitterShareButton, InstapaperShareButton } from 'react-share';

export default function ShareModal({ open, close }) {
   const shareUrl = "https://ivory-test.netlify.app/home"

   const handleWhatsAppShare = () => window.open(shareUrl)

   return (
      <BottomSheet isOpen={open} close={close}>
         <div className='px-4 py-6'>
            <h3 className='text-xl mb-10 font-bold'>
               Share
            </h3>
            <div className='flex items-center justify-around'>
               <WhatsappShareButton url={shareUrl}>
                  <img className='cursor-pointer'
                     src={Whatsapp} alt='Whatsapp' onClick={handleWhatsAppShare} />
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
