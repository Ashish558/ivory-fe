import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Activities from './pages/Activities/Activities';
import ActivityType from './pages/ActivityType/ActivityType';
import Profile from './pages/Createprofile/Profile';
import Footer from './pages/Home/Footer';
import Home from './pages/Home/Home.jsx';
import LoggedInHome from './pages/Home/LoggedInHome';
import Login from './pages/Login/Login';
import Otp from './pages/Login/Otp';
import Navbar from './pages/Navbar/Navbar';
import Congrates from './pages/SignUp/Congrates';
import SignUp from './pages/SignUp/SignUp';
import StartActivity from './pages/StartActivity/StartActivity';
import { updateLoggedIn, updateProfileData } from './redux/slices/user';
import { refreshToken } from './services/auth';
import { getUserDetail } from './services/user';

import Assignment from './pages/Home/Assignment';
import Assignment1 from './pages/Home/Assignment1';
import Learn from './pages/Home/Learn';
import Four from './pages/splash/Four';
import Landing from './pages/splash/Landing';
import LogoLanding from './pages/splash/LogoLanding';
import Second from './pages/splash/Second';
import Third from './pages/splash/Third';
// import Enroll from './pages/Home'
// import LogoLanding from './pages/splash/LogoLanding';
import Enroll from './pages/Learn/Enroll/Enroll';
import LiveSession from './pages/Learn/LiveSessionNew/LiveSession';
import LiveEvents from './pages/LiveEvents/LiveEvents';
import Dob from './pages/SignUp/Dob';
import SingleSession from './pages/SingleSession/SingleSession';

import NavbarDesktop from './pages/Desktop/NavbarDesktop/NavbarDesktop';
function App() {
  //true for now will change later
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { loggedIn, profileData } = useSelector(state => state.user)

  useEffect(() => {
    if (localStorage.getItem('refresh')) {
      let body = {
        refresh:
          localStorage.getItem('refresh')
      }
      refreshToken(body)
        .then(res => {
          // console.log('ref res', res.data.data.access);
          localStorage.setItem('access', res.data.data.access)
          dispatch(updateLoggedIn({ loggedIn: true }))
          fetchUserDetails(true)

          if (res.data.data === null) return
        }).catch(err => {
          setLoading(false)
          dispatch(updateLoggedIn({ loggedIn: false }))
          console.log('ref err', err.response);
        })
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUserDetails = (isInitial) => {
    getUserDetail()
      .then(res => {
        // console.log('profile', res.data.data[0]);
        dispatch(updateProfileData({ profileData: res.data.data[0] }))
        if (isInitial) {
          setLoading(false)
        }
      })
      .catch(err => {
        console.log('profile err', err);
        if (isInitial) {
          dispatch(updateLoggedIn({ loggedIn: false }))
          setLoading(false)
        }
      })
  }

  useEffect(() => {
    fetchUserDetails()
  }, [loggedIn])

  if (loading === true) return <></>

  return (
    <BrowserRouter>
      <Navbar />
      <NavbarDesktop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/live-events" element={<LiveEvents />} />
        <Route path="/live-events/:id" element={<SingleSession />} />

        <Route path="/program/:id" element={<LiveSession />} />
        
        <Route path="/otp" element={<Otp />} />
        <Route path="/dob" element={<Dob />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Congrates" element={<Congrates />} />
        <Route path="/home" element={<LoggedInHome />} />

        <Route exact path='/logolanding' element={<LogoLanding />}></Route>
        <Route exact path='/landing' element={<Landing />}></Route>
        <Route exact path='/second' element={<Second />}></Route>
        <Route exact path='/third' element={<Third />}></Route>
        <Route exact path='/four' element={<Four />}></Route>

        <Route
          path="/CreateProfile"
          element={
            <RequireAuth loggedIn={loggedIn ? true : false}>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/"
          element={
            <Home />
          }
        />
        <Route
          path="/activities"
          element={
            <Activities />
          }
        />
        <Route
          path="/learn" element={<Learn />}
        />
        <Route path="/learn/:id" element={<Enroll />} />

        <Route
          path="/Assignment"
          element={
            <Assignment />
          }
        />
        <Route
          path="/Assignment1"
          element={
            <Assignment1 />
          }
        />
        <Route
          path="/activities/:categoryId"
          element={
            <ActivityType />
          }
        />
        <Route
          path="/activities/:categoryId/:activityId/start"
          element={
            <StartActivity fetchUserDetails={fetchUserDetails} />
          }
        />

      </Routes >
      <Footer />
    </BrowserRouter >

  );
}

function RequireAuth({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" />;
}

export default App;
