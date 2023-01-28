import React from 'react';
import home from '../../Images/Home.png';
import activity from '../../Images/Activities.png';
import learn from '../../Images/Learn.png';
import community from '../../Images/Community.png'
import '../Home/Footer.css'



const Footer = () => {
    return (
        <div className='pt-4 mt-6 footer-bg px-3 pb-3'>
            <div className='flex justify-around'>
                <div className='flex flex-col justify-around items-center'>
                    <p ><img className='icon-bg' src={home} alt="" /> </p>
                    <p className='text-base pt-2.5'>Home</p>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <p><img className='icon-bg-2' src={activity} alt="" /></p>
                    <p className='text-base pt-3'>Activities</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p><img className='icon-bg-2' src={learn} alt="" /></p>
                    <p className='text-base pt-1.5'>Learn</p>
                </div>
                <div className='flex flex-col justify-center items-center relative'>

                    <p><img className='icon-bg-2' src={community} alt="" /></p>
                    <div className='count flex items-center justify-center'>
                        <p > 3</p>
                    </div>
                    <p className='text-base pt-2'>Community</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;