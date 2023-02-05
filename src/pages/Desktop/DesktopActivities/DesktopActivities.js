import React from 'react';
import Arrow from '../../../Images/Icon.png';
import Logo1 from '../../../Images/Activity/Desktop (1).png'
import Logo2 from '../../../Images/Activity/Desktop (2).png'
import Logo3 from '../../../Images/Activity/Desktop (3).png'
import Logo4 from '../../../Images/Activity/Desktop (4).png'
import Logo5 from '../../../Images/Activity/Desktop (5).png'
import Logo6 from '../../../Images/Activity/Desktop (6).png'
import Logo7 from '../../../Images/Activity/Desktop (6).png'
import Logo8 from '../../../Images/Activity/Desktop (6).png'
import './DesktopActivities.css'
import SeeLogo from '../../../Images/Group.png'


const DesktopActivities = () => {
    const activities = [
        {
            id: '1',
            name: 'Acrylic Painting',
            img: Logo6,
            color: '#26A925'
        },
        {
            id: '2',
            name: 'Splatter Painting',
            img: Logo5,
            color: '#2C70FB'
        },
        {
            id: '3',
            name: 'Water Colors',
            img: Logo4,
            color: '#F28400'
        },
        {
            id: '4',
            name: 'Water Colors',
            img: Logo3,
            color: '#7B34FB'
        },
        {
            id: '5',
            name: 'Acrylic Painting',
            img: Logo2,
            color: '#A37D21'
        },
        {
            id: '6',
            name: 'Splatter Painting',
            img: Logo1,
            color: '#22B8CF'
        },
        {
            id: '7',
            name: 'Water Colors',
            img: Logo4,
            color: '#F28400'
        },
        {
            id: '8',
            name: 'Acrylic Painting',
            img: Logo6,
            color: '#26A925'
        },

        {
            id: '9',
            name: 'Splatter Painting',
            img: Logo5,
            color: '#2C70FB'
        },

        {
            id: '10',
            name: 'Acrylic Painting',
            img: Logo2,
            color: '#A37D21'
        },
        {
            id: '11',
            name: 'Water Colors',
            img: Logo3,
            color: '#7B34FB'
        },


    ]


    return (
        <div style={{ marginTop: '88px', marginRight: '436px' }} className='ml-24'>
            <div className=' flex items-center mb-20'>
                <h1 className='text-5xl font-semibold '>Recommended activities <span></span></h1>
                <p className='pl-7'><img src={Arrow} alt="" /></p>
            </div>
            <div className='grid grid-cols-6 gap-4 px-3'>
                {
                    activities.map((activity) =>
                        <div key={activity.id} className='flex flex-col justify-center items-center px-4 pb-4 pt-5 desktop-Box'>

                            <p><img src={activity?.img} alt="" /></p>

                            {
                                activity?.name.length <= '17' ?

                                    <p className='text-center pt-3 font-semibold text-xl' style={{ color: activity?.color }}>{activity?.name}</p>
                                    : <p className='text-center pt-3 font-semibold text-xl' style={{ color: activity?.color }}>{activity?.name}</p>
                            }
                        </div>
                    )


                }
                <div style={{ color: '#A37D21' }} className='flex flex-col justify-center items-center   desktop-Box'>
                    {/* <p><img src={SeeLogo} alt="" /></p> */}
                    <div>
                        <p className='text-center text-2xl  font-semibold' >See </p>
                        <p className='text-center text-2xl  font-semibold ' >All</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopActivities;