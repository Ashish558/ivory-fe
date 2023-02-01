import React, { useEffect, useState } from 'react'
import arrow from "../../assets/arrow_back.png"
import styles from "./Profile.module.css"
import photo from "../../assets/smile.png"
import cross from "../../assets/cross.png"
import img from "../../assets/iphoto.png"
import ivoryforming from "../../assets/ivoryforming.png"
import { Link } from 'react-router-dom'
const Profile = () => {

  const [email,setemail] = useState("");
  const [addtext,settext] = useState("");
  const [showdiv,setshowdiv]=useState(false);
  const [addnewtextdiv,setaddnewtextdiv]=useState(false);
  const [textColor,setTextColor]=useState('white');
  const [backcolor,setbackcolor]=useState('#FFFFFF');
  const [blur,setblur]=useState("");
  console.log(addtext);
  // let arr = addtext.split(' '); 
  // console.log(arr);
  const [gender,setgender] = useState("");
  const colorchange =()=>{
    setTextColor('Blue')
  }
  // const Backcolor = ()=>{
  //   setbackcolor('blue')
  // }
  const [interest,setinterest] = useState([
    {
        name:"dknkmvcam",
        selected:false
    },
    {
        name:"dknkmvcam",
        selected:false
    },
    {
        name:"dknkmvcam",
        selected:false
    },
    {
        name:"dknkmvcam",
        selected:false
    },
    {
        name:"dknkmvcam",
        selected:false
    },
    {
        name:"dknkmvcam",
        selected:false
    },
    {
        name:"dknkmvcam",
        selected:false
    }
  ])
  const [selec,setselec] = useState("true");
  console.log(email);
  console.log(gender);
  //------call to next page hide and show div----------
    const openinterest = ()=>{
        setshowdiv(true);
        setbackcolor('rgb(145 165 186)')
        document.querySelector(".Profile_datainput__ZG9n4").classList.add("Profile_blur__z7wX8");


    }
    const crossbox = ()=>{
        setshowdiv(false)
        setbackcolor('#FFFFFF')
        document.querySelector(".Profile_datainput__ZG9n4").classList.remove("Profile_blur__z7wX8");
    }
    const addnew= () =>{
        setaddnewtextdiv(true)
        setbackcolor('rgb(145 165 186)')
    }
    const addcrossbox = ()=>{
        setaddnewtextdiv(false);
        // setbackcolor('#001C38')
    }
  // ------------------------------------------------------------
  return (
    <div>
    {/* ----------------------main detail form ----------------------*/}
    <div className={styles.datainput} style={{background:backcolor}}>
      <div className={styles.navbar}>

      </div>
    <div className={styles.head}>
      <img src={arrow} alt="" />
     <p className={styles.edithead}>Edit Your Profile</p> 
    </div> 
    <div className={styles.image}>
        <div className={styles.ssmmillee}>
          <img src={photo} className={styles.img2} alt="" />
        </div>
    </div>
    <div className={styles.formimg}>
    <div className={styles.form}>
      <div className={styles.input1}>
        <label htmlFor=""className={styles.emaillabel} >Name</label>
        <input type="text" placeholder='Sahil Wadhwa' className={styles.emailinput} name="email" onChange={(e)=>setemail(e.target.value)}/>
      </div>
      <div className={styles.input1}>
        <label htmlFor=""className={styles.emaillabel} >Phone Number</label>
        <input type="text" placeholder='9777766665' className={styles.emailinput} name="email" onChange={(e)=>setemail(e.target.value)}/>
      </div>
      <div className={styles.input1}>
        <label htmlFor=""className={styles.emaillabel} >Email Address</label>
        <input type="text" placeholder='xyz@gmail.com' className={styles.emailinput} name="email" onChange={(e)=>setemail(e.target.value)}/>
      </div>
      <div className={styles.input2}>
        <label htmlFor=""className={styles.emaillabel} >Gender</label>
        <div className={styles.genderinput}>
          <div className={styles.checkboxdiv1}>
          <label className={styles.gendermale} htmlFor="">Male</label>
        <input label="Male" checked={gender === 'Male'} value="Male" type="radio" onChange={(e)=>setgender(e.target.value)} className={styles.maleinput}/>
          </div>
          <div className={styles.checkboxdiv2}>
          <label className={styles.genderFemale} htmlFor="">Female</label>
        <input label="Female" checked={gender === 'Female'} value="Female" type="radio" onChange={(e)=>setgender(e.target.value)} className={styles.femaleinput}/>
        </div>
          </div>
      </div>
      <div className={styles.input1}>
        <label htmlFor="" className={styles.emaillabel} >Interests</label>
        <div type="text" placeholder='Click to choose' onClick={openinterest}  className={styles.chooseinput}>
        {/* {
            arr?.map((ele)=>{
                return(
                   <div className={styles.divaddinput}>
                    <p>{ele}</p>
                    </div>
                )
            })
        } */}
            </div>{/*-------------Open interest page selecting---------------*/}
      </div>
    </div>
    <img src={ivoryforming} className={styles.ivoryForm} alt="" />
    </div>
    <button className={styles.btnUpdate}>Save Profile</button>{/*-------------Go to next page---------------*/}
    </div>
    {/* ------------------------------------------------------------------------------ */}
    {/* ---------------------------The interest selecting div------------------------------------ */}
    {showdiv==true?
    <div className={styles.allinterest}>
    <div className={styles.int}>
      <img src={cross} onClick={crossbox} alt="" className={styles.closeinterest}/>{/*-------------Cross the open interest page selecting---------------*/}
      <p className={styles.intp}>Interest</p>
      </div>
    <hr className={styles.brk}/>
    <p className={styles.cho}>Choose one or more:</p>
    <div className={styles.intttopic}> 
        {
            interest?.map((ele,index)=>{
                return(
                // <div className={styles.inttopic}>
                    <span className={styles.butt1}  style={{background:textColor}} onClick={colorchange}>
                    <img src={img} alt="" />
                    <h3>{ele.name}</h3>
                    </span>
                )
            })
        }
    </div>
        <button className={styles.addint} onClick={addnew}>Add</button>{/*-------------Add Your interest page open---------------*/}
        <hr className={styles.hend}/>
        <Link to="/"><p  className={styles.more}>Suggest more interest categories.</p></Link>
    </div>:<></>
    }
    {/* ------------------------------------------------------------- */}
    {/* -----------------------------------Add your interest div------------------------------------------------ */}
    {
        addnewtextdiv ==true?
    <div className={styles.addtext}>
        <div className={styles.int}>
      <img src={cross} onClick={addcrossbox} alt="" className={styles.closeinterest}/>{/*-------------Close Add Your interest page ---------------*/}
      <p className={styles.intp}>Interest</p>
        </div>
        <hr className={styles.head1}/>
        <div className={styles.para}>
      <p>Didn't find your top interests?No worries! Let us know and we will 
      try our best to add more relavent
      categories:
      </p>
      <input type="text" name='addtext' onChange={(e)=>settext(e.target.value)} className={styles.parainput} placeholder='Type here..'/>
      </div>
      <button className={styles.send}>Send</button>
    </div>:<></>
    }
    {/* ------------------------------------------------------------------------------------------------------- */}
    </div>
  )
}

export default Profile