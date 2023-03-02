import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckedIcon from '../../assets/icons/checked-category.svg'
import AcivityContent from '../../components/ActivityContent/ActivityContent'
import Filterbar from '../../components/Filterbar/filterbar'
import ProgramCard from '../../components/ProgramCard/ProgramCard'
import Toggle from '../../components/Toggle/Toggle'
import { getCategories,getInterests } from '../../services/activities'
import { getAllUserPrograms,getPrograms } from '../../services/program'

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
   const [activities,setActivities] = useState([])
   // const [filteredActivities,setFilteredActivities] = useState([])
   const [filterItems,setFilterItems] = useState([])
   const [completedTabActive,setCompletedTabActive] = useState(false)
   // design changes if my programs is active
   const [myPrograms,setMyPrograms] = useState(false)

   const [allPrograms,setAllPrograms] = useState([])
   const [allProgramsFiltered,setAllProgramsFiltered] = useState([])

   const [userPrograms,setUserPrograms] = useState([])
   const [userProgramsFiltered,setUserProgramsFiltered] = useState([])


   const navigate = useNavigate();
   const { loggedIn } = useSelector(state => state.user)

   const [onlyFreeActive,setOnlyFreeActive] = useState(false)
   const [onlyLiveActive,setOnlyLiveActive] = useState(true)

   useEffect(() => {
      getInterests(true)
         .then(res => {
            // console.log(res.data.data);
            setActivities(res.data.data.map(item => ({ ...item,categories: [] })))
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
            // setFilteredActivities(tempActivities)

         }).catch(err => {
            console.log(err.response);
         })
   },[activities.length])

   useEffect(() => {
      getPrograms()
         .then(res => {
            if (res.data.data === null) return setAllPrograms([])
            // console.log('programs', res.data.data);
            setAllPrograms(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   },[])

   useEffect(() => {
      getAllUserPrograms()
         .then(res => {
            console.log('user programs',res.data.data);
            if (res.data.data === null) return setUserPrograms([])
            setUserPrograms(res.data.data)
         }).catch(err => {
            console.log(err.response);
         })
   },[])

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
      // console.log('activeIds', activeIds);
      // console.log('allPrograms', allPrograms);
      let allProgsFiltered = allPrograms.filter(item => activeIds.includes(item.category))
      if (!onlyFreeActive) {
         allProgsFiltered = allProgsFiltered.filter(item => item.is_free === true)
      } else {
         allProgsFiltered = allProgsFiltered.filter(item => item.is_free === true || item.is_free === false)
      }
      if (!onlyLiveActive) {
         allProgsFiltered = allProgsFiltered.filter(item => item.is_live === true)
      } else {
         allProgsFiltered = allProgsFiltered.filter(item => item.is_live === true || item.is_live === false)
      }
      setAllProgramsFiltered(allProgsFiltered)
   },[filterItems,allPrograms,myPrograms,onlyFreeActive,onlyLiveActive])

   useEffect(() => {
      const activeItems = filterItems.filter(item => item.selected === true)
      let activeIds = activeItems.map(item => item.id)
      // console.log('activeIds', activeIds);
      // console.log('userPrograms', userPrograms);
      let userProgsFiltered = userPrograms.filter(item => activeIds.includes(item.program.category))
      if (completedTabActive === true) {
         userProgsFiltered = userProgsFiltered.filter(item => item.is_completed === true)
      } else {
         userProgsFiltered = userProgsFiltered.filter(item => item.is_completed === false)
      }
      setUserProgramsFiltered(userProgsFiltered)
   },[filterItems,userPrograms,myPrograms,completedTabActive])

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


   return (
      <div className='lg:mx-28 lg: lg:my-[70px] mb-24 '>
         <div className="bg-[#EEFCFF] lg:bg-white p-5">
            <h1 className='text-[16px] lg:text-xl font-semibold lg:hidden block text-black'>Hello Sahil ji! </h1>
            <span className='text-sm ml-1 mt-1 text-[#74777F] lg:hidden block font-medium'> what would you like to learn today?</span>
            <div className=" w-full flex justify-around lg:justify-start lg:gap-5 lg:bg-white mt-5" >
               <button className={`font-medium text-sm sm:text-xl rounded-full border px-4 py-[10px] font-roboto ${myPrograms === false && ' bg-[#BDF4FF]'}`} onClick={() => setMyPrograms(false)} >Programs</button>
               <button className={`font-medium text-sm sm:text-xl rounded-full border px-4 py-[10px] font-roboto ${myPrograms && ' bg-[#BDF4FF]'}`} onClick={() => setMyPrograms(true)}>My Program</button>
            </div>
         </div>
         <h1 className='text-[32px] font-semibold hidden lg:block ml-4 font-Poppins'>Welcome Sahil ji! <span className='text-2xl font-semibold ml-1 mt-3'> what would you like to learn today?</span></h1>

         <div className="mx-3">
            <AcivityContent>
            </AcivityContent>
         </div>
         {
            myPrograms &&
            <div className='flex justify-center my-7 font-roboto'>
               <button className={`rounded-l-full lg:w-[170px] lg:h-[62px] lg:text-xl border flex justify-center items-center py-2.5 px-4 font-semibold border-r-0 text-sm lg:border-[#79747E] ${completedTabActive === false ? 'bg-secondary' : ''} `}
                  onClick={() => setCompletedTabActive(false)} >
                  {
                     completedTabActive === false &&
                     <img src={CheckedIcon} alt='checked' className='mr-[8.25px]' />
                  }
                  On Going
               </button>
               <button className={`rounded-r-full lg:w-[170px] lg:h-[62px] lg:text-xl border flex justify-center items-center py-2.5 px-4 font-semibold text-sm  lg:border-[#79747E] ${completedTabActive === true ? 'bg-secondary' : ''} `}
                  onClick={() => setCompletedTabActive(true)}  >
                  {
                     completedTabActive === true &&
                     <img src={CheckedIcon} alt='checked' className='mr-[8.25px]' />
                  }
                  Completed
               </button>
            </div>
         }

         
            <div className='flex h-10 mx-4 mt-4 text-black'>
               <span className='mx-4 md:text-xl font-normal text-sm'>only free</span>
               <Toggle active={onlyFreeActive} handleClick={() => { setOnlyFreeActive(!onlyFreeActive) }} />
               <span className='mx-4 md:text-xl text-sm font-normal'>only live</span>
               <Toggle active={onlyLiveActive} handleClick={() => setOnlyLiveActive(!onlyLiveActive)} />
            </div>
         

         <div className="px-5 sm:w-full sm:overflow-hidden ">
            <Filterbar items={filterItems} onChange={onChange} />
         </div>
         <div className="lg:grid lg:grid-cols-3  md:mt-12 overflow-x-scroll lg:overflow-hidden" >
            {myPrograms ?
               userProgramsFiltered.map((item,index) => (
                  <ProgramCard key={item.id} {...item.program}
                     isUserProgram={true}
                     userProgramId={item.id}
                     is_completed={item.is_completed}
                     percentage_completed={item.percentage_completed}
                  />
               )) :
               allProgramsFiltered.map((item,index) => (
                  <ProgramCard key={item.id} {...item} />
               ))
            }
         </div>
      </div>
   )
}

export default Learn
