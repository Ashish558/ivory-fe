import React, { useState } from 'react';
import Logo from '../../Images/形状.png';
import User from '../../Images/profile-pic.png';
import ProfilePic from '../../Images/profile-pic-1.png';
import './Navbar.css';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import edit from '../../Images/edit.png';
import play from '../../Images/how.png';
import programs from '../../Images/programs.png';
import activities from '../../Images/activities(1).png'
import sessions from '../../Images/sessions.png'
import contact from '../../Images/contact.png'
import exit from '../../Images/exit.png';
import faq from '../../Images/faq.png'
import cross from '../../Images/cross.png'


const Navbar = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <div class="navbar background ">
            <div class="flex-1">

                <div className="display  normal-case text-lg  welcome-color">
                    <p className='pr-1 pl-2'>   <img src={Logo} alt="" /></p>
                    <p className=' font-bold text-sm'>Welcome,</p>
                    <p className='pl-2  name text-sm'>Sahil</p>
                </div>

            </div>

            <div class="flex-none gap-2">
                <button>
                    <div onClick={toggleDrawer} class="w-8 rounded-full">
                        <img src={User} alt='' />
                    </div>
                </button>



            </div>
            <Drawer open={isOpen} onClose={toggleDrawer} size="80vw" direction='right'>
                <div className='drawer-content pt-8 px-5'>


                    <div className='flex justify-between'>
                        <p className=''><img src={ProfilePic} alt="" /></p>
                        <button onClick={toggleDrawer} className='mb-6 p-0'><img src={cross} alt="" /></button>
                    </div>
                    <p className='text-sm font-semibold pt-2'>Sahil Wadhwa</p>
                    <p className='text-xs'>user created  JUL 22</p>
                    <div className='line mt-6' height="1px"></div>
                    <div className='mt-7'>

                        <div className='flex items-center'>
                            <p><img src={edit} alt="" /></p>
                            <p className='text-sm font-semibold pl-4'>Edit Profile</p>
                        </div>
                        <div className='flex items-center mt-7'>
                            <p><img src={play} alt="" /></p>
                            <p className='text-sm font-semibold pl-4'>How to use app</p>
                        </div>
                        <div className='flex items-center mt-7'>
                            <p><img src={programs} alt="" /></p>
                            <p className='text-sm font-semibold pl-4'>My Programs</p>
                        </div>
                        <div className='flex items-center mt-7'>
                            <p><img src={activities} alt="" /></p>
                            <p className='text-sm font-semibold pl-4'>Activities</p>
                        </div>
                        <div className='flex items-center mt-7'>
                            <p><img src={sessions} alt="" /></p>
                            <p className='text-sm font-semibold pl-4'>Live Sessions</p>
                        </div>

                        <div className='boundary-margin-top'>
                            <div className='flex items-center'>
                                <p><img src={exit} alt="" /></p>
                                <p className='text-sm font-semibold pl-4'>Sign out</p>
                            </div>
                            <div className='flex items-center mt-7'>
                                <p><img src={faq} alt="" /></p>
                                <p className='text-sm font-semibold pl-4 contact-color'>FAQ</p>
                            </div>
                            <div className='flex items-center mt-7'>
                                <p><img src={contact} alt="" /></p>
                                <p className='text-sm font-semibold pl-4 contact-color'>Contact us</p>
                            </div>
                            <p className='text-xs text-center pb-5 pt-8'>IVORY V1.01 </p>
                        </div>

                    </div>


                </div>
            </Drawer>
        </div>
    );
};

export default Navbar;