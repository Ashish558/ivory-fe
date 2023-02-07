import React from 'react';
import Arrow from '../../../Images/Icon.png';

import Slider from 'react-slick';
import './DesktopStories.css';
import Play from '../../../Images/Vector.png'



const DesktopStories = () => {

    const settings = {
        infinite: false,
        // centerPadding: "60px",
        slidesToShow: 3,
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

        <div style={{ marginTop: '88px' }} className='ml-24'>
            <div className=' flex items-center mb-20'>
                <h1 className='text-5xl font-medium  '>Start your day <span></span></h1>
                <p className='pl-7'><img src={Arrow} alt="" /></p>
            </div>
            <Slider {...settings}>
                <div>
                    <div className="bg-desktop-1" style={{ width: '360px', height: '480px' }}>

                        <div className=" detailsDesktop ">
                            <p className="text-sm text-white">Good morning</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Play} alt="" /></p>
                                <p className="text-sm text-white pl-1">130k views</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-desktop-3" style={{ width: '360px', height: '480px' }}>

                        <div className=" detailsDesktop ">
                            <p className="text-sm text-white">Good morning</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Play} alt="" /></p>
                                <p className="text-sm text-white pl-1">130k views</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-desktop-2" style={{ width: '360px', height: '480px' }}>

                        <div className=" detailsDesktop ">
                            <p className="text-sm text-white">Good morning</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Play} alt="" /></p>
                                <p className="text-sm text-white pl-1">130k views</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-desktop-3" style={{ width: '360px', height: '480px' }}>

                        <div className=" detailsDesktop ">
                            <p className="text-sm text-white">Good morning</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Play} alt="" /></p>
                                <p className="text-sm text-white pl-1">130k views</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-desktop" style={{ width: '360px', height: '480px' }}>

                        <div className=" detailsDesktop ">
                            <p className="text-sm text-white">Good morning</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Play} alt="" /></p>
                                <p className="text-sm text-white pl-1">130k views</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-desktop" style={{ width: '360px', height: '480px' }}>

                        <div className=" detailsDesktop ">
                            <p className="text-sm text-white">Good morning</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Play} alt="" /></p>
                                <p className="text-sm text-white pl-1">130k views</p>
                            </div>
                        </div>
                    </div>
                </div>

            </Slider>
        </div>
    );
};

export default DesktopStories;