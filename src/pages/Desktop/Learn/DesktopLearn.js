import React from 'react';
import Slider from 'react-slick';
import Arrow from '../../../Images/Icon.png';
import './DesktopLearn.css';
import Learn1 from '../../../Images/Learn/Learn (1).png';
import Learn2 from '../../../Images/Learn/Learn (2).png';
import Learn3 from '../../../Images/Learn/Learn (3).png';
import Learn4 from '../../../Images/Learn/Learn (4).png';
import Star from '../../../Images/Learn/Star.png'



const DesktopLearn = () => {
    const settings = {

        infinite: false,
        centerPadding: "60px",
        slidesToShow: 3.3,
        initialSlide: 0,
        arrows: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    settings: {
                        slidesToShow: 3.3,
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
        <div className='pt-10 pb-40'>
            <div style={{ marginTop: '88px' }} className='ml-24'>
                <div className=' flex items-center mb-20'>
                    <h1 className='text-4xl  font-semibold  '>Learn with Ivory<span></span></h1>
                    <p className='pl-7'><img src={Arrow} alt="" /></p>
                </div>


                <Slider {...settings}>

                    <div >
                        <div class="card custom-card-learn  ">
                            <figure><img className='w-full' src={Learn3} alt="Shoes" /></figure>
                            <div class="px-4">
                                <div>
                                    <p className='text-base font-bold position-Ivory'>Ivory Exclusive</p>
                                </div>



                                {/* <div className='flex items-center justify-center Live px-1 py-1' >
                                <p className=''><img src={LiveImg} alt="" /></p>
                                <p className='font-semibold  text-xs pl-1'><span className='text-white'> Live</span></p>
                            </div> */}

                                <div className='pt-4 flex items-center justify-between'>

                                    <div class="flex  items-center">
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p style={{ color: '#6C7277' }} className='font-medium text-lg'>(120)</p>

                                    </div>
                                    <div>

                                        <p style={{ color: '#6C7277' }} className='font-medium text-lg'>2 hrs 30 mins</p>
                                    </div>
                                </div>

                                <h1 className='text-xl pt-3 font-semibold'>Learn to sketch your thoughts</h1>
                                <p className='pt-1'>Issac John</p>

                                <div className='pt-9  pb-4 '>
                                    <p className='price-learn  text-right'>₹ 199 <span className='pl-1 discount-learn text-right'>₹ 499</span></p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div class="card custom-card-learn  ">
                            <figure><img className='w-full' src={Learn2} alt="Shoes" /></figure>
                            <div class="px-4">
                                <div>
                                    <p className='text-base font-bold position-Ivory'>Ivory Exclusive</p>
                                </div>
                                {/* <div className='flex items-center justify-center Live px-1 py-1' >
                                <p className=''><img src={LiveImg} alt="" /></p>
                                <p className='font-semibold  text-xs pl-1'><span className='text-white'> Live</span></p>
                            </div> */}

                                <div className='pt-4 flex items-center justify-between'>

                                    <div class="flex  items-center">
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p style={{ color: '#6C7277' }} className='font-medium text-lg'>(120)</p>

                                    </div>
                                    <div>

                                        <p style={{ color: '#6C7277' }} className='font-medium text-lg'>2 hrs 30 mins</p>
                                    </div>
                                </div>

                                <h1 className='text-xl pt-3 font-semibold'>Learn to sketch your thoughts</h1>
                                <p className='pt-1'>Issac John</p>

                                <div className='pt-9  pb-4 '>
                                    <p className='price-learn  text-right'>₹ 199 <span className='pl-1 discount-learn text-right'>₹ 499</span></p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div class="card custom-card-learn  ">
                            <figure ><img style={{ height: '228px' }} className='w-full' src={Learn1} alt="Shoes" /></figure>
                            <div class="px-4">
                                <div>
                                    <p className='text-base font-bold position-Ivory'>Ivory Exclusive</p>
                                </div>
                                {/* <div className='flex items-center justify-center Live px-1 py-1' >
                                <p className=''><img src={LiveImg} alt="" /></p>
                                <p className='font-semibold  text-xs pl-1'><span className='text-white'> Live</span></p>
                            </div> */}

                                <div className='pt-4 flex items-center justify-between'>

                                    <div class="flex  items-center">
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p style={{ color: '#6C7277' }} className='font-medium text-lg'>(120)</p>

                                    </div>
                                    <div>

                                        <p style={{ color: '#6C7277' }} className='font-medium text-lg'>2 hrs 30 mins</p>
                                    </div>
                                </div>

                                <h1 className='text-xl pt-3 font-semibold'>Learn to sketch your thoughts</h1>
                                <p className='pt-1'>Issac John</p>

                                <div className='pt-9  pb-4 '>
                                    <p className='price-learn  text-right'>₹ 199 <span className='pl-1 discount-learn text-right'>₹ 499</span></p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div class="card custom-card-learn  ">
                            <figure><img className='w-full' src={Learn4} alt="Shoes" /></figure>
                            <div class="px-4">
                                <div>
                                    <p className='text-base font-bold position-Ivory'>Ivory Exclusive</p>
                                </div>
                                {/* <div className='flex items-center justify-center Live px-1 py-1' >
                                <p className=''><img src={LiveImg} alt="" /></p>
                                <p className='font-semibold  text-xs pl-1'><span className='text-white'> Live</span></p>
                            </div> */}

                                <div className='pt-4 flex items-center justify-between'>

                                    <div class="flex  items-center">
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p className='pr-1'><img src={Star} alt="" /></p>
                                        <p style={{ color: '#6C7277' }} className='font-medium text-lg'>(120)</p>

                                    </div>
                                    <div>

                                        <p style={{ color: '#6C7277' }} className='font-medium text-lg'>2 hrs 30 mins</p>
                                    </div>
                                </div>

                                <h1 className='text-xl pt-3 font-semibold'>Learn to sketch your thoughts</h1>
                                <p className='pt-1'>Issac John</p>

                                <div className='pt-9  pb-4 '>
                                    <p className='price-learn  text-right'>₹ 199 <span className='pl-1 discount-learn text-right'>₹ 499</span></p>

                                </div>
                            </div>
                        </div>
                    </div>

                </Slider>

            </div>
        </div>

    );
};

export default DesktopLearn;