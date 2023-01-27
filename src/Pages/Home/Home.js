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


const Home = () => {



    return (

        <div className='container'>
            <Navbar></Navbar>




            {/* <div className='mt-7 mx-5 rounded-lg background grid grid-rows-2'>
                <div className='w-1/2'>
                    <iframe src="https://www.youtube.com/embed/0-LBbcMMruQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className=''>
                    Learn how to use  Ivory app
                </div>

            </div> */}
            {/* <SimpleSlider></SimpleSlider> */}
            {/* <Video></Video>
            <Banner></Banner> */}
            <SimpleSlider></SimpleSlider>
            <Stories></Stories>
            <Activities></Activities>
            <Sessions></Sessions>
        </div>
    );
};

export default Home;