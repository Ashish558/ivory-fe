import React from 'react';
import User from '../../../Images/Events/user.png'
import Event3 from '../../../Images/Events/Rectangle 3034 (1).png'
import Event4 from '../../../Images/Events/Rectangle 3034 (2).png'
import Event1 from '../../../Images/Events/Rectangle 3034.png'
import Event2 from '../../../Images/Events/Rectangle 3034(5).png'
import Image from '../../../Images/faces.jpg'
import './DesktopEvents.css'
import Slider from 'react-slick';
import Arrow from '../../../Images/Icon.png';
import LiveImg from '../../../Images/Events/Ellipse 3.png'


const DesktopEvents = () => {
    const settings = {

        infinite: false,
        centerPadding: "60px",
        slidesToShow: 3.5,
        initialSlide: 0,
        arrows: false,
        swipeToSlide: true,


        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        }
    };


    return (
        <div className='pt-10'>
            <div style={{ marginTop: '88px' }} className='ml-24'>
                <div className=' flex items-center mb-20'>
                    <h1 className='text-5xl font-medium  '>Events <span></span></h1>
                    <p className='pl-7'><img src={Arrow} alt="" /></p>
                </div>

                <Slider {...settings}>

                    <div >
                        <div class="card   custom-card-event">
                            <figure><img className='w-full' style={{ height: '220px' }} src={Event1} alt="Shoes" /></figure>
                            <div class="pl-4">

                                <div className='flex items-center justify-center Live-Desktop  py-1' >
                                    <p className=''><img src={LiveImg} alt="" /></p>
                                    <p className='font-semibold  text-xl pl-2'><span className='text-white'> Live</span></p>
                                </div>

                                <h2 class=" font-semibold text-2xl pt-4 ">
                                    Seminar on art of doodling

                                </h2>
                                <p className='text-sm font-medium date-bg pt-3'>04 Jan, Sunday</p>
                                <div class="pt-14 flex pb-4">
                                    <div class=""><img src={User} alt="" /></div>
                                    <div className='pl-2'>
                                        <p class="text-xl font-semibold big-author-name">Ayush Jain</p>
                                        <p class="text-base big-author-name">130k viewers</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div class="card   custom-card-event">
                            <figure><img className='w-full' style={{ height: '220px' }} src={Event2} alt="Shoes" /></figure>
                            <div class="pl-4">

                                <div className='flex items-center justify-center Soon-Desktop  py-1' >
                                    <p className=''><img src={LiveImg} alt="" /></p>
                                    <p className='font-semibold  text-xl pl-2'><span className='text-white'> Coming Soon</span></p>
                                </div>

                                <h2 class=" font-semibold text-2xl pt-4 ">
                                    Seminar on art of doodling

                                </h2>
                                <p className='text-sm font-medium date-bg pt-3'>04 Jan, Sunday</p>
                                <div class="pt-14 flex pb-4">
                                    <div class=""><img src={User} alt="" /></div>
                                    <div className='pl-2'>
                                        <p class="text-xl font-semibold big-author-name">Ayush Jain</p>
                                        <p class="text-base big-author-name">130k viewers</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div class="card   custom-card-event">
                            <figure><img className='w-full' style={{ height: '220px' }} src={Event3} alt="Shoes" /></figure>
                            <div class="pl-4">



                                <h2 class=" font-semibold text-2xl pt-4 ">
                                    Seminar on art of doodling

                                </h2>
                                <p className='text-sm font-medium date-bg pt-3'>04 Jan, Sunday</p>
                                <div class="pt-14 flex pb-4">
                                    <div class=""><img src={User} alt="" /></div>
                                    <div className='pl-2'>
                                        <p class="text-xl font-semibold big-author-name">Ayush Jain</p>
                                        <p class="text-base big-author-name">130k viewers</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div class="card   custom-card-event">
                            <figure><img style={{ height: '220px' }} className='w-full' src={Event4} alt="Shoes" /></figure>
                            <div class="pl-4">



                                <h2 class=" font-semibold text-2xl pt-4 ">
                                    Seminar on art of doodling

                                </h2>
                                <p className='text-sm font-medium date-bg pt-3'>04 Jan, Sunday</p>
                                <div class="pt-14 flex pb-4">
                                    <div class=""><img src={User} alt="" /></div>
                                    <div className='pl-2'>
                                        <p class="text-xl font-semibold big-author-name">Ayush Jain</p>
                                        <p class="text-base big-author-name">130k viewers</p></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Slider>
            </div>



        </div>
    );
};

export default DesktopEvents;