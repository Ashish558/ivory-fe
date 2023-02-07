import React from 'react';
import Slider from 'react-slick';
import Image from '../../Images/faces.png'
import './Sessions.css'
import User from '../../Images/user1.png'
import LiveImg from '../../Images/Ellipse 3.png'
import Arrow from '../../Images/Icon.png';


const Sessions = () => {
    const settings = {

        infinite: false,
        // centerPadding: "60px",
        slidesToShow: 3.4,
        initialSlide: 0,
        arrows: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    settings: {
                        slidesToShow: 3.4,
                        initialSlide: 0,
                    },
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.3,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.5,
                    initialSlide: 0,
                },
                // state: {
                //    display: true,
                //    height: 600
                // }
            }
        ],

        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        }
    };


    return (
        <div className=" lg:ml-24 lg:mt-[120px] mt-10 ">
            <div className='lg:flex lg:items-center lg:mb-20'>
                <h1 className='text-xl font-black pl-4  lg:text-4xl lg:font-semibold'>Live sessions</h1>
                <p className='pl-7 hidden lg:block'><img src={Arrow} alt="" /></p>
            </div>


            <Slider {...settings}>
                <div className=' p-3 lg:p-0'>
                    <div class="card custom cursor-pointer"  >
                        <figure ><img className='session-img w-full' src={Image} alt="Shoes" /></figure>
                        <div class="px-2 lg:pl-4">

                            <div className='flex items-center justify-center Live px-1 py-1' >
                                <p className=''><img className='LiveImgDesktop' src={LiveImg} alt="" /></p>
                                <p className='font-semibold lg:text-xl lg:pl-2  text-xs pl-1 '><span className='text-white'> Live</span></p>
                            </div>
                            <div className=' lg:hidden ball rounded-full  flex items-center justify-center'>
                                <p className='arrow-rotate'><img src={Arrow} alt="" /></p>
                            </div>

                            <h2 class=" font-semibold text-base lg:text-2xl pt-1">
                                Seminar on art of doodling

                            </h2>
                            <p className='text-sm lg:font-medium date-bg lg:pt-3'>04 Jan, Sunday</p>
                            <div class="pt-6 lg:pt-16 flex pb-4 lg:pb-0">
                                <div class="user-name-desktop"><img className='w-full' src={User} alt="" /></div>
                                <div className='pl-2'>
                                    <p class="text-sm lg:text-xl font-semibold name-author">Ayush Jain</p>
                                    <p class="text-xs lg:text-base name-author">130k viewers</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' p-3 lg:p-0'>
                    <div class="card custom cursor-pointer"  >
                        <figure ><img className='session-img w-full' src={Image} alt="Shoes" /></figure>
                        <div class="px-2 lg:pl-4">

                            <div className='flex items-center justify-center Live px-1 py-1' >
                                <p className=''><img className='LiveImgDesktop' src={LiveImg} alt="" /></p>
                                <p className='font-semibold lg:text-xl lg:pl-2  text-xs pl-1 '><span className='text-white'> Live</span></p>
                            </div>
                            <div className=' lg:hidden ball rounded-full  flex items-center justify-center'>
                                <p className='arrow-rotate'><img src={Arrow} alt="" /></p>
                            </div>

                            <h2 class=" font-semibold text-base lg:text-2xl pt-1">
                                Seminar on art of doodling

                            </h2>
                            <p className='text-sm lg:font-medium date-bg lg:pt-3'>04 Jan, Sunday</p>
                            <div class="pt-6 lg:pt-16 flex pb-4 lg:pb-0">
                                <div class="user-name-desktop"><img className='w-full' src={User} alt="" /></div>
                                <div className='pl-2'>
                                    <p class="text-sm lg:text-xl font-semibold name-author">Ayush Jain</p>
                                    <p class="text-xs lg:text-base name-author">130k viewers</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' p-3 lg:p-0'>
                    <div class="card custom cursor-pointer"  >
                        <figure ><img className='session-img w-full' src={Image} alt="Shoes" /></figure>
                        <div class="px-2 lg:pl-4">

                            <div className='flex items-center justify-center Live px-1 py-1' >
                                <p className=''><img className='LiveImgDesktop' src={LiveImg} alt="" /></p>
                                <p className='font-semibold lg:text-xl lg:pl-2  text-xs pl-1 '><span className='text-white'> Live</span></p>
                            </div>
                            <div className=' lg:hidden ball rounded-full  flex items-center justify-center'>
                                <p className='arrow-rotate'><img src={Arrow} alt="" /></p>
                            </div>

                            <h2 class=" font-semibold text-base lg:text-2xl pt-1">
                                Seminar on art of doodling

                            </h2>
                            <p className='text-sm lg:font-medium date-bg lg:pt-3'>04 Jan, Sunday</p>
                            <div class="pt-6 lg:pt-16 flex pb-4 lg:pb-0">
                                <div class="user-name-desktop"><img className='w-full' src={User} alt="" /></div>
                                <div className='pl-2'>
                                    <p class="text-sm lg:text-xl font-semibold name-author">Ayush Jain</p>
                                    <p class="text-xs lg:text-base name-author">130k viewers</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' p-3 lg:p-0'>
                    <div class="card custom cursor-pointer"  >
                        <figure ><img className='session-img w-full' src={Image} alt="Shoes" /></figure>
                        <div class="px-2 lg:pl-4">

                            <div className='flex items-center justify-center Live px-1 py-1' >
                                <p className=''><img className='LiveImgDesktop' src={LiveImg} alt="" /></p>
                                <p className='font-semibold lg:text-xl lg:pl-2  text-xs pl-1 '><span className='text-white'> Live</span></p>
                            </div>
                            <div className=' lg:hidden ball rounded-full  flex items-center justify-center'>
                                <p className='arrow-rotate'><img src={Arrow} alt="" /></p>
                            </div>

                            <h2 class=" font-semibold text-base lg:text-2xl pt-1">
                                Seminar on art of doodling

                            </h2>
                            <p className='text-sm lg:font-medium date-bg lg:pt-3'>04 Jan, Sunday</p>
                            <div class="pt-6 lg:pt-16 flex pb-4 lg:pb-0">
                                <div class="user-name-desktop"><img className='w-full' src={User} alt="" /></div>
                                <div className='pl-2'>
                                    <p class="text-sm lg:text-xl font-semibold name-author">Ayush Jain</p>
                                    <p class="text-xs lg:text-base name-author">130k viewers</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Sessions;