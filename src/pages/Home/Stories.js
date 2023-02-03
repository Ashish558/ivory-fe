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


const Stories = () => {
   const [storyActive, setStoryActive] = useState(false)
   const [selectedStory, setSelectedStory] = useState({})
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [stories, setStories] = useState([])
   const { loggedIn } = useSelector(state => state.user)
   const { width } = useWindowDimensions()
   const navigate = useNavigate()

   const settings = {
      infinite: false,
      centerPadding: "60px",
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
   // console.log('selectedIndex', selectedIndex)
   // console.log('stories', stories)
   // console.log('selectedStory', selectedStory)

   return (
      <>
         <div className=" lg:ml-24 lg:mt-20 mt-14">
            <div className='lg:flex lg:items-center lg:mb-20'>
               <h1 className='text-xl font-black pl-4  lg:text-5xl lg:font-medium'>Start your day</h1>
               <p className='pl-7 hidden lg:block'><img src={Arrow} alt="" /></p>
            </div>

            {/* <div className=' flex items-center mb-20'>
               <h1 className='text-5xl font-medium  '>Start your day <span></span></h1>
               <p className='pl-7'><img src={Arrow} alt="" /></p>
            </div> */}


            <Slider {...settings}>
               {stories.map((story, idx) => {
                  return (
                     <div className="p-3 " onClick={() => handleClick(story, idx)} >
                        <div className="" >
                           <p className="responsive-width lg:w-84"><img className="background-story-1 w-full " src={story.image ? story.image : Logo} alt="" /></p>
                           <div className="pl-3 details">
                              <p className="text-sm text-white">
                                 {story.share_message ? story.share_message : ''}
                              </p>
                              <div className="flex items-center">
                                 <p className="text-white"> <img src={Logo} alt="" /></p>
                                 <p className="text-sm text-white pl-1"> {story.views} views</p>
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

            </Slider>
         </div>
         {
            storyActive &&
            <Story handleClose={() => setStoryActive(false)}
               story={selectedStory}
               updateStory={updateStory} />
         }
      </>
   );
};

export default Stories;



