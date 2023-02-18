import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckedIcon from '../../assets/icons/checked-category.svg'
import AcivityContent from '../../components/ActivityContent/ActivityContent'
import Filterbar from '../../components/Filterbar/filterbar'
import ProgramCard from '../../components/ProgramCard/ProgramCard'
import Toggle from '../../components/Toggle/Toggle'
import Logo from '../../Images/Canva.png'
import { getCategories, getInterests } from '../../services/activities'
import { getAllUserPrograms, getPrograms } from '../../services/program'
import { getMyActivitiesProgress } from '../../services/user'
import style from './Learn.module.css'

const card = [
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
]

const Learn = () => {
   const [activities, setActivities] = useState([])
   // const [filteredActivities,setFilteredActivities] = useState([])
   const [filterItems, setFilterItems] = useState([])
   const [completedTabActive, setCompletedTabActive] = useState(false)
   // design changes if my programs is active
   const [myPrograms, setMyPrograms] = useState(false)

   const [allPrograms, setAllPrograms] = useState([])
   const [userPrograms, setUserPrograms] = useState([])


   const navigate = useNavigate();
   const { loggedIn } = useSelector(state => state.user)

   const [onlyFreeActive, setOnlyFreeActive] = useState(true)
   const [onlyLiveActive, setOnlyLiveActive] = useState(false)

   useEffect(() => {
      getInterests(true)
         .then(res => {
            // console.log(res.data.data);
            setActivities(res.data.data.map(item => ({ ...item, categories: [] })))
            let temp = [
               {
                  id: 0,
                  children: 'All',
                  selected: true
               }
            ]
            res.data.data.map((activity, idx) => {
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

   }, [])

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
            // setFilteredActivities(tempActivities)

         }).catch(err => {
            console.log(err.response);
         })
   }, [activities.length])

   useEffect(() => {
      getPrograms()
         .then(res => {
            if (res.data.data === null) return setAllPrograms([])
            // console.log('programs', res.data.data);
            setAllPrograms(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   }, [])

   useEffect(() => {
      getAllUserPrograms()
         .then(res => {
            console.log('user programs', res.data.data);
            if (res.data.data === null) return setUserPrograms([])
            setUserPrograms(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   }, [])

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
            return { ...filterItem, selected: sel }
         })
         setFilterItems(temp)
      } else {

         let temp = filterItems.map(filterItem => {
            if (filterItem.id === item.id) {
               return { ...filterItem, selected: true }
            } else {
               return { ...filterItem, selected: false }
            }
         })
         setFilterItems(temp)
      }
   }

   useEffect(() => {
      const activeItems = filterItems.filter(item => item.selected === true)
      let activeIds = activeItems.map(item => item.id)

      let filteredArr = activities.filter(activity => activeIds.includes(activity.id))
      // setFilteredActivities(filteredArr)

   }, [filterItems, activities])

   const [toggleButton, settoggleButton] = useState(true);
   const [toggleButton1, settoggleButton1] = useState(true);
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


   return (
      <div className='lg:mx-20 lg: mt-[70px]'>
         <div className="bg-sky-50 p-5">
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
         {
            myPrograms &&
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
         }

         <div className='flex h-10 mx-4 mt-4'>
            <span className='mx-4 text-xl'>only free</span>

            <Toggle active={onlyFreeActive} handleClick={() => setOnlyFreeActive(!onlyFreeActive)} />
            <span className='mx-4 text-xl'>only live</span>
            <Toggle active={onlyLiveActive} handleClick={() => setOnlyLiveActive(!onlyLiveActive)} />

         </div>
         <div className="px-5">
            <Filterbar items={filterItems} onChange={onChange} />
         </div>
         <div className="lg:grid lg:grid-cols-3 mt-10">
            {myPrograms ?
               userPrograms.map((item, index) => (
                  <ProgramCard key={item.id} {...item.program}
                     isUserProgram={true}
                     userProgramId={item.id}
                     is_completed={item.is_completed}
                     percentage_completed={item.percentage_completed}
                  />
               )) :
               allPrograms.map((item, index) => (
                  <ProgramCard key={item.id} {...item} />
               ))
            }
         </div>
      </div>
   )
}

export default Learn
