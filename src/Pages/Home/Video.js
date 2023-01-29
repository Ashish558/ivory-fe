import React, { useRef, useState } from 'react';
import video from '../../Images/SampleVideo_1280x720_1mb.mp4'
import './Banner.css'


const Video = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    }

    return (
        <div>
            <video
                ref={videoRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={video} type="video/mp4" />
            </video>
            <div>
                <button class="play-button" onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default Video;