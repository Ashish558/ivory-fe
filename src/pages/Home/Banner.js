import { Component, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Home/Banner.css'
import video from '../../Images/SampleVideo_1280x720_1mb.mp4'
import React from 'react';
import play from '../../Images/play-button.webp'
import Video from "./Video";



const Banner = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };




    return (
        <div className="w-1/2">
            <h2> Single Item</h2>
            <Slider {...settings}>
                <div>

                    <Video></Video>

                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    );
};

export default Banner;



// export default class Banner extends Component {
//     render() {
//         const settings = {
//             dots: true,
//             infinite: true,
//             speed: 500,
//             slidesToShow: 1,
//             slidesToScroll: 1
//         };

//         function playPause() {
//             var myVideo = document.getElementById("myVideo");
//             if (myVideo.paused) {
//                 myVideo.play();
//             } else {
//                 myVideo.pause();
//             }
//         }





//         return (
//             <div className="w-1/2">
//                 <h2> Single Item</h2>
//                 <Slider {...settings}>
//                     <div>
//                         <div class="video-container">
//                             <video id="myVideo" controls>
//                                 <source src={video} type="video/mp4"></source>
//                             </video>
//                             <div class="play-button" onclick={playPause}>ff</div>
//                             {/* <button onclick={playVid} type="button">Play Video</button>
//                             <button onclick={pauseVid} type="button">Pause Video</button> */}
//                         </div>
//                     </div>
//                     <div>
//                         <iframe width="560" height="315" src="https://www.youtube.com/embed/TO-_3tck2tg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
//                     </div>
//                     <div>
//                         <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
//                     </div>
//                     <div>
//                         <h3>4</h3>
//                     </div>
//                     <div>
//                         <h3>5</h3>
//                     </div>
//                     <div>
//                         <h3>6</h3>
//                     </div>
//                 </Slider>
//             </div>
//         );
//     }
// }