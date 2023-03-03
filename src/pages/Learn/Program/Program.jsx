import React,{ useEffect,useRef,useState } from 'react';
import { useParams } from "react-router-dom";
import styles from './styles.module.css';

// import liveSession from './assets/images/learn/liveSession.png';
import greenTik from "../../../assets/images/learn/greenTik.png";
import liveSession from "../../../assets/images/learn/liveSession.png";
import SingleAssignment from '../../../components/Assignment/SingleAssignment';
import SingleLiveSession from '../../../components/SingleLiveSession/SingleLiveSession';
import { createUserAssignment,createUserModule,getUserAssignments,getUserModules,getUserProgram,updateUserModule } from '../../../services/program';
import { getFormattedDate,getFormattedDuration } from '../../../utils/utils';
import Assignment from '../Assignment/Assignment';

const Program = () => {

  const [sesstionStatus, setSesstionStatus] = useState("");
  const [moduleStatus, setModuleStatus] = useState('running');
  const [tab, setTab] = useState(0);
  const [tabIndex, setTabIndex] = useState(0)
  const { id } = useParams()
  const videoRef = useRef()

  const [selectedModule, setSelectedModule] = useState({})
  const [allModules, setAllModules] = useState([])
  const [programData, setProgramData] = useState({})
  const [userModules, setUserModules] = useState([])
  const [filteredModules, setFilteredModules] = useState([])
  const [assignmentPageActive, setAssignmentPageActive] = useState(false)

  const [selectedAssignment, setSelectedAssignment] = useState({})
  const [allUserAssignments, setAllUserAssignments] = useState([])

  useEffect(() => {
    if(tab === 0 || tab === 1){
      setSelectedAssignment({})
    }
  }, [tab])
  const handleModulechange = (id) => {
    const module = allModules.find(module => module.id === id)
    // console.log('module', module);
    setSelectedModule(module)
    if (checkIfModuleExists(id)) {
      return
    }
    console.log(id)
    const body = {
      module: id
    }
    createUserModule(body)
      .then(res => {
        console.log('module creation res', res.data.data);
        fetchUserModules()
      }).catch(err => {
        console.log(err.response);
      })
  }
  const checkIfModuleExists = (moduleId) => {
    let exists = false
    userModules.forEach(item => {
      if (item.module.id === moduleId) {
        exists = true
      }
    })
    return exists
  }

  useEffect(() => {
    getUserProgram(id)
      .then(res => {
        console.log('program res', res.data.data);
        if (res.data.data === null) return setProgramData({})
        setProgramData(res.data.data)
        setAllModules(res.data.data.program.modules)
      }).catch(err => {
        console.log(err.response);
      })
  }, [id])


  const fetchUserModules = () => {
    getUserModules()
      .then(res => {
        console.log('module res', res.data.data);
        if (res.data.data === null) return
        setUserModules(res.data.data)
      }).catch(err => {
        console.log(err.response);
      })
  }
  useEffect(() => {
    fetchUserModules()
  }, [id])

  const getUserModule = () => {
    const module = userModules.find(userModule => userModule.module.id === selectedModule.id)
    return module
  }

  const handleOnVideoEnd = () => {
    const module = getUserModule()
    if (!module) return alert('user module bot created')
    const body = {
      is_completed: true
    }
    updateUserModule(module.id, body)
      .then(res => {
        console.log('module update', res.data);
        fetchUserModules()
      }).catch(err => {
        console.log(err.response);
      })
    // console.log('video ended', module);

  }
  //filter tab items
  useEffect(() => {
    if (allModules.length === 0) return
    if (tab === 0) {
      setFilteredModules(allModules)
    } else if (tab === 1) {
      setFilteredModules(allModules.filter(item => item.type === "live_session"))
    }
  }, [tab, allModules])

  //get all user assignments
  const fetchUserAssignments = () => {
    getUserAssignments()
      .then(res => {
        console.log('user assignments - all', res.data);
        if (res.data.data === null) return
        setAllUserAssignments(res.data.data)
      }).catch(err => {
        console.log(err.response);
      })
  }
  useEffect(() => {
    fetchUserAssignments()
  }, [])

  const onClickAssignment = assignmentId => {
    console.log(assignmentId);
    if (checkIfAssignmentExists(assignmentId)) {
      // alert('exist')
      const userAssignment = allUserAssignments.find(item => item.assignment.id === assignmentId)
      setSelectedAssignment(userAssignment)
      return
    }
    const body = {
      assignment: assignmentId
    }
    createUserAssignment(body)
      .then(res => {
        console.log('assignment creation res', res.data.data);
        setSelectedAssignment(res.data.data)
        fetchUserAssignments()
      }).catch(err => {
        console.log(err.response);
      })

  }
  const checkIfAssignmentExists = (assignmentId) => {
    let exists = false
    allUserAssignments.forEach(item => {
      if (item.assignment.id === assignmentId) {
        exists = true
      }
    })
    return exists
  }

  const handleZoomMeeting = (url)=>{
    // window.open(`https://zoom.us/j/${url}`)
    window.open(url)
    
 }
  // console.log('allUserAssignments', allUserAssignments)
  // console.log('selectedAssignment', selectedAssignment)
  // console.log('userModules', userModules)
  // console.log('selectedModule', selectedModule)
  // console.log('filteredModules', filteredModules)
  // console.log('allModules', allModules)
  if (!programData) return <></>
  const { program } = programData
  if (!program) return <></>
  const { image, name, description, live_sessions_count, modules_duration, price, discounted_price, benefits, next_batch_start_date, assignments, contents, discount, is_free, instructor } = program
  // console.log('program', program)
  // console.log('assignments', assignments)

  return (
    <div className="mb-28 mt-[0px] lg:px-10 lg:mt-[70px]">
      <div>
        {tab === 1 && (
          <img src={liveSession} alt="" className="w-full lg:hidden" />
        )}
        {tab === 0 && (
          <div className="video flex justify-center items-center relative lg:hidden">
            {/* <img src={videoBg} alt="video" className="w-full" />
            <img src={playIcon} alt="" className="absolute" /> */}
            {
              selectedModule !== undefined && selectedModule.video ?
                <video width='100%' height='100%' className={`max-h-[688px] ${styles.video}`} controls controlsList="nodownload" onEnded={handleOnVideoEnd} >
                  <source src={selectedModule.video} type="video/mp4" />
                </video> : <></>
            }
          </div>
        )}
        {/* desktop */}
        <p className='text-[40px] mb-8 px-10 hidden lg:block font-medium  pt-7'>
          {name}
        </p>

        {/* desktop */}
        <div className='flex items-center  hidden lg:flex lg:px-10 gap-x-7 mb-7'>
          <div className=" w-[800px] flex-1 ">
            <div className='video flex h-[451px] justify-center overflow-hidden object-cover items-center relative rounded-[24px]'>
              {
                selectedModule !== undefined && selectedModule.video ?
                  <video width='100%' height='100%' className={`max-h-[688px] ${styles.video}`} controls controlsList="nodownload" onEnded={handleOnVideoEnd} >
                    <source src={selectedModule.video} type="video/mp4" />
                  </video> : <></>
              }
            </div>
            <div className='mt-7'>
              <h4 className='font-semibold text-2xl mb-3'> About this Program </h4>
              <p>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </p>
            </div>
          </div>
          <div className='max-w-[400px] self-stretch overflow-auto max-h-[700px]'>
            {allModules.map(item => {
              let isCompleted = false
              userModules.map(userMod => {
                if (userMod.module.id === item.id) {
                  if (userMod.is_completed === true) {
                    isCompleted = true
                  }
                }
              })
              return <SingleLiveSession key={item.id}
                {...item}
                selectedModule={selectedModule}
                handleModulechange={handleModulechange}
                isCompleted={isCompleted}
              />
            })}
          </div>
        </div>

        <div className="py-3 px-5 mt-2">
          <ul className="flex  justify-around lg:justify-start lg:gap-x-8  border-b  border-gray-300">
            <li className="capitalize font-bold text-normal flex flex-col justify-between h-10"
              onClick={() => setTab(0)} >
              <span className="px-2  lg:px-5">all Modules</span>
              {tab === 0 && (
                <hr className=" border-b-4  w-full border-blue-600 rounded-full" />
              )}
            </li>
            <li className="capitalize font-bold text-normal flex flex-col justify-between h-10"
              onClick={() => setTab(1)}>
              <span className="px-2">Live Sessions</span>
              {tab === 1 && (
                <hr className=" border-b-4  w-full border-blue-600 rounded-full" />
              )}
            </li>
            <li className="capitalize font-bold text-normal flex flex-col justify-between h-10"
              onClick={() => setTab(2)}>
              Assignments
              {tab === 2 && (
                <hr className=" border-b-4  w-full border-blue-600 rounded-full " />
              )}
            </li>
          </ul>
        </div>
        {tab === 0 && (
          <div className='block lg:hidden'>
            <div className="text-2xl font-bold text-black ml-6">
              {name}
            </div>
            <div className="text-gray-500 text-lg ml-6">
              <div dangerouslySetInnerHTML={{ __html: description }} />
              {/* <span className="text-blue-500"> See more</span> */}
            </div>
          </div>
        )}

        {sesstionStatus === "finished" && (
          <div className="py-3 mt-3 mx-5 border-t border-gray-200 flex">
            <div className="flex justify-start items-center w-[40vw] relative">
              <img
                src={liveSession}
                alt=""
                className="h-[90px] object-cover rounded-xl"
              />
              <div className="flex flex-col justify-center items center h-full bg-[#30313026] absolute rounded-l-xl">
                <img src={greenTik} className="h-[30px] px-3" alt="" />
              </div>
            </div>
            <div className="flex flex-col justify-between ml-3 w-[60vw]">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  {getFormattedDuration(modules_duration)}
                </span>
              </div>
              <h1>
                <span className="text-gray-400">held on</span>
                <span className="text-green-500 font-bold">25 Feb 2023</span>
              </h1>
            </div>
          </div>
        )}
      </div>
      {tab === 1 && selectedModule && selectedModule.type === "live_session" && (
        <div className='px-5'>
          <div className="sessionDetails flex flex-col gap-3">
            <button className="bg-red-100 text-red-500 p-1 w-[200px] rounded-full mt-5">
              upcomming session
            </button>
            <h1 className="font-bold text-lg">
              {selectedModule.name}
            </h1>
            <div className="flex flex-col gap-3">
              <ul>
                <li className="list-none">
                  <span className="text-gray-400 font-semibold">Date: </span>{" "}
                  <span className="font-bold text-normal">
                    {getFormattedDate(selectedModule.scheduled_on_date)}
                  </span>
                </li>
                <li className="list-none">
                  <span className="text-gray-400 font-semibold">Time: </span>{" "}
                  <span className="font-bold text-normal">
                    {getFormattedDuration(selectedModule.scheduled_on_start_time)}
                    {" "}
                  </span>
                </li>
                <li className="list-none">
                  <span className="text-gray-400 font-semibold">
                    Duration:{" "}
                  </span>{" "}
                  <span className="font-bold text-normal">
                    {getFormattedDuration(selectedModule.scheduled_on_end_time)}
                  </span>
                </li>
                <li className="list-none">
                  <span className="text-gray-400 font-semibold">Host: </span>{" "}
                  <span className="font-bold text-normal text-blue-500">
                    {instructor?.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col  justify-start gap-3">
            <div className="bg-sky-50 shadow-xl p-3 flex flex-col gap-3 rounded-lg w-full mt-5">
              <ul className="ml-2 mt-2">
                <li className="list-none text-lg text-gray-400 font-semibold">
                  Zoom Meeting ID:{" "}
                  <span className="font-bold text-black">
                    {selectedModule.zoom_meeting_id}
                  </span>
                </li>
                <li className="list-none text-lg text-gray-400 font-semibold">
                  Zoom meeting link:{" "}
                </li>
                <li className="list-none text-lg font-semibold text-blue-400 break-all">
                  {selectedModule.zoom_meeting_link}
                </li>
              </ul>
            </div>
            <button className="bg-sky-800 text-white font-semibold py-2 w-full rounded-full border mx-auto  self-center" onClick={()=>handleZoomMeeting(selectedModule.zoom_meeting_link)} >
              {" "}
              Join Zoom Session
            </button>
          </div>
        </div>
      )}
      {tab === 1 && (
        <h1 className="font-bold text-lg ml-5 mt-5">
          upcoming live sessions
        </h1>
      )}
      {tab === 0 && (
        <div className="text-black text-lg ml-6 font-bold mt-5">
          8 Videos
          <span className="text-gray-500 text-normal font-normal">
            {" "}
            ( 3 hrs 15 min )
          </span>{" "}
          | 4 live sessions
        </div>
      )}
      {
        tab === 0 || tab === 1 ?
          <div className='lg:max-w-[350px]'>
            {filteredModules.map(item => {
              let isCompleted = false
              userModules.map(userMod => {
                if (userMod.module.id === item.id) {
                  if (userMod.is_completed === true) {
                    isCompleted = true
                  }
                }
              })
              return <SingleLiveSession key={item.id}
                {...item}
                selectedModule={selectedModule}
                handleModulechange={handleModulechange}
                isCompleted={isCompleted}
              />
            })}
          </div> : Object.keys(selectedAssignment).length > 2 ?
            <Assignment selectedAssignment={selectedAssignment}
             fetchUserAssignments={fetchUserAssignments}
              assignments={assignments}
              onClickAssignment={onClickAssignment}
               /> :
            <div className='lg:max-w-[350px]'>
              {assignments.map(assignment => {
                return <SingleAssignment key={assignment.id} {...assignment}
                  onClickAssignment={onClickAssignment} />
              })}
            </div>

        // <Assignment />
      }
    </div>
  );
};

export default Program;