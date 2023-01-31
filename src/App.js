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
import { updateLoggedIn } from './redux/slices/user';
import { useDispatch } from 'react-redux';

function App() {
  //true for now will change later
  const loggedIn = true
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('refresh')) {
      let body = {
        refresh:
          localStorage.getItem('refresh')
      }
      refreshToken(body)
      .then(res => {
          setLoading(false)
          // console.log('ref res', res.data.data.access);
          localStorage.setItem('access', res.data.data.access)
          dispatch(updateLoggedIn({ loggedIn: true }))
          if (res.data.data === null) return
        }).catch(err => {
          console.log('ref err', err.response);
        })
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Congrates" element={<Congrates />} />
        <Route path="/home" element={<LoggedInHome />} />
        <Route exact path='/CreateProfile' element={<Profile />} />
        <Route path="/"
          element={
            <RequireAuth loggedIn={loggedIn ? true : false}>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/activities"
          element={
            <RequireAuth loggedIn={loggedIn ? true : false}>
              <Activities />
            </RequireAuth>
          }
        />
        <Route
          path="/activities/:categoryId"
          element={
            <RequireAuth loggedIn={loggedIn ? true : false}>
              <ActivityType />
            </RequireAuth>
          }
        />
        <Route
          path="/activities/:categoryId/:activityId/start"
          element={
            <RequireAuth loggedIn={loggedIn ? true : false}>
              <StartActivity />
            </RequireAuth>
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
