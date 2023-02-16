import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckedIcon from '../../assets/icons/checked-category.svg'
import AcivityContent from '../../components/ActivityContent/ActivityContent'
import Filterbar from '../../components/Filterbar/filterbar'
import Logo from '../../Images/Canva.png'
import { getCategories,getInterests } from '../../services/activities'
import { getMyActivitiesProgress } from '../../services/user'
import style from './Learn.module.css'
const Learn = () => {
   const [activities,setActivities] = useState([])
   const [filteredActivities,setFilteredActivities] = useState([])
   const [myActivities,setMyActivities] = useState([])
   const [filterItems,setFilterItems] = useState([])
   const [completedTabActive,setCompletedTabActive] = useState(false)
   // design changes if my programs is active
   const [myPrograms,setMyPrograms] = useState(false)
   const navigate = useNavigate();
   const { loggedIn } = useSelector(state => state.user)

   useEffect(() => {
      if (filterItems.length > 0) return
      if (activities.length === 0) return


   },[activities])

   useEffect(() => {
      getInterests(true)
         .then(res => {
            // console.log(res.data.data);
            setActivities(res.data.data.map(item => ({ ...item,categories: [] })))
            setFilteredActivities(res.data.data.map(item => ({ ...item,categories: [] })))
            let temp = [
               {
                  id: 0,
                  children: 'All',
                  selected: true
               }
            ]
            res.data.data.map((activity,idx) => {
               temp.push({
                  id: activity.id,
                  children: <div className='flex items-center gap-x-1'>
                     <img src={activity.icon} alt='activity' className='max-h-[18px]' />
                     {activity.name}
                  </div>,
                  selected: true
               })
            })
            setFilterItems(temp)
         }).catch(err => {
            console.log(err.response);
         })

   },[])

   useEffect(() => {
      if (activities.length === 0) return
      getCategories()
         .then(res => {
            // console.log('categories', res.data.data);
            let tempActivities = [...activities]
            res.data.data.map(category => {
               let idx = tempActivities.findIndex(interest => interest.id === category.intrest)
               tempActivities[idx].categories.push(category)
            })
            setActivities(tempActivities)
            setFilteredActivities(tempActivities)

         }).catch(err => {
            console.log(err.response);
         })
   },[activities.length])

   useEffect(() => {
      if (loggedIn === false) return
      getMyActivitiesProgress()
         .then(res => {
            console.log('my acts',res.data.data);
            if (res.data.data === null) return
            setMyActivities(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   },[loggedIn])

   const onChange = (item) => {
      // console.log('item', item);
      if (item.id === 0) {
         let temp = filterItems.map(filterItem => {
            let sel = false
            if (item.selected === false) {
               sel = true
            } else {
               sel = false
            }
            return { ...filterItem,selected: sel }
         })
         setFilterItems(temp)
      } else {

         let temp = filterItems.map(filterItem => {
            if (filterItem.id === item.id) {
               return { ...filterItem,selected: true }
            } else {
               return { ...filterItem,selected: false }
            }
         })
         setFilterItems(temp)
      }
   }

   useEffect(() => {
      const activeItems = filterItems.filter(item => item.selected === true)
      let activeIds = activeItems.map(item => item.id)

      let filteredArr = activities.filter(activity => activeIds.includes(activity.id))
      setFilteredActivities(filteredArr)

   },[filterItems,activities])

   const [toggleButton,settoggleButton] = useState(true);
   const [toggleButton1,settoggleButton1] = useState(true);
   const handleClick = () => {
      settoggleButton(!toggleButton);
      const toggle = document.querySelector(".Learn_toggle__yXQQe");
      if (toggleButton == true) { toggle.style.backgroundColor = "#0055BF"; }
      else {
         toggle.style.backgroundColor = "gray";
      }
   }
   const handleOnclick = () => {
      settoggleButton1(!toggleButton1);
      const toggle = document.querySelector(".Learn_toggle1__QGzrT");
      if (toggleButton1 == true) { toggle.style.backgroundColor = "#0055BF"; }
      else {
         toggle.style.backgroundColor = "gray";
      }
   }

   const [card,setcard] = useState([
      {
         Content: "Learn to CANVA",
         name: "Ankit dua",
         lesson: "16 lessons",
         price: "FREE"
      },
      {
         Content: "Publish your short story",
         name: "Ankit dua",
         lesson: "16 lessons",
         price: "RS 399"
      },
      {
         Content: "Learn to use acrylic paints",
         name: "Ankit dua",
         lesson: "16 lessons",
         price: "FREE"
      },
      {
         Content: "Learn to use acrylic paints",
         name: "Ankit dua",
         lesson: "16 lessons",
         price: "FREE"
      },
      {
         Content: "Learn to CANVA",
         name: "Ankit dua",
         lesson: "16 lessons",
         price: "FREE"
      }
   ])
   //  const navigate = useNavigate()

   return (
      <div className='lg:mx-20 lg:my-20'>
         <div className="bg-sky-50 sm:bg-white p-5">
            <h1 className='text-xl font-semibold lg:hidden block'>Welcome Sahil ji! <span className='text-sm font-semibold ml-1 mt-3'> what would you like to learn today?</span></h1>
            <div className=" w-full flex justify-around lg:bg-white my-5" >
               <button className={`font-bold text-lg rounded-full border px-4 py-2  ${myPrograms === false && ' bg-cyan-200'}`} onClick={() => setMyPrograms(false)} >Programs</button>
               <button className={`font-bold text-lg rounded-full border px-4  ${myPrograms && ' bg-cyan-200'}`} onClick={() => setMyPrograms(true)}>My Program</button>
            </div>
         </div>
         <h1 className='text-2xl font-semibold hidden lg:block'>Welcome Sahil ji! <span className='text-lg font-semibold ml-1 mt-3'> what would you like to learn today?</span></h1>
         {/* <div className='h-32  mt-4 mx-4 bg-LightSky rounded-3xl'></div> */}
         <div className="px-5">
            <AcivityContent>
            </AcivityContent>
         </div>
         <div className='flex justify-center my-7'>
            <button className={`rounded-l-full lg:w-[170px] lg:h-[62px] lg:text-xl border flex justify-center items-center py-2.5 px-4 font-semibold border-r-0 text-sm lg:border-[#79747E] ${completedTabActive === false ? 'bg-secondary' : ''} `}
               onClick={() => setCompletedTabActive(false)} >
               {
                  completedTabActive === false &&
                  <img src={CheckedIcon} alt='checked' className='mr-[8.25px]' />
               }
               On going
            </button>
            <button className={`rounded-r-full lg:w-[170px] lg:h-[62px] lg:text-xl border flex justify-center items-center py-2.5 px-4 font-semibold text-sm  lg:border-[#79747E] ${completedTabActive === true ? 'bg-secondary' : ''} `}
               onClick={() => setCompletedTabActive(true)}  >
               {
                  completedTabActive === true &&
                  <img src={CheckedIcon} alt='checked' className='mr-[8.25px]' />
               }
               completed
            </button>
         </div>
         <div className='flex h-10 mx-4 mt-4'>
            <span className='mx-4 text-xl'>only free</span>
            {/* <Switch/> */}
            <div className={`${style.toggle} ${toggleButton ? 'bg-gray-400' : ' bg-blue-400'}`} onClick={handleClick}>
               {toggleButton ? <div className={style.toggle_left}></div> :
                  <div className={style.toggle_right}></div>}
            </div>
            <span className='mx-4 text-xl'>only live</span>
            <div className={`${style.toggle1} ${toggleButton1 ? 'bg-gray-400' : ' bg-blue-400'}`} onClick={handleOnclick}>
               {toggleButton1 ? <div className={style.toggle_left}></div> :
                  <div className={style.toggle_right}></div>}
            </div>
            {/* <Switch/> */}
            {/* <ToggleSwitch label="Notifications" />
    <ToggleSwitch label="Subscribe" /> */}
         </div>
         <div className="px-5">
            <Filterbar items={filterItems} onChange={onChange} />
         </div>
         <div className="lg:grid lg:grid-cols-3 mt-10 2xl:grid-cols-4">
            {
               card.map((ele,index) => (
                  <div className="py-3 my-3 lg:px-0 lg:pt-0 lg:rounded-[48px] mx-5 border-gray-200 shadow-lg border-t px-3 rounded-2xl flex lg:flex-col lg:gap-2">
                     <div className="h-[110px] lg:h-auto flex justify-start items-center w-[40vw] lg:w-auto relative">
                        <span className="text-normal text-white absolute top-6 left-6 hidden lg:block">
                           Ivory Exclusive
                        </span>
                        <img
                           src={Logo}
                           alt=""
                           className="h-full lg:h-[228px] lg:w-full object-cover rounded-xl lg:rounded-none lg:rounded-t-[48px]"
                        />
                     </div>
                     <div className="flex flex-col justify-between ml-4 w-[60vw] lg:w-full lg:gap-2">
                        <span className="text-sm text-gray-500 hidden lg:block">
                           2 hrs 30 mins
                        </span>
                        <h1 className="text-normal font-bold lg:text-xl">
                           Learn to CANVA
                        </h1>
                        <span className="text-sm text-gray-400">Ankit dua</span>
                        <div className="flex justify-between">
                           <button className="bg-red-100 text-red-500 px-1 rounded-full">
                              4 live sessions
                           </button>
                        </div>

                        {
                           myPrograms ? <div>
                              <p className='mt-2'>20% completed</p>
                              <progress className="progress progress-primary w-56" value="40" max="100"></progress>
                           </div> : <div className="ml-auto mr-10 lg:mt-5 lg:p-3"><div className="text-2xl font-bold text-sky-600 ml-6 lg:ml-0 flex items-center gap-1">
                              &#8377;3000 {"  "}
                              <span className="text-gray-400 line-through font-normal text-base">
                                 &#8377;3499
                              </span>{" "}

                           </div>
                           </div>
                        }


                     </div>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default Learn
