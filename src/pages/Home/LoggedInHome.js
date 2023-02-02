import React, { useRef, useState } from 'react';
import User from '../../Images/user.jpg'
import '../Home/Home.css'
import Navbar from '../Navbar/Navbar'
import video from '../../Images/SampleVideo_1280x720_1mb.mp4'
import Banner from './Banner';
import SimpleSlider from './SimpleSlider';
import Video from './Video';
import Stories from '../Home/Stories';
import Activities from './Activities';
import Sessions from './Sessions';
import Courses from './Courses';
import Footer from './Footer';
import { useSelector } from 'react-redux';


const LoggedInHome = () => {

    const user = useSelector(state => state.user)
    // console.log('user', user);
    return (

        <div className='container pb-12 mb-12'>
            {/* <Navbar></Navbar> */}
            <SimpleSlider></SimpleSlider>
            <Stories></Stories>
            <Activities></Activities>
            <Sessions></Sessions>
            <Courses></Courses>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default LoggedInHome;