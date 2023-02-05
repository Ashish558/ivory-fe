import React, { Component } from "react";
import Slider from "react-slick";
import '../Home/SimpleSlider.css'
import Image from '../../Images/image 16.png';
import Image1 from '../../Images/Frame 554.png'


const SimpleSlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <div className="mt-6">

            <Slider {...settings}>
                <div>
                    <div className="slider-bg mx-4">

                        <div style={{ height: '140px', margin: "0 auto" }} className="grid grid-cols-2 mx">
                            <div className="flex items-center pl-6">
                                <div className="banner">
                                    <img className="rounded-3xl " src={Image} alt="" />
                                    <p className="play bg-black rounded-full"></p>
                                </div>
                            </div>
                            <div className="flex items-center pl-2">
                                <div className="font-bold   text-xl ">
                                    <h1 >Learn How</h1>
                                    <h1>to use Ivory</h1>
                                    <h1>app</h1></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="slider-bg mx-4">

                        <div style={{ height: '140px', margin: "0 auto" }} className="grid grid-cols-2 mx">
                            <div className="flex items-center pl-6">
                                <div className="banner">
                                    <img className="rounded-3xl " src={Image} alt="" />
                                    <p className="play bg-black rounded-full"></p>
                                </div>
                            </div>
                            <div className="flex items-center pl-2">
                                <div className="font-bold   text-xl ">
                                    <h1 >Learn How</h1>
                                    <h1>to use Ivory</h1>
                                    <h1>app</h1></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="slider-bg mx-4">

                        <div style={{ height: '140px', margin: "0 auto" }} className="grid grid-cols-2 mx">
                            <div className="flex items-center pl-6">
                                <div className="banner">
                                    <img className="rounded-3xl " src={Image} alt="" />
                                    <p className="play bg-black rounded-full"></p>
                                </div>
                            </div>
                            <div className="flex items-center pl-2">
                                <div className="font-bold   text-xl ">
                                    <h1 >Learn How</h1>
                                    <h1>to use Ivory</h1>
                                    <h1>app</h1></div>
                            </div>
                        </div>

                    </div>
                </div>

            </Slider>
        </div>
    );
};



export default SimpleSlider;