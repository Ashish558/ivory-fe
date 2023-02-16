import React, { useState, useEffect } from 'react'
import BackIcon from '../../assets/icons/go-back.svg'
import Profile from '../../assets/images/profile.png'
import style from './Learn.module.css'
import { useNavigate } from 'react-router-dom'
import Filterbar from '../../components/Filterbar/filterbar'
import { useSelector } from 'react-redux'
import { getCategories, getInterests } from '../../services/activities'
import { getMyActivitiesProgress } from '../../services/user'
import Logo from '../../Images/Canva.png'
import { getPrograms } from '../../services/program';

const Learn = () => {
   const [activities, setActivities] = useState([])
   const [filteredActivities, setFilteredActivities] = useState([])
   const [myActivities, setMyActivities] = useState([])
   const [filterItems, setFilterItems] = useState([])
   const [allPrograms, setAllPrograms] = useState([])
   const [filteredPrograms, setFilteredPrograms] = useState([])
   const navigate = useNavigate();
   const { loggedIn } = useSelector(state => state.user)

   useEffect(() => {
      getInterests(true)
         .then(res => {
            // console.log(res.data.data);
            setActivities(res.data.data.map(item => ({ ...item, categories: [] })))
            setFilteredActivities(res.data.data.map(item => ({ ...item, categories: [] })))
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
            setFilteredActivities(tempActivities)

         }).catch(err => {
            console.log(err.response);
         })
   }, [activities.length])

   useEffect(() => {
      if (loggedIn === false) return
      getMyActivitiesProgress()
         .then(res => {
            console.log('my acts', res.data.data);
            if (res.data.data === null) return
            setMyActivities(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   }, [loggedIn])

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
      setFilteredActivities(filteredArr)

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

   useEffect(() => {
      getPrograms()
         .then(res => {
            console.log(res);
         }).catch(err => {
            console.log(err.response);
         })
   }, [])
   const [card, setcard] = useState([
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
      <div className='lg:mt-[65px]'>
         <div className="h-20 w-full flex justify-around bg-sky-100" >
            <button className="h-12 w-28 font-bold text-lg rounded-3xl bg-cyan-200 mt-5" >Programs</button>
            <button className="h-12 w-32 font-bold text-lg rounded-3xl bg-cyan-200 mt-5" onClick={() => navigate('/progress')}>My Program</button>
         </div>
         <div className='h-32  mt-4 mx-4 bg-LightSky rounded-3xl'></div>
         <div className='flex h-10 mx-4 mt-4'>
            <span className='mx-4 text-xl'>only free</span>
            {/* <Switch/> */}
            <div className={style.toggle} onClick={handleClick}>
               {toggleButton ? <div className={style.toggle_left}></div> :
                  <div className={style.toggle_right}></div>}
            </div>
            <span className='mx-4 text-xl'>only live</span>
            <div className={style.toggle1} onClick={handleOnclick}>
               {toggleButton1 ? <div className={style.toggle_left}></div> :
                  <div className={style.toggle_right}></div>}
            </div>
            {/* <Switch/> */}
            {/* <ToggleSwitch label="Notifications" />
    <ToggleSwitch label="Subscribe" /> */}
         </div>
         <Filterbar items={filterItems} onChange={onChange} />
         <div className='h-full w-full'>
            {
               card.map((ele, index) => (
                  <div className='h-36 flex py-2 mt-4 mx-4 shadow-md rounded-3xl border-gray-300'>
                     <img src={Logo} className='h-32 mx-2 w-32 rounded-3xl ' />
                     <div className='h-32 w-72 '>
                        <h1 className='text-xl font-bold'>{ele.Content}</h1>
                        <p>{ele.name}</p>
                        <p className='text-lg font-normal'>{ele.lesson}</p>
                        <p className='text-2xl text-sky-700 mt-3 font-bold '>{ele.price}</p>
                     </div>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default Learn
