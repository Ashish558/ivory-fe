import React from 'react';
import Slider from 'react-slick';
import Image from '../../Images/faces.jpg'
import './Sessions.css'
import User from '../../Images/user1.png'
import LiveImg from '../../Images/Ellipse 3.png'


const Sessions = () => {
    const settings = {

        infinite: false,
        centerPadding: "60px",
        slidesToShow: 1.3,
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
            <h1 className='text-xl font-black pl-4 '>Live sessions</h1>
            <div className="mt-6 pl-4">

                <Slider {...settings}>
                    <div className=' pr-4'>
                        <div class="card custom-card" width="220px" >
                            <figure><img src={Image} alt="Shoes" height="298px" /></figure>
                            <div class="px-3">

                                <div className='flex items-center justify-center Live px-1 py-1' >
                                    <p className=''><img src={LiveImg} alt="" /></p>
                                    <p className='font-semibold  text-xs pl-1'><span className='text-white'> Live</span></p>
                                </div>

                                <h2 class=" font-black text-lg pt-1">
                                    Seminar on art of doodling

                                </h2>
                                <p className='text-sm date-bg'>04 Jan, Sunday</p>
                                <div class="pt-6 flex pb-4">
                                    <div class=""><img src={User} alt="" /></div>
                                    <div className='pl-2'>
                                        <p class="text-sm font-semibold">Ayush Jain</p>
                                        <p class="text-xs ">130k viewers</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' pr-4'>
                        <div class="card custom-card" width="220px" >
                            <figure><img src={Image} alt="Shoes" height="298px" /></figure>
                            <div class="px-3">
                                <div className='flex items-center justify-center Live px-1 py-1' >
                                    <p className=''><img src={LiveImg} alt="" /></p>
                                    <p className='font-semibold  text-xs pl-1'><span className='text-white'> Live</span></p>
                                </div>

                                <h2 class=" font-black text-lg pt-1">
                                    Seminar on art of doodling

                                </h2>
                                <p className='text-sm date-bg'>04 Jan, Sunday</p>
                                <div class="pt-6 flex pb-4">
                                    <div class=""><img src={User} alt="" /></div>
                                    <div className='pl-2'>
                                        <p class="text-sm font-semibold">Ayush Jain</p>
                                        <p class="text-xs ">130k viewers</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' pr-4'>
                        <div class="card custom-card" width="220px" >
                            <figure><img src={Image} alt="Shoes" height="298px" /></figure>

                            <div class="px-3">


                                <div className='flex items-center justify-center Live px-1 py-1' >
                                    <p className=''><img src={LiveImg} alt="" /></p>
                                    <p className='font-semibold  text-xs pl-1'><span className='text-white'> Live</span></p>
                                </div>
                                <h2 class=" font-black text-lg pt-1">
                                    Seminar on art of doodling

                                </h2>
                                <p className='text-sm date-bg'>04 Jan, Sunday</p>
                                <div class="pt-6 flex pb-4">
                                    <div class=""><img src={User} alt="" /></div>
                                    <div className='pl-2'>
                                        <p class="text-sm font-semibold">Ayush Jain</p>
                                        <p class="text-xs ">130k viewers</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>



        </div>
    );
};

export default Sessions;