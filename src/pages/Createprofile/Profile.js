import React, { useEffect, useState } from 'react'
import arrow from "../../assets/arrow_back.png"
import "./Profile.css"
import photo from "../../assets/smile.png"
import cross from "../../assets/cross.png"
import img from "../../assets/iphoto.png"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addInterest, getInterests } from '../../services/activities'
import { editProfile } from '../../services/user'

const Profile = () => {

  const [email, setemail] = useState("");
  const [gender, setgender] = useState("male");
  const [interest, setinterest] = useState([]);
  const [allInterests, setAllInterests] = useState([])
  const [userInterests, setUserInterests] = useState([])
  const [interestInput, setInterestInput] = useState('')

  const navigate = useNavigate()

  const { loggedIn, profileData } = useSelector(state => state.user)

  // console.log('user', profileData);

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
          if(profileIntIds.includes(item.id)) {
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

  //------call to next page hide and show div----------
  const openinterest = () => {
    const divv = document.querySelector(".all-interest");
    const divvback = document.querySelector(".data-input");
    divv.style.display = "block";
    divvback.style.backgroundColor = "rgb(154 175 196)";
  }
  const crossbox = () => {
    const divv = document.querySelector(".all-interest");
    // divv.style.display = "none";
    divv.style.display = "none";
    const divvback = document.querySelector(".data-input");
    divvback.style.backgroundColor = "white";
  }
  const addnew = () => {
    const newdivv = document.querySelector(".add-text");
    newdivv.style.display = "block";
  }
  const addcrossbox = () => {
    const newdivv = document.querySelector(".add-text");
    // divv.style.display = "none";
    newdivv.style.display = "none";
  }

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
  // ------------------------------------------------------------
  return (
    <div>
      {/* ----------------------main detail form ----------------------*/}
      <div className='data-input'>
        <div className="head">
          <img src={arrow} alt="" onClick={() => navigate(-1)} />
          <p className='edit-head'>Edit Your Profile</p>
        </div>
        <div className='image'>
          <div className='ssmmillee'>
            <img src={photo} className="img2" alt="" />
          </div>
        </div>
        <div className="form">
          <div className='input1'>
            <label htmlFor="" className='email-label' >Email Address</label>
            <input type="text" placeholder='xyz@gmail.com' value={email} className='email-input' name="email" onChange={(e) => setemail(e.target.value)} />
          </div>
          <div className='input2'>
            <label htmlFor="" className='email-label' >Gender</label>
            <div className='gender-input'>
              <div className='checkbox-div-1'>
                <label className='gender-male' htmlFor="">Male</label>
                <input type="radio" name='gender' placeholder='Male' value='male' checked={gender === 'male' ? true : false}
                  onChange={(e) => setgender(e.target.value)} className='male-input' />
              </div>
              <div className='checkbox-div-2'>
                <label className='gender-Female' htmlFor="">Female</label>
                <input type="radio" placeholder='Female' name='gender' value='female'
                  checked={gender === 'female' ? true : false}
                  onChange={(e) => setgender(e.target.value)} className='female-input' />
              </div>
            </div>
          </div>

          <div className='input1'>
            <label htmlFor="" className='email-label' onClick={openinterest} >Interests</label>
            {
              userInterests.length === 0 ?
                <input type="text" placeholder='Click to choose' onClick={openinterest} className='email-input' />
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
            {/*-------------Open interest page selecting---------------*/}
          </div>

        </div>
        <button className='btn-Update' onClick={handleSubmit} >Update</button>{/*-------------Go to next page---------------*/}
      </div>
      {/* ------------------------------------------------------------------------------ */}
      {/* ---------------------------The interest selecting div------------------------------------ */}
      <div className='all-interest'>
        <div className="int">
          <img src={cross} onClick={crossbox} alt="" className='close-interest' />{/*-------------Cross the open interest page selecting---------------*/}
          <p className='intp'>Interest</p>
        </div>
        <hr className='brk' />
        <p className='cho'>Choose one or more:</p>
        <div className='int-topic'>

          {
            allInterests.map(int => {
              return <div className={`butt1 ${int.selected === true ? 'interest-selected' : ''} `} key={int.id} onClick={() => toggleInt(int.id)} >
                <img src={int.icon} alt="" />
                <h3> {int.name} </h3>
              </div>
            })
          }
        </div>
        <div>
          <button className='addint' onClick={addnew}>Add</button>{/*-------------Add Your interest page open---------------*/}
          <hr className='hend' />
          <Link to="/"><p className='more'>Suggest more interest categories.</p></Link>
        </div>
      </div>
      {/* ------------------------------------------------------------- */}
      {/* -----------------------------------Add your interest div------------------------------------------------ */}
      <div className='add-text'>
        <div className="int">
          <img src={cross} onClick={addcrossbox} alt="" className='close-interest' />{/*-------------Close Add Your interest page ---------------*/}
          <p className='intp'>Interest</p>
        </div>
        <hr className='head1' />
        <div className="para">
          <p>Didn't find your top interests?No worries! Let us know and we will
            try our best to add more relavent
            categories:
          </p>
          <input type="text" className='parainput px-4' placeholder='Type here..'
            value={interestInput}
            onChange={e => setInterestInput(e.target.value)} />
        </div>
        <button className='send disabled:opacity-60'
          disabled={interestInput.trim().length === 0 ? true : false}
          onClick={handleAddInterest} >
          Send
        </button>
      </div>
      {/* ------------------------------------------------------------------------------------------------------- */}
    </div>
  )
}

export default Profile