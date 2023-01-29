import React, { useState } from 'react'
import arrow from "../../assets/arrow_back.png"
import "./Profile.css"
import photo from "../../assets/smile.png"
import cross from "../../assets/cross.png"
import img from "../../assets/iphoto.png"
import { Link } from 'react-router-dom'
const Profile = () => {

  const [email,setemail] = useState("");
  const [gender,setgender] = useState("");
  const [interest,setinterest] = useState([]);
  console.log(email);
  console.log(gender);

  //------call to next page hide and show div----------
  const openinterest = ()=>{
      const divv = document.querySelector(".all-interest");
      const divvback = document.querySelector(".data-input");
      divv.style.display = "block";
      divvback.style.backgroundColor = "rgb(154 175 196)";
    }
    const crossbox = ()=>{
      const divv = document.querySelector(".all-interest");
      // divv.style.display = "none";
      divv.style.display = "none";
      const divvback = document.querySelector(".data-input");
      divvback.style.backgroundColor = "white";
    }
    const addnew = () =>{
      const newdivv = document.querySelector(".add-text");
      newdivv.style.display = "block";
    }
    const addcrossbox = ()=>{
      const newdivv = document.querySelector(".add-text");
      // divv.style.display = "none";
      newdivv.style.display = "none";
    }

  // ------------------------------------------------------------
  return (
    <div>
    {/* ----------------------main detail form ----------------------*/}
    <div className='data-input'>
    <div className="head">
      <img src={arrow} alt="" />
     <p className='edit-head'>Edit Your Profile</p> 
    </div> 
    <div className='image'>
        <div className='ssmmillee'>
          <img src={photo} className="img2" alt="" />
        </div>
    </div>
    <div className="form">
      <div className='input1'>
        <label htmlFor=""className='email-label' >Email Address</label>
        <input type="text" placeholder='xyz@gmail.com' className='email-input' name="email" onChange={(e)=>setemail(e.target.value)}/>
      </div>
      <div className='input2'>
        <label htmlFor=""className='email-label' >Gender</label>
        <div className='gender-input'>
          <div className='checkbox-div-1'>
          <label className='gender-male' htmlFor="">Male</label>
        <input  type="radio" name='gender' placeholder='Male'  onChange={(e)=>setgender(e.target.value)} className='male-input'/>
          </div>
          <div className='checkbox-div-2'>
          <label className='gender-Female' htmlFor="">Female</label>
        <input type="radio" placeholder='Female' name='gender' onChange={(e)=>setgender(e.target.value)} className='female-input'/>
        </div>
          </div>
      </div>
      <div className='input1'>
        <label htmlFor=""className='email-label'  >Interests</label>
        <input type="text" placeholder='Click to choose' onClick={openinterest}  className='email-input'/>{/*-------------Open interest page selecting---------------*/}
      </div>
    </div>
    <button className='btn-Update'>Update</button>{/*-------------Go to next page---------------*/}
    </div>
    {/* ------------------------------------------------------------------------------ */}
    {/* ---------------------------The interest selecting div------------------------------------ */}
    <div className='all-interest'>
    <div className="int">
      <img src={cross} onClick={crossbox} alt="" className='close-interest'/>{/*-------------Cross the open interest page selecting---------------*/}
      <p className='intp'>Interest</p>
      </div>
    <hr className='brk'/>
    <p className='cho'>Choose one or more:</p>
    <div className='int-topic'> 
    <div className='inttopic'>
        <div className="butt1">
          <img src={img} alt="" />
          <h3>Socializing</h3>
        </div>
        <div className="butt2">
          <img src={img} alt="" />
          <h3>Community work</h3>
        </div>
</div>
<div className='inttopic'>
<div className="butt3">
  <img src={img} alt="" />
  <h3>Photography</h3>
</div>
<div className="butt4">
  <img src={img} alt="" />
  <h3>Writing</h3>
</div>
    </div>
    <div className='inttopic'>


<div className="butt5">
  <img src={img} alt="" />
  <h3>Gardening</h3>
</div>
<div className="butt6">
  <img src={img} alt="" />
  <h3>Arts & Crafts</h3>
</div>
</div>
<div className='inttopic'>

            <div className="butt5">
              <img src={img} alt="" />
              <h3>Mythology</h3>
            </div>
            <div className="butt6">
              <img src={img} alt="" />
              <h3>Technology</h3>
            </div>
        </div>
        <button className='addint' onClick={addnew}>Add</button>{/*-------------Add Your interest page open---------------*/}
        <hr className='hend'/>
        <Link to="/"><p  className='more'>Suggest more interest categories.</p></Link>
    </div>
    </div>
    {/* ------------------------------------------------------------- */}
    {/* -----------------------------------Add your interest div------------------------------------------------ */}
    <div className='add-text'>
        <div className="int">
      <img src={cross} onClick={addcrossbox} alt="" className='close-interest'/>{/*-------------Close Add Your interest page ---------------*/}
      <p className='intp'>Interest</p>
        </div>
        <hr className='head1'/>
        <div className="para">
      <p>Didn't find your top interests?No worries! Let us know and we will 
      try our best to add more relavent
      categories:
      </p>
      <input type="text"  className='parainput' placeholder='Type here..'/>
      </div>
      <button className='send'>Send</button>
    </div>
    {/* ------------------------------------------------------------------------------------------------------- */}
    </div>
  )
}

export default Profile