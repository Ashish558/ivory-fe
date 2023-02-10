import React,{ useEffect,useRef,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import arrow from "../../assets/arrow_back.png"
import cross from "../../assets/cross.png"
import CancelIcon from '../../assets/icons/x-icon.svg'
import ivoryforming from "../../assets/ivoryforming.png"
import photo from "../../assets/smile.png"
import Modal from '../../components/Modal/modal'
import { updateProfileData } from '../../redux/slices/user'
import { addInterest,getInterests } from '../../services/activities'
import { editProfile,uploadProfile } from '../../services/user'
import styles from "./Profile.module.css"

const Profile = () => {
  const [name,setName] = useState('')
  const [mobile_no,setMobile_no] = useState(null)
  const [email,setemail] = useState("");
  const [showdiv,setshowdiv] = useState(false);
  const [addnewtextdiv,setaddnewtextdiv] = useState(false);
  const [backcolor,setbackcolor] = useState('#FFFFFF');
  const [blur,setblur] = useState("");

  const [interest,setinterest] = useState([]);
  const [allInterests,setAllInterests] = useState([])
  const [userInterests,setUserInterests] = useState([])
  const [interestInput,setInterestInput] = useState('')
  const [selectedInterest,setSelectedInterest] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error,setError] = useState('')
  const [empty,setEmpty] = useState(true)


  const { loggedIn,profileData } = useSelector(state => state.user)
  const photoRef = useRef(null)

  const [gender,setgender] = useState("");
  useEffect(() => {
    if (loggedIn === true) {
      setemail(profileData.email !== null ? profileData.email : '')
      setgender(profileData.gender !== null ? profileData.gender : '')
      setName(profileData.name !== null ? profileData.name : '')
      setMobile_no(profileData.mobile_no !== null ? profileData.mobile_no : '')
      setinterest(profileData.intrests)
    }
  },[profileData,loggedIn])


  useEffect(() => {
    fetchInterests()
  },[])

  const fetchInterests = () => {
    getInterests()
      .then(res => {
        console.log('All Interests', res.data.data);

        let intData = res.data.data
        intData = intData.filter(item => {
          if (item.created_by === profileData.id || item.created_by === 1) {
            return item
          }
        })
        const profileIntIds = profileData.intrests.map(int => int.id)
        intData = intData.map(item => ({ ...item,selected: false }))

        intData = intData.map(item => {
          if (profileIntIds.includes(item.id)) {
            return { ...item,selected: true }
          } else {
            return { ...item,selected: false }
          }
        })

        setAllInterests(intData)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (allInterests.length === 0) return
    let tempInt = allInterests.filter(item => item.selected === true)
    setUserInterests(tempInt)
  },[allInterests])

  let intIds = interest.map(item => item.id)



  const body = {
    gender: gender ? gender : '',
    name: name ? name : '',
    email: email ? email : null,
    intrests: intIds ? intIds : [],
    mobile_no: mobile_no ? mobile_no : ''
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    editProfile(body,profileData.mobile_no)
      .then(res => {
        dispatch(updateProfileData({ profileData: res.data.data }))
        alert('profile data saved')
        navigate('/home')
      })
      .catch(err => {
        console.log(err);
      })
  }


  //toogle interest
  const toggleInt = int => {
    const id = int.id;
    let tempint = allInterests.map(int => {
      if (int.id === id) {
        return { ...int,selected: !int.selected }
      } else {
        return { ...int }
      }
    })
    const filteredInt = tempint.filter(item => item.selected === true)
    const notInclueds = filteredInt.filter(item => !interest.includes(item))
    setinterest(notInclueds)

    setAllInterests(tempint)
  }
  // console.log(intIndex)
  const filterIndexIds = interest.map(item => item.id)


  const handleAddInterest = (e) => {
    e.stopPropagation()

    setInterestInput('')
    addInterest({ name: interestInput,icon: null })
      .then(res => {

        addcrossbox()
        setAllInterests([...allInterests,{ ...res.data.data,selected: true }])
        const newInterest = {
          id: res.data.data.id,
          name: res.data.data.name,
        }
        
      })
      .catch(err => {
        console.log(err);
        addcrossbox()
      })
  }

  //------call to next page hide and show div----------
  const openinterest = () => {
    setshowdiv(true);
    setbackcolor('rgb(145 165 186)')
    document.querySelector(".Profile_datainput__ZG9n4").classList.add("Profile_blur__z7wX8");
  }
  const crossbox = () => {
    setSelectedInterest(interest)
    setshowdiv(false)
    setbackcolor('#FFFFFF')
    document.querySelector(".Profile_datainput__ZG9n4").classList.remove("Profile_blur__z7wX8");
  }
  const addnew = () => {

    setaddnewtextdiv(true)
    setbackcolor('rgb(145 165 186)')
  }
  const addcrossbox = () => {

    setaddnewtextdiv(false);
    // setbackcolor('#001C38')
  }

  const handlePhotoUpload = e => {
    const file = e.target.files[0]
    if (file === undefined) return

    const formData = new FormData();
    formData.append("profile_picture",file);


    uploadProfile(formData,profileData.mobile_no)
      .then(res => {
        dispatch(updateProfileData({ profileData: res.data.data }))
        alert('profile data saved')
      })
      .catch(err => {
        console.log(err);
      })

  }

  const deselectInterest = (e,id) => {
    e.stopPropagation()
    let filtered = userInterests.filter(item => item.id !== id)
    let filteredAll = allInterests.map(item => {
      return item.id === id ? { ...item,selected: false } : { ...item }
    })
    const deselectInterest = interest.filter(item => item.id !== id)
    setinterest(deselectInterest)
    setUserInterests(filtered)
    setAllInterests(filteredAll)
    setSelectedInterest(deselectInterest)
  }

  console.log('interest',interest);
  // console.log('allInterests', allInterests);
  // console.log('userInterests', userInterests);
  // if (interest.length < 0) {
  //   console.log('interest',interest);
  // }
  console.log('selected',selectedInterest);
  return (
    <>
      <div className='pb-32 overflow-x-hidden sm:mb-0 lg:mt-[64px]  bg-[#EEFDFC] sm:bg-white'>
        <div className={styles.datainput} >
          <div className={styles.navbar}>

          </div>
          <div className={styles.head}>
            <img src={arrow} alt="" onClick={() => navigate(-1)} />
            <p className={styles.edithead}>Edit Your Profile</p>
          </div>
          <div className={styles.image}>
            <div className={styles.ssmmillee}>
              <img src={profileData.profile_picture ? profileData.profile_picture : photo}
                className={`w-[200px] customStyle`} alt=""
                onClick={() => photoRef.current.click()} />
              <input className='hidden' type='file' accept="image/png, image/gif, image/jpeg" ref={photoRef}
                onChange={(e) => handlePhotoUpload(e)} />
            </div>
            <p className={`cursor-pointer ${styles.addpit}`}
              onClick={() => photoRef.current.click()}
            >Add Profile picture
            </p>
          </div>
          <div className={`${styles.formimg} sm:mt-10 `}>
            <div className={styles.form}>
              <div className={styles.input1}>
                <label htmlFor="" className={styles.emaillabel} >Name</label>
                <input type="text" placeholder='Sahil Wadhwa' value={name}
                  name="name"
                  className={styles.emailinput}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className={styles.input1}>
                <label htmlFor="" className={`${styles.emaillabel} sm:mt-3`} >Phone Number</label>
                <input
                  // type="Number"
                  placeholder='9777766665' className={`${styles.emailinput} text-gray-400`}
                  value={mobile_no} name="mobile_no"
                  disabled style={{ border: '1px solid #ccc' }}

                  type={JSON.stringify(mobile_no)?.length < 10 ? "number" : "text"}
                  maxLength="10"
                // pattern='[0-9]{11}'
                // onChange={(e) => setPhone(parseInt(e.target.value))}
                />

              </div>
              <div className={styles.input1}>
                <label htmlFor="" className={`${styles.emaillabel} sm:mt-3`} >Email Address</label>

                <input
                  className={styles.emailinput} name="email"
                  placeholder='xyz@gmail.com'
                  onChange={(e) => setemail(e.target.value)}
                  value={email ? email : profileData.email ? profileData.email : ''}
                  required
                />



              </div>
              <div className={styles.input2}>
                <label htmlFor="" className={styles.emaillabel} >Gender</label>
                <div className={`sm:w-[50%] flex justify-between gap-4`}>
                  <div className={`w-full border border-gray-600 flex justify-between items-center px-2 sm:px-5 rounded-md ${gender === 'male' ? 'bg-[#BDF4FF] relative' : ''}`} onClick={() => setgender('male')} style={{ border: '1px solid gray' }}>
                    <label className='py-4 text-lg' htmlFor="">Male</label>
                    {gender === 'male' ?
                      <span className='text-blue-600 font-bold text-xl absolute top-3 right-6'> &#10003; </span> : ''}
                  </div>
                  <div className={`w-full border border-gray-500 flex justify-between items-center px-2 sm:px-5 rounded-md  items-center ${gender === 'female' ? 'bg-[#BDF4FF] relative' : ''}`} onClick={() => setgender('female')} style={{ border: '1px solid gray' }}>
                    <label className='py-4 text-lg' htmlFor="">Female</label>
                    {gender === 'female' ?
                      <span className='text-blue-600 font-bold text-xl absolute top-3 right-6'> &#10003; </span> : ''}
                  </div>
                </div>
              </div>
              <div className={styles.input1}>
                <label htmlFor="" className={styles.emaillabel} onClick={openinterest} >Interests</label>

                {
                  interest.length === 0 ?
                    <div type="text" placeholder='Click to choose' onClick={openinterest}
                      className={`${styles.chooseinput} sm:w-[50%]`}>
                      <p className=' pl-3  pt-2 sm:pt-0'> Click to choose</p>
                    </div>
                    :
                    <div className='h-[85px]  sm:w-[50%] py-3 flex flex-wrap items-center gap-x-3 gap-y-3 border border-[#939CA3] overflow-auto px-4' onClick={openinterest}>
                      {
                        selectedInterest.map(int => {
                          return <div className='bg-[#BDF4FF] py-1.5 px-3 flex items-center rounded-[8px]'>
                            {int.name}
                            <img src={CancelIcon}
                              className='ml-1.5 cursor-pointer'
                              alt='cancel'
                              onClick={(e) => deselectInterest(e,int.id)} />
                          </div>
                        })
                      }
                    </div>
                }
                {/* <div type="text" placeholder='Click to choose' onClick={openinterest}
                className={styles.chooseinput}>

              </div> */}
                {/*-------------Open interest page selecting---------------*/}
              </div>

            </div>
            <img src={ivoryforming} className={styles.ivoryForm} alt="" />
          </div>

          <button type='submit' className={styles.btnUpdate} onClick={handleSubmit}>Save Profile</button>
          {/*-------------Go to next page---------------*/}

        </div>

        {showdiv == true ?
          <Modal classname='max-w-[370px] rounded-[20px] sm:max-w-[740px] overflow-hidden'
            body={
              <>
                <div className={`${styles.int} pb-3 flex justify-center items-center ml-5`}>
                  <img src={cross} onClick={crossbox} alt="" className={styles.closeinterest} />{/*-------------Cross the open interest page selecting---------------*/}
                  <p className={`${styles.intp} font-semibold`}>Interests</p>
                </div>
                <hr className={styles.brk} />
                <p className={`py-4 font-semibold sm:ml-6 ml-3`}>Choose one or more:</p>
                <div className='flex flex-wrap gap-3 sm:ml-6 ml-3'>

                  {
                    allInterests.map((int,i) => {
                      return <div className={`text-lg flex justify-center flex-row items-center gap-2 cursor-pointer border border-gray-600 rounded-md px-3 py-1 font-semibold ${filterIndexIds.includes(int.id) ? 'bg-sky-300' : ''}`} style={{ border: '2px solid #939CA3' }}
                        // {filterIndexIds.includes(int.id)?'bg-red-400':''}
                        key={int.id} onClick={() => toggleInt(int)}>
                        <img src={int.icon} alt="" />
                        <h3> {int.name} </h3>
                      </div>
                    })
                  }
                </div>
                <div className='w-[100%] flex flex-row sm:justify-center justify-end items-center'>
                  {
                    interest.length === 0 ? <button className='py-2 bg-[#94D1F7] w-[90px] sm:mx-auto  mb-3 text-white rounded-full mt-10 sm:mt-20 sm:mb-10 mr-5'>Add</button> : <button className='py-2 bg-blue-500 w-[90px] sm:mx-auto  mb-3 text-white rounded-full mt-10 sm:mt-20 sm:mb-10 mr-5' onClick={crossbox}>Add</button>
                  }
                </div>{/*-------------Add Your interest page open---------------*/}
                <hr className={styles.hend} />
                <p className='text-left py-2 text-lg sm:text-md text-blue-600 underline mt-1 sm:ml-6 cursor-pointer' onClick={addnew}>Suggest more interest categories.</p>
              </>
            } />

          : <></>
        }
        {/* ------------------------------------------------------------- */}
        {/* -----------------------------------Add your interest div------------------------------------------------ */}
        {
          addnewtextdiv == true ?
            <Modal classname='max-w-[370px] rounded-[20px] sm:max-w-[740px] overflow-hidden'
              body={
                <>
                  <div className={`${styles.int} pb-3 flex justify-center items-center ml-5`}>
                    <img src={arrow} onClick={addcrossbox} alt="" className={styles.closeinterest} />{/*-------------Close Add Your interest page ---------------*/}
                    <p className={`${styles.intp}`}>Interest</p>
                  </div>
                  <hr className={styles.head1} />
                  <div className={styles.para}>
                    <p className='text-lg'>Didn't find your top interests?No worries! Let us know and we will
                      try our best to add more relavent
                      categories:
                    </p>
                    <input type="text" name='addtext'
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)} className='border my-2 pl-4 py-2 border-gray-600 mt-3' placeholder='Type here..' style={{ border: '1px solid #939CA3',borderRadius: '8px' }} />
                  </div>
                  <div className='w-[100%] flex flex-row sm:justify-center justify-end items-center'>
                    {
                      interestInput.length === 0 ? <button className='py-2 bg-[#94D1F7] w-[90px] sm:mx-auto  mb-3 text-white rounded-full mt-28 sm:mb-10'>Send</button> : <button className='py-2 bg-blue-600 w-[90px] sm:mx-auto  mb-3 text-white rounded-full mt-28 sm:mb-10' onClick={handleAddInterest}>Send</button>
                    }
                  </div>



                  {/* onClick={handleAddInterest} */}
                </>
              } />
            : <></>
        }
        {/* ------------------------------------------------------------------------------------------------------- */}
      </div>
    </>

  )
}

export default Profile