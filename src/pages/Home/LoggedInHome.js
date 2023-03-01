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

import DesktopBanner from '../Desktop/DesktopBanner/DesktopBanner';
import NavbarDesktop from '../Desktop/NavbarDesktop/NavbarDesktop';
import DesktopStories from '../Desktop/DesktopStories/DesktopStories';
import DesktopActivities from '../Desktop/DesktopActivities/DesktopActivities';
import DesktopEvents from '../Desktop/DesktopEvents/DesktopEvents';
import DesktopLearn from '../Desktop/Learn/DesktopLearn';
import { getHomeBanners } from '../../services/banners';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SliderCards from '../../components/SliderCards/SliderCards';

const LoggedInHome = () => {

    const user = useSelector(state => state.user)
    const location = useLocation()
    const navigate = useNavigate()
    const [banners, setBanners] = useState([])

    useEffect(() => {
        getHomeBanners()
            .then(res => {
                if (res.data.data === null) return
                let tempbanners = res.data.data
                //  let homeBanners = res.data.data.filter(item => item.location_link === location.pathname)
                setBanners(res.data.data)
            })
    }, [location.pathname])

    // console.log('banners', banners);
    return (

        <div className='container mx-auto'>


            <div className='desktop lg:mt-[64px]'>
                {/* <NavbarDesktop></NavbarDesktop> */}
                <DesktopBanner></DesktopBanner>
                {/* <DesktopStories></DesktopStories> */}
                <Stories></Stories>
                {/* <DesktopActivities></DesktopActivities> */}
                <Activities></Activities>

                <Sessions></Sessions>
                {/* <DesktopEvents></DesktopEvents> */}
                <DesktopLearn></DesktopLearn>

            </div>

            <div className='mobile pb-12 mb-12'>
                {/* <Navbar></Navbar> */}
                <SliderCards banners={banners} />
                {/* <Video></Video>
            <Banner></Banner> */}


                <Stories></Stories>

                <Activities></Activities>

                <Sessions></Sessions>
                <Courses></Courses>
                <Footer></Footer>
            </div>
            {/* <div className='mt-7 mx-5 rounded-lg background grid grid-rows-2'>
                <div className='w-1/2'>
                    <iframe src="https://www.youtube.com/embed/0-LBbcMMruQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className=''>
                    Learn how to use  Ivory app
                </div>

            </div> */}
        </div>
    );
};

export default LoggedInHome;