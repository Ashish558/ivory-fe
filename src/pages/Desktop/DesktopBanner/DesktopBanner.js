import React from 'react';
import Slider from 'react-slick';
import BannerDesktop from '../../../Images/bannerPic.jpg';
import Download from '../../../Images/Group 5.png'
import './DesktopBanner.css'


const DesktopBanner = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className='container-banner pt-20'>

            <Slider {...settings}>
                <div >
                    <div className='flex items-center justify-around'>
                        <div>
                            <p><img src={Download} alt="" /></p>
                            <h1 className='big-text'>Download our app  </h1>
                            <h1 className='big-text'>to unlock free activities</h1>
                            <div className='pt-9'>
                                <p>Unlock your full potential and have a blast doing it with Ivory.</p>
                                <p>  Become a master at painting and writing with our fun and engaging app!</p>
                            </div>
                        </div>
                        <div>
                            <p> <img className='banner-pic' src={BannerDesktop} alt="" /></p>
                        </div>
                    </div>
                    <div className='blur-img'>

                    </div>
                </div>
                <div >
                    <div className='flex items-center justify-around'>
                        <div>
                            <p><img src={Download} alt="" /></p>
                            <h1 className='big-text'>Download our app  </h1>
                            <h1 className='big-text'>to unlock free activities</h1>
                            <div className='pt-6'>
                                <p>Unlock your full potential and have a blast doing it with Ivory.</p>
                                <p>  Become a master at painting and writing with our fun and engaging app!</p>
                            </div>
                        </div>
                        <div>
                            <p> <img className='banner-pic' src={BannerDesktop} alt="" /></p>
                        </div>
                    </div>
                    <div className='blur-img'>

                    </div>
                </div>
                <div >
                    <div className='flex items-center justify-around'>
                        <div>
                            <p><img src={Download} alt="" /></p>
                            <h1 className='big-text'>Download our app  </h1>
                            <h1 className='big-text'>to unlock free activities</h1>
                            <div className='pt-6'>
                                <p>Unlock your full potential and have a blast doing it with Ivory.</p>
                                <p>  Become a master at painting and writing with our fun and engaging app!</p>
                            </div>
                        </div>
                        <div>
                            <p> <img className='banner-pic' src={BannerDesktop} alt="" /></p>
                        </div>
                    </div>
                    <div className='blur-img'>

                    </div>
                </div>

            </Slider>
        </div>
    );
};

export default DesktopBanner;