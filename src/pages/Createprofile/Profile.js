import React, { useEffect, useState } from 'react'
import arrow from "../../assets/arrow_back.png"
import styles from "./Profile.module.css"
import photo from "../../assets/smile.png"
import cross from "../../assets/cross.png"
import img from "../../assets/iphoto.png"
import ivoryforming from "../../assets/ivoryforming.png"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addInterest, getInterests } from '../../services/activities'
import { editProfile } from '../../services/user'

const Profile = () => {

  const [email, setemail] = useState("");
  const [addtext, settext] = useState("");
  const [showdiv, setshowdiv] = useState(false);
  const [addnewtextdiv, setaddnewtextdiv] = useState(false);
  const [textColor, setTextColor] = useState('white');
  const [backcolor, setbackcolor] = useState('#FFFFFF');
  const [blur, setblur] = useState("");

  const [interest, setinterest] = useState([]);
  const [allInterests, setAllInterests] = useState([])
  const [userInterests, setUserInterests] = useState([])
  const [interestInput, setInterestInput] = useState('')

  const navigate = useNavigate()
  const { loggedIn, profileData } = useSelector(state => state.user)

  console.log(addtext);
  // let arr = addtext.split(' '); 
  // console.log(arr);
  const [gender, setgender] = useState("");
  const colorchange = () => {
    setTextColor('Blue')
  }

  useEffect(() => {
    if (loggedIn === true) {

      setemail(profileData.email !== null ? profileData.email : '')
      setgender(profileData.gender !== null ? profileData.gender : '')
      setUserInterests(profileData.intrests)
    }
  }, [profileData, loggedIn])


  useEffect(() => {
    fetchInterests()
  }, [])

  const fetchInterests = () => {
    getInterests()
      .then(res => {
        console.log('allInterests', res.data.data);

        let intData = res.data.data
        intData = intData.filter(item => {
          if (item.created_by === profileData.id || item.created_by === 1) {
            return item
          }
        })
        const profileIntIds = profileData.intrests.map(int => int.id)
        intData = intData.map(item => ({ ...item, selected: false }))
        console.log(profileIntIds);
        console.log(intData);
        intData = intData.map(item => {
          if (profileIntIds.includes(item.id)) {
            return { ...item, selected: true }
          } else {
            return { ...item, selected: false }
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
  }, [allInterests])
  // const Backcolor = ()=>{
  //   setbackcolor('blue')
  // }
  const handleSubmit = () => {
    console.log(email);
    console.log(gender);
    let intIds = userInterests.map(item => item.id)
    console.log(intIds);
    let body = {
      gender, email, intrests: intIds
    }
    editProfile(body, profileData.mobile_no)
      .then(res => {
        console.log(res.data);
        alert('profile data saved')
      })
      .catch(err => {
        console.log(err);
      })
  }

  const toggleInt = id => {
    let tempint = allInterests.map(int => {
      if (int.id === id) {
        return { ...int, selected: !int.selected }
      } else {
        return { ...int }
      }
    })
    setAllInterests(tempint)
  }
  const handleAddInterest = () => {
    addInterest({ name: interestInput, icon: null })
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

  const [selec, setselec] = useState("true");

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

  // ------------------------------------------------------------
  return (
    <div className=''>
      {/* ----------------------main detail form ----------------------*/}
      <div className={styles.datainput} style={{ background: backcolor }}>
        <div className={styles.navbar}>

        </div>
        <div className={styles.head}>
          <img src={arrow} alt="" onClick={() => navigate(-1)} />
          <p className={styles.edithead}>Edit Your Profile</p>
        </div>
        <div className={styles.image}>
          <div className={styles.ssmmillee}>
            <img src={photo} className={styles.img2} alt="" />
          </div>
          <p className={styles.addpit}>Add Profile picture</p>
        </div>
        <div className={styles.formimg}>
          <div className={styles.form}>
            <div className={styles.input1}>
              <label htmlFor="" className={styles.emaillabel} >Name</label>
              <input type="text" placeholder='Sahil Wadhwa' className={styles.emailinput} name="email" onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className={styles.input1}>
              <label htmlFor="" className={styles.emaillabel} >Phone Number</label>
              <input type="text" placeholder='9777766665' className={styles.emailinput} name="email" onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className={styles.input1}>
              <label htmlFor="" className={styles.emaillabel} >Email Address</label>
              <input type="text" placeholder='xyz@gmail.com' className={styles.emailinput} name="email"
                value={email} onChange={(e) => setemail(e.target.value)} />
            </div>
            <div className={styles.input2}>
              <label htmlFor="" className={styles.emaillabel} >Gender</label>
              <div className={styles.genderinput}>
                <div className={styles.checkboxdiv1}>
                  <label className={styles.gendermale} htmlFor="">Male</label>
                  <input label="Male" value="male" type="checkbox"
                    checked={gender === 'male' ? true : false}
                    onChange={(e) => setgender(e.target.value)} className={styles.maleinput}
                  />
                </div>
                <div className={styles.checkboxdiv2}>
                  <label className={styles.genderFemale} htmlFor="">Female</label>
                  <input label="Female" checked={gender === 'female'} value='female' type="checkbox" onChange={(e) => setgender(e.target.value)} className={styles.femaleinput} />
                </div>
              </div>
            </div>
            <div className={styles.input1}>
              <label htmlFor="" className={styles.emaillabel} onClick={openinterest} >Interests</label>

              {
                userInterests.length === 0 ?
                  <div type="text" placeholder='Click to choose' onClick={openinterest}
                    className={styles.chooseinput}>
                  </div>
                  :
                  <div className='h-[85px] py-3 flex flex-wrap items-center gap-x-3 gap-y-3 border border-[#939CA3] overflow-auto px-4'>
                    {
                      userInterests.map(int => {
                        return <div className='bg-[#BDF4FF] py-1.5 px-3  rounded-[8px]'>
                          {int.name}
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
        <button className={styles.btnUpdate} onClick={handleSubmit}>Save Profile</button>{/*-------------Go to next page---------------*/}
      </div>
      {/* ------------------------------------------------------------------------------ */}
      {/* ---------------------------The interest selecting div------------------------------------ */}
      {showdiv == true ?
        <div className={styles.allinterest}>
          <div className={styles.int}>
            <img src={cross} onClick={crossbox} alt="" className={styles.closeinterest} />{/*-------------Cross the open interest page selecting---------------*/}
            <p className={styles.intp}>Interests</p>
          </div>
          <hr className={styles.brk} />
          <p className={styles.cho}>Choose one or more:</p>
          <div className={styles.intttopic}>
            {
              interest?.map((ele, index) => {
                return (
                  // <div className={styles.inttopic}>
                  <span className={styles.butt1} style={{ background: textColor }} onClick={colorchange}>
                    <img src={img} alt="" />
                    <h3>{ele.name}</h3>
                  </span>
                )
              })
            }
            {
              allInterests.map(int => {
                return <div className={`${styles.butt1} ${int.selected === true ? `${styles.interestSelected}` : ''} `}
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
        </div> : <></>
      }
      {/* ------------------------------------------------------------- */}
      {/* -----------------------------------Add your interest div------------------------------------------------ */}
      {
        addnewtextdiv == true ?
          <div className={styles.addtext}>
            <div className={styles.int}>
              <img src={cross} onClick={addcrossbox} alt="" className={styles.closeinterest} />{/*-------------Close Add Your interest page ---------------*/}
              <p className={styles.intp}>Interest</p>
            </div>
            <hr className={styles.head1} />
            <div className={styles.para}>
              <p>Didn't find your top interests?No worries! Let us know and we will
                try our best to add more relavent
                categories:
              </p>
              <input type="text" name='addtext' onChange={(e) => settext(e.target.value)} className={styles.parainput} placeholder='Type here..' />
            </div>
            <button className={styles.send}
              onClick={handleAddInterest}>Send</button>
          </div> : <></>
      }
      {/* ------------------------------------------------------------------------------------------------------- */}
    </div>
  )
}

export default Profile