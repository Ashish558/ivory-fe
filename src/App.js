import React from 'react'
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
function App() {
  //true for now will change later
  const loggedIn = true

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Congrates" element={<Congrates />} />
        <Route path="/home" element={<LoggedInHome />} />
        <Route exact path='/CreateProfile' element={<Profile/>}/>
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
          path="/activities/:activityId/:typeId"
          element={
            <RequireAuth loggedIn={loggedIn ? true : false}>
              <ActivityType />
            </RequireAuth>
          }
        />
        <Route
          path="/activities/:activityId/:typeId/start"
          element={
            <RequireAuth loggedIn={loggedIn ? true : false}>
              <StartActivity />
            </RequireAuth>
          }
        />

      </Routes>
    </BrowserRouter>

  );
}

function RequireAuth({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" />;
}

export default App;
