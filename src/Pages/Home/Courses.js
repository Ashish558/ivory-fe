import React from 'react';
import Banner1 from '../../Images/Canva.png'
import Banner2 from '../../Images/Laptop.png'
import './Courses.css'
import Star from '../../Images/star.png'

const Courses = () => {

    const courses = [
        {
            name: 'Learn to CANVA',
            author: 'Ankit dua',
            banner: Banner1,
            stars: '3',
            price: '399',

        },
        {
            name: 'Learn using a laptop',
            author: 'Ritu Shreshtha',
            banner: Banner2,
            stars: '4',
            price: '199',
            discount: '499'
        }
    ]

    return (
        <div className='pt-8'>
            <h1 className='text-xl font-black pl-4 '>Learn with Ivory</h1>

            {
                courses.map(course =>
                    <div className="m-4 box">
                        <div className='flex align-items '>
                            <div className='p-1.5'>
                                <figure><img className='rounded-3xl' src={course.banner} alt="Movie" /></figure>
                            </div>
                            <div className="pt-4 pl-2">
                                <h2 className="text-base font-semibold">{course.name}</h2>
                                <p className='text-xs small-text'>{course.author}</p>
                                <div>

                                    {
                                        course?.stars == '4' &&
                                        <div className="flex pt-1">
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                        </div>
                                    }
                                    {
                                        course?.stars == '5' &&
                                        <div className="flex pt-1">
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                        </div>
                                    }
                                    {
                                        course?.stars == '3' &&
                                        <div className="flex pt-1">
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>

                                        </div>
                                    }
                                    {
                                        course?.stars == '2' &&
                                        <div className="flex pt-1">
                                            <p><img src={Star} alt="" /></p>
                                            <p><img src={Star} alt="" /></p>
                                        </div>

                                    }
                                    {
                                        course?.stars == '1' &&
                                        <div className="flex pt-1">
                                            <p><img src={Star} alt="" /></p>
                                        </div>

                                    }


                                </div>
                                <div className='flex'>
                                    <h2 className='price pt-6'>₹ {course.price}</h2>
                                    {
                                        course?.discount && <h2 className='discount pt-6 pl-3'>₹ {course.discount}</h2>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default Courses;