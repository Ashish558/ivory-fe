import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Story1 from '../../Images/Rectangle 5.png'
import '../Home/Stories.css'
import Logo from '../../Images/Vector.png'
import Logo1 from '../../Images/Vector (1).png'
import Story from "../Frames/Story/Story";
import { getSingleStory, getStories } from "../../services/stories";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Arrow from '../../Images/Icon.png';
import CheckedIcon from '../../assets/icons/circle-checked.svg'
import LogoDesktop from '../../Images/Vector(6).png';
import { getStoryUrl } from "../../utils/utils";

const Stories = () => {
   const [storyActive, setStoryActive] = useState(false)
   const [selectedStory, setSelectedStory] = useState({})
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [stories, setStories] = useState([])

   const [singleStory, setSingleStory] = useState({})
   const [singleStoryActive, setSingleStoryActive] = useState(false)

   const { loggedIn, profileData } = useSelector(state => state.user)
   const { width } = useWindowDimensions()
   const navigate = useNavigate()
   const [searchParams, setSearchParams] = useSearchParams();

   const settings = {
      infinite: false,
      // centerPadding: "60px",
      slidesToShow: 3,
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
               slidesToShow: 3,
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

   useEffect(() => {
      const storyType = searchParams.get('type')
      const storyId = searchParams.get('id')
      // console.log(storyType, storyId);
      // console.log(storyType, storyId);
      if (storyType === null) return
      if (storyId === null) return
      const url = getStoryUrl(storyType)
      getSingleStory(url, storyId, loggedIn)
         .then(res => {
            if (!res.data.data) return
            setSingleStory({ ...res.data.data, type: storyType })
            setSingleStoryActive(true)
         })
         .catch(err => {
            console.log(err.response);
         })
   }, [searchParams, loggedIn])

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

   const getType = (url) => {
      if (url === 'image-stories') {
         return 'image'
      } else if (url === 'video-stories') {
         return 'video'
      } else if (url === 'mcq-stories') {
         return 'mcq'
      } else if (url === 'qna-stories') {
         return 'qna'
      } else if (url === 'puzzle-stories') {
         return 'sudoku'
      } else {
         return 'image'
      }
   }
   const fetchStories = () => {
      getStories(loggedIn)
         .then(res => {
            let resdata = res.data.data[0]
            console.log('Stories response', res.data.data)
            // console.log('resdata', resdata)
            let allStories = []

            resdata.stories.map(story => {
               // console.log('url', story.url.split('/')[5]);
               allStories.push({
                  ...story,
                  type: getType(story.url.split('/')[5])
               })
            })
            // allStories = [...allStories,
            // ...resdata.image_stories.map(story => ({ ...story, type: 'image' })),
            // ...resdata.mcq_stories.map(story => ({ ...story, type: 'mcq' })),
            // ...resdata.puzzle_stories.map(story => ({ ...story, type: 'sudoku' })),
            // ...resdata.qna_stories.map(story => ({ ...story, type: 'qna' })),
            // ...resdata.video_stories.map(story => ({ ...story, type: 'video' }))
            // ]
            let viewed = allStories.filter(item => item.viewed === true)
            let notViewed = allStories.filter(item => item.viewed === false)
            setStories([...notViewed, ...viewed])
         })
         .catch(err => {
            console.log(err.response);
         })
   }

   useEffect(() => {
      fetchStories()
   }, [loggedIn])

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

   const updateSingleStory = (data) => {
      setSingleStory(data)
   }

   useEffect(() => {
      if (storyActive === false) {
         let sorted = [...stories]
         let viewed = sorted.filter(item => item.viewed === true)
         let notViewed = sorted.filter(item => item.viewed === false)
         // sorted.sort((x, y) => {
         //    console.log(x.viewed, y.viewed);
         //    return Number(y.viewed) - Number(x.viewed)
         // })
         setStories([...notViewed, ...viewed])
      }
   }, [storyActive])
   // console.log('selectedIndex', selectedIndex)
   // console.log('stories', stories.map(it => it.viewed))
   // console.log('selectedStory', selectedStory)

   return (
      <div>
         {
            stories.length >= 1 &&
            <div className=" lg:ml-24 ">
               <div className='lg:flex lg:items-center lg:mb-20'>
                  <h1 className='text-xl font-black pl-4  lg:text-5xl lg:font-semibold'>Start your day</h1>
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
                                 <p className="responsive-width lg:w-84"><img className="background-story-1 w-full " src={story.image ? story.image : story.thumbnail ? story.thumbnail : Logo} alt="" /></p>
                                 <div className="pl-3 details lg:pl-6">
                                    <p className="text-sm lg:text-xl text-white">
                                       {story.title ? story.title : ''}
                                    </p>
                                    <div className="flex items-center lg:mt-[10px] lg:pb-[26px]">
                                       <p className="text-white HideplayLogo"> <img src={Logo} alt="" /></p>
                                       <p className="text-white HideplayDesktopLogo "> <img src={LogoDesktop} alt="" /></p>

                                       <p className="text-sm text-white pl-1"> {story.views} views</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )
                  })}
                  <div></div>
               </Slider>
            </div>
         }

         {
            storyActive &&
            <Story handleClose={() => setStoryActive(false)}
               story={selectedStory}
               selectedIndex={selectedIndex}
               selectPrevStory={selectPrevStory}
               selectNextStory={selectNextStory}
               updateStory={updateStory} />
         }
         {
            singleStoryActive &&
            <Story handleClose={() => {
               setSingleStoryActive(false);
               navigate('/home')
            }}
               story={singleStory}
               isSingle={true}
               updateStory={updateSingleStory}
            />
         }
      </div>
   );
};

export default Stories;



