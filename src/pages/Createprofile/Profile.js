import React,{ useEffect,useRef,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import arrow from "../../assets/arrow_back.png"
import cross from "../../assets/cross.png"
import CancelIcon from '../../assets/icons/x-icon.svg'
import img from "../../assets/iphoto.png"
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
  const [text,settext] = useState("");
  const [showdiv,setshowdiv] = useState(false);
  const [addnewtextdiv,setaddnewtextdiv] = useState(false);
  const [textColor,setTextColor] = useState('white');
  const [backcolor,setbackcolor] = useState('#FFFFFF');
  const [blur,setblur] = useState("");

  const [interest,setinterest] = useState([]);
  const [allInterests,setAllInterests] = useState([])
  const [userInterests,setUserInterests] = useState([])
  const [interestInput,setInterestInput] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error,setError] = useState('')



  const { loggedIn,profileData } = useSelector(state => state.user)
  const photoRef = useRef(null)

  // let arr = addtext.split(' '); 
  // console.log(arr);
  const [gender,setgender] = useState("");
  const colorchange = () => {
    setTextColor('Blue')
  }

  useEffect(() => {
    if (loggedIn === true) {

      setemail(profileData.email !== null ? profileData.email : '')
      setgender(profileData.gender !== null ? profileData.gender : '')
      setName(profileData.name !== null ? profileData.name : '')
      setMobile_no(profileData.mobile_no !== null ? profileData.mobile_no : '')
      setUserInterests(profileData.intrests)
    }
  },[profileData,loggedIn])


  useEffect(() => {
    fetchInterests()
  },[])

  const fetchInterests = () => {
    getInterests()
      .then(res => {
        // console.log('allInterests', res.data.data);

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


  const handleSubmit = (e) => {
    e.preventDefault();
    parseInt(mobile_no)

    let intIds = userInterests.map(item => item.id)

    if (JSON.stringify(mobile_no).length < 10) {

      setError("Phone number must be 10 digits");
    } else if (mobile_no.length > 10) {
      console.log(mobile_no.length);
      setError("Phone number cannot be more than 10 digits");
    } else {
      setError('')
      const body = {
        gender,email,intrests: intIds,name,mobile_no
      }
      editProfile(body,profileData.mobile_no)
        .then(res => {
          console.log(res.data);
          dispatch(updateProfileData({ profileData: res.data.data }))
          alert('profile data saved')
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  const [intIndex,setIntIndex] = useState([])
  const toggleInt = id => {

    let tempint = allInterests.map(int => {
      if (int.id === id) {
        return { ...int,selected: !int.selected }
      } else {
        return { ...int }
      }
    })
    const filteredInt = tempint.filter(item => item.selected === true)
    setIntIndex(filteredInt)

    setAllInterests(tempint)
    // console.log('clickec');
  }
  // console.log(intIndex)
  const filterIndexIds = intIndex.map(item => item.id)
  // console.log(filterIndexIds);





  const handleAddInterest = () => {
    addInterest({ name: interestInput,icon: null })
      .then(res => {
        console.log(res.data);
        addcrossbox()
        fetchInterests()
      })
      .catch(err => {
        console.log(err);
        addcrossbox()
        fetchInterests()

      })
  }

  const [selec,setselec] = useState("true");

  //------call to next page hide and show div----------
  const openinterest = () => {
    setshowdiv(true);
    setbackcolor('rgb(145 165 186)')
    document.querySelector(".Profile_datainput__ZG9n4").classList.add("Profile_blur__z7wX8");
  }
  const crossbox = () => {
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
        console.log(res.data);
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
    setUserInterests(filtered)
    setAllInterests(filteredAll)
  }

  // console.log('interest', interest);
  // console.log('allInterests', allInterests);
  // console.log('userInterests', userInterests);

  return (
    <>
      <div className='mb-20 sm:mb-0  bg-[#EEFDFC] sm:bg-white'>
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
                className={styles.img2} alt=""
                onClick={() => photoRef.current.click()} />
              <input className='hidden' type='file' accept="image/png, image/gif, image/jpeg" ref={photoRef}
                onChange={(e) => handlePhotoUpload(e)} />
            </div>
            <p className={`cursor-pointer ${styles.addpit}`}
              onClick={() => photoRef.current.click()}

            >Add Profile picture
            </p>
          </div>
          <div className={`${styles.formimg} sm:mt-3`}>
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
                  placeholder='9777766665' className={styles.emailinput}
                  value={mobile_no} name="mobile_no"
                  onChange={(e) => setMobile_no(parseInt(e.target.value))}

                  type={JSON.stringify(mobile_no)?.length < 10 ? "number" : "text"}
                  maxLength="10"
                // pattern='[0-9]{11}'
                // onChange={(e) => setPhone(parseInt(e.target.value))}
                />
                <p className="ml-8 text-red-300">{error}</p>
              </div>
              <div className={styles.input1}>
                <label htmlFor="" className={`${styles.emaillabel} sm:mt-3`} >Email Address</label>

                <input
                  className={styles.emailinput} name="email"
                  placeholder='xyz@gmail.com'
                  onChange={(e) => setemail(e.target.value)}
                  value={email ? email : profileData.email ? profileData.email : ''}
                />



              </div>
              <div className={styles.input2}>
                <label htmlFor="" className={styles.emaillabel} >Gender</label>
                <div className={styles.genderinput}>
                  <div className={`${styles.checkboxdiv1} ${gender === 'male' ? 'bg-[#BDF4FF] relative' : ''}`} onClick={() => setgender('male')}>
                    <label className={styles.gendermale} htmlFor="">Male</label>
                    {gender === 'male' ?
                      <span className='text-blue-600 font-bold text-xl absolute top-2 right-5'> &#10003; </span> : ''}
                  </div>
                  <div className={`${styles.checkboxdiv2} ${gender === 'female' ? 'bg-[#BDF4FF] relative' : ''}`} onClick={() => setgender('female')}>
                    <label className={styles.genderFemale} htmlFor="">Female</label>
                    {gender === 'female' ?
                      <span className='text-blue-600 font-bold text-xl absolute top-2 right-5'> &#10003; </span> : ''}
                  </div>
                </div>
              </div>
              <div className={styles.input1}>
                <label htmlFor="" className={styles.emaillabel} onClick={openinterest} >Interests</label>

                {
                  userInterests.length === 0 ?
                    <div type="text" placeholder='Click to choose' onClick={openinterest}
                      className={styles.chooseinput}>
                      <p className=' pl-3 pt-2'> Click to choose</p>
                    </div>
                    :
                    <div className='h-[85px] py-3 flex flex-wrap items-center gap-x-3 gap-y-3 border border-[#939CA3] overflow-auto px-4' onClick={openinterest}>
                      {
                        userInterests.map(int => {
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
          <button type='submit' className={styles.btnUpdate} onClick={handleSubmit}>Save Profile</button>{/*-------------Go to next page---------------*/}
          <button type='submit' className={styles.btnUpdate2} onClick={handleSubmit}>Save Profile</button>
        </div>
        {/* ------------------------------------------------------------------------------ */}
        {/* ---------------------------The interest selecting div------------------------------------ */}
        {showdiv == true ?
          <Modal classname='max-w-[434px] rounded-[20px]'
            body={
              <>
                <div className={styles.int}>
                  <img src={cross} onClick={crossbox} alt="" className={styles.closeinterest} />{/*-------------Cross the open interest page selecting---------------*/}
                  <p className={styles.intp}>Interests</p>
                </div>
                <hr className={styles.brk} />
                <p className={`${styles.cho}`}>Choose one or more:</p>
                <div className={styles.intttopic}>
                  {
                    interest?.map((ele,index) => {
                      return (
                        // <div className={styles.inttopic}>
                        <span className={styles.butt1} style={{ background: textColor }}
                          onClick={colorchange}>
                          <img src={img} alt="" />
                          <h3>{ele.name}</h3>
                        </span>
                      )
                    })
                  }
                  {
                    allInterests.map((int,i) => {
                      return <div className={`${styles.butt1} ${int.selected === true ? `${styles.interestSelected}` : ''}`}
                        // {filterIndexIds.includes(int.id)?'bg-red-400':''}
                        key={int.id} onClick={() => toggleInt(int.id)} >
                        <img src={int.icon} alt="" />
                        <h3> {int.name} </h3>
                      </div>
                    })
                  }
                </div>
                <button className={styles.addint} onClick={addnew}>Add</button>{/*-------------Add Your interest page open---------------*/}
                <hr className={styles.hend} />
                <Link to="/"><p className={styles.more}>Suggest more interest categories.</p></Link>
              </>
            } />

          : <></>
        }
        {/* ------------------------------------------------------------- */}
        {/* -----------------------------------Add your interest div------------------------------------------------ */}
        {
          addnewtextdiv == true ?
            <Modal classname='max-w-[434px] rounded-[20px]'
              body={
                <>
                  <div className={styles.int}>
                    <img src={arrow} onClick={addcrossbox} alt="" className={styles.closeinterest} />{/*-------------Close Add Your interest page ---------------*/}
                    <p className={styles.intp}>Interest</p>
                  </div>
                  <hr className={styles.head1} />
                  <div className={styles.para}>
                    <p>Didn't find your top interests?No worries! Let us know and we will
                      try our best to add more relavent
                      categories:
                    </p>
                    <input type="text" name='addtext'
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)} className={styles.parainput} placeholder='Type here..'
                    />
                  </div>
                  <button className={styles.send}
                    onClick={handleAddInterest}>Send</button>
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