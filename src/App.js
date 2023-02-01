import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";

import Home from './pages/Home/Home.jsx';
import Activities from './pages/Activities/Activities';
import ActivityType from './pages/ActivityType/ActivityType';
import StartActivity from './pages/StartActivity/StartActivity';
import Login from './pages/Login/Login';
import Otp from './pages/Login/Otp';
import SignUp from './pages/SignUp/SignUp';
import Congrates from './pages/SignUp/Congrates';
import LoggedInHome from './pages/Home/LoggedInHome'
import Profile from './pages/Createprofile/Profile'
import Footer from './pages/Home/Footer';
import Navbar from './pages/Navbar/Navbar';
import { refreshToken } from './services/auth';
import { updateLoggedIn, updateProfileData } from './redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from './services/user';

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
          getUserDetail()
            .then(res => {
              // console.log('profile', res.data.data[0]);
              dispatch(updateProfileData({ profileData: res.data.data[0] }))
              setLoading(false)
            })
            .catch(err => {
              console.log('profile err', err);
              setLoading(false)
            })
          if (res.data.data === null) return
        }).catch(err => {
          setLoading(false)
          console.log('ref err', err.response);
        })
    } else {
      setLoading(false)
    }
  }, [loggedIn])

  if (loading === true) return <></>

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Congrates" element={<Congrates />} />
        <Route path="/home" element={<LoggedInHome />} />
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
          path="/activities/:categoryId"
          element={
            <ActivityType />
          }
        />
        <Route
          path="/activities/:categoryId/:activityId/start"
          element={
            <StartActivity />
          }
        />

      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

function RequireAuth({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" />;
}

export default App;
