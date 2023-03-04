import React from 'react'
import { useNavigate } from 'react-router-dom'
import Photo from '../../Images/profile-pic.jfif'
import { getFormattedDateWeek } from '../../utils/utils'
import styles from './session.module.css'
import liveSessionCard from '../../assets/liveSessionCard.png'
import Clock from '../../Images/Events/Vector.png'

export default function UpcomingSession({ id, name, image, scheduled_on, host, scrollToTop }) {

    const navigate = useNavigate()

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    const handleClick = () => {
        navigate(`/live-events/${id}`)
        if (scrollToTop) {
            handleScrollToTop()
        }
    }
    return (
        <div className=' rounded-3xl lg:rounded-[48px] overflow-hidden bg-secondary max-w-[220px] lg:max-w-[348px] northArrow relative'
            onClick={handleClick}>
            <div className={`${styles.imgContainer} relative`}>
                <img src={liveSessionCard} className='object-cover  w-[100%] h-[180px] lg:h-[228px]' alt='session' />
                <div className='bg-[#FF922B] p-1 rounded-full text-white px-3 absolute top-5 right-5 z-30 text-xs flex items-center'>
                    <div>
                        <img src={Clock} alt="" />
                    </div>
                    <div className='pl-1'>
                        <span>Coming Soon</span>
                    </div>


                </div>

            </div>
            <div className='px-3 pr-2 py-2 pb-5 lg:px-4 lg:py-4'>
                <div className='mb-6 lg:mb-[60px]'>
                    <p className='font-semibold mb-0 text-[16px]'> {name} </p>
                    <p className='text-sm font-medium font-sm text-[#6C7277] mb-2 ml-[3px]'>
                        {getFormattedDateWeek(scheduled_on)}
                    </p>
                </div>
                <div className='flex items-center'>
                    <img src={host?.profile_picture ? host.profile_picture : Photo} className='w-8 h-8 object-contain border border-white rounded-full' alt='session' />
                    <p className='text-sm font-semibold ml-1.5'> {host?.name} </p>
                </div>
            </div>
        </div>
    )
}