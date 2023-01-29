
import React from "react";
import Slider from "react-slick";
import Story1 from '../../Images/Rectangle 5.png'
import '../Home/Stories.css'
import Logo from '../../Images/Vector.png'
import Logo1 from '../../Images/Vector (1).png'


const Stories = () => {
    const settings = {

        infinite: false,
        centerPadding: "60px",
        slidesToShow: 2.3,
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
        <div>
            <div className='pt-14'>
                <h1 className='text-xl font-black pl-4 pb-3'>Start your day</h1>
            </div>
            <Slider {...settings}>
                <div className="p-3 " >
                    <div className="background-story-1" style={{ width: '148px', height: '229px' }}>
                        {/* <img className="w-full" src={Story1} alt="" /> */}
                        <div className="pl-3 details">
                            <p className="text-sm text-white">Good morning</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Logo} alt="" /></p>
                                <p className="text-sm text-white pl-1">130k views</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 " >
                    <div className="background-story-1" style={{ width: '148px', height: '229px' }}>
                        <div className="topcorner"><img src={Logo1} alt="" /></div>

                        {/* <img className="w-full" src={Story1} alt="" /> */}
                        <div className="pl-3 details">
                            <p className="text-sm text-white">Puzzle of the day</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Logo} alt="" /></p>
                                <p className="text-sm text-white pl-1">2m views</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="p-3 " >
                    <div className="background-story-1" style={{ width: '148px', height: '229px' }}>
                        <div className="topcorner"><img src={Logo1} alt="" /></div>
                        {/* <img className="w-full" src={Story1} alt="" /> */}
                        <div className="pl-3 details">
                            <p className="text-sm text-white">Puzzle of the day</p>
                            <div className="flex items-center">
                                <p className="text-white"> <img src={Logo} alt="" /></p>
                                <p className="text-sm text-white pl-1">2m views</p>
                            </div>
                        </div>
                    </div>
                </div>

            </Slider>
        </div>
    );
};

export default Stories;



