import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Story1 from '../../Images/Rectangle 5.png'
import '../Home/Stories.css'
import Logo from '../../Images/Vector.png'
import Logo1 from '../../Images/Vector (1).png'
import Story from "../Frames/Story/Story";
import { getStories } from "../../services/stories";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Arrow from '../../Images/Icon.png';
import CheckedIcon from '../../assets/icons/circle-checked.svg'
import LogoDesktop from '../../Images/Vector(6).png';

const Stories = () => {
   const [storyActive, setStoryActive] = useState(false)
   const [selectedStory, setSelectedStory] = useState({})
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [stories, setStories] = useState([])
   const { loggedIn, profileData } = useSelector(state => state.user)
   const { width } = useWindowDimensions()
   const navigate = useNavigate()

   const settings = {
      infinite: false,
      // centerPadding: "60px",
      slidesToShow: 3.5,
      initialSlide: 0,
      arrows: false,
      swipeToSlide: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               settings: {
                  slidesToShow: 3.5,
                  initialSlide: 0,
               },
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 3.5,
               initialSlide: 0,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 2.3,
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

   const updateStory = story => {
      // console.log('updating', story);
      let temp = stories.map((singlesStory, idx) => {
         if (idx === selectedIndex) {
            setSelectedStory(story)
            return { ...story }
         } else {
            return { ...singlesStory }
         }
      })
      setStories(temp)
   }

   useEffect(() => {
      getStories()
         .then(res => {
            let resdata = res.data.data[0]
            let allStories = []

            allStories = [...allStories,
            ...resdata.image_stories.map(story => ({ ...story, type: 'image' })),
            ...resdata.mcq_stories.map(story => ({ ...story, type: 'mcq' })),
            ...resdata.puzzle_stories.map(story => ({ ...story, type: 'sudoku' })),
            ...resdata.qna_stories.map(story => ({ ...story, type: 'qna' }))
            ]
            // console.log('allStories', allStories)
            setStories(allStories)
         })
         .catch(err => {
            console.log(err.response);
         })
   }, [])

   const handleClick = (story, idx) => {
      if (loggedIn === false) {
         navigate('/login')
      } else {
         setStoryActive(true)
         setSelectedStory(story)
         setSelectedIndex(idx)
      }
   }

   const selectPrevStory = () => {
      if (selectedIndex > 0) {
         setSelectedStory(stories[selectedIndex - 1])
         setSelectedIndex(selectedIndex - 1)
      }
   }
   const selectNextStory = () => {
      if (selectedIndex < stories.length - 1) {
         setSelectedStory(stories[selectedIndex + 1])
         setSelectedIndex(selectedIndex + 1)

      }
   }
   // console.log('selectedIndex', selectedIndex)
   // console.log('stories', stories)
   // console.log('selectedStory', selectedStory)

   return (
      <div>
         <div className=" lg:ml-24 lg:mt-[90px] mt-14">
            <div className='lg:flex lg:items-center lg:mb-20'>
               <h1 className='text-xl font-black pl-4  lg:text-4xl lg:font-semibold'>Start your day</h1>
               <p className='pl-7 hidden lg:block'><img src={Arrow} alt="" /></p>
            </div>

            {/* <div className=' flex items-center mb-20'>
               <h1 className='text-5xl font-medium  '>Start your day <span></span></h1>
               <p className='pl-7'><img src={Arrow} alt="" /></p>
            </div> */}


            <Slider {...settings} className='home-stories-slider' >
               {stories.map((story, idx) => {
                  return (
                     <div>
                        <div className="p-3  single-story-container" onClick={() => handleClick(story, idx)} >
                           {
                              story.viewed_by.includes(profileData.id) &&
                              <div className='story-checked flex'>
                                 <img src={CheckedIcon} alt='' />
                              </div>
                           }

                           <div className="" >
                              <p className="responsive-width lg:w-84"><img className="background-story-1 w-full " src={story.image ? story.image : Logo} alt="" /></p>
                              <div className="pl-3 details lg:pl-6">
                                 <p className="text-sm lg:text-xl text-white">
                                    {story.share_message ? story.share_message : ''}
                                 </p>
                                 <div className="flex items-center lg:mt-[10px] ">
                                    <p className="text-white "> <img src={Logo} alt="" /></p>
                                    {/* <p className="text-white md:hidden sm:hidden"> <img src={LogoDesktop} alt="" /></p> */}
                                    <p className="text-sm text-white pl-1"> {story.views} views</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  )
               })}
               {/* <div className="p-3 " onClick={() => handleClick()} >
                  <div className="background-story-1" style={{ width: '148px', height: '229px' }}>
   
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
                     <div className="pl-3 details">
                        <p className="text-sm text-white">Puzzle of the day</p>
                        <div className="flex items-center">
                           <p className="text-white"> <img src={Logo} alt="" /></p>
                           <p className="text-sm text-white pl-1">2m views</p>
                        </div>
                     </div>
                  </div>
               </div> */}
               <div></div>
            </Slider>
         </div>
         {
            storyActive &&
            <Story handleClose={() => setStoryActive(false)}
               story={selectedStory}
               selectedIndex={selectedIndex}
               selectPrevStory={selectPrevStory}
               selectNextStory={selectNextStory}
               updateStory={updateStory} />
         }
      </div>
   );
};

export default Stories;



