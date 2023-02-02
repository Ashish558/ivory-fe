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

                        <div style={{ height: '140px' }} className="items-align">
                            <div className="">
                                <div className="banner">
                                    <img className="rounded-3xl " src={Image} alt="" />
                                    <p className="play bg-black rounded-full"></p>
                                </div>
                            </div>
                            <div className="font-black   text-xl ">
                                <div><h1 >Learn How</h1>
                                    <h1>to use Ivory</h1>
                                    <h1>app</h1></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="slider-bg mx-4">

                        <div style={{ height: '140px' }} className="items-align">
                            <div className="banner">
                                <img className="rounded-3xl " src={Image} alt="" />
                                <p className="play bg-black rounded-full"></p>
                            </div>
                            <div className=" font-black  text-xl ">
                                <div><h1 >Learn How</h1>
                                    <h1>to use Ivory</h1>
                                    <h1>app</h1></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="slider-bg mx-4">

                        <div style={{ height: '140px' }} className="items-align">
                            <div className="">
                                <div> <img className="rounded-3xl " src={Image1} alt="" /></div>
                            </div>
                            <div className=" text-xl ">
                                <div>
                                    <h1 className="font-black">Complete</h1>
                                    <h1 className="font-black">your Profile !</h1>
                                    <p className="text-sm"><small>For a better customized
                                    </small></p>
                                    <p className="text-sm">  <small>experience.</small></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </Slider>
        </div>
    );
};



export default SimpleSlider;