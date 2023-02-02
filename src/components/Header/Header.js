import React from 'react'
import BackIcon from '../../assets/icons/go-back.svg'
import Profile from '../../assets/images/profile.png'

export default function Header() {


   return (
      <div className='px-4 py-4 bg-[#F0F5FF] flex justify-between'>
         <img src={BackIcon} alt='back' />
         <img src={Profile} alt='Profile' />
      </div>
   )
}
