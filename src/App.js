import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import ReactGA from 'react-ga4'

//splash screens
import Four from './pages/splash/Four';
import Landing from './pages/splash/Landing';
import LogoLanding from './pages/splash/LogoLanding';
import Second from './pages/splash/Second';
import Third from './pages/splash/Third';

//auth screens
import Login from './pages/Login/Login';
import Otp from './pages/Login/Otp';
import SignUp from './pages/SignUp/SignUp';
import Congrates from './pages/SignUp/Congrates';
import Dob from './pages/SignUp/Dob';

//home
// import Profile from './pages/Createprofile/Profile';
// import LoggedInHome from './pages/Home/LoggedInHome';
// import Home from './pages/Home/Home.jsx';
// const LoggedInHome = React.lazy(() => import('./pages/Home/LoggedInHome'))


//comps
import Navbar from './pages/Navbar/Navbar';
import NavbarDesktop from './pages/Desktop/NavbarDesktop/NavbarDesktop';
import Footer from './pages/Home/Footer';

import { updateLoggedIn, updateProfileData } from './redux/slices/user';
import { refreshToken } from './services/auth';
import { getUserDetail } from './services/user';

const Home = React.lazy(() => import('./pages/Home/Home.jsx'))
const LoggedInHome = React.lazy(() => import('./pages/Home/LoggedInHome'))
const Profile = React.lazy(() => import('./pages/Createprofile/Profile'))

const Activities = React.lazy(() => import('./pages/Activities/Activities'))
const ActivityType = React.lazy(() => import('./pages/ActivityType/ActivityType'))
const StartActivity = React.lazy(() => import('./pages/StartActivity/StartActivity'))
const Assignment = React.lazy(() => import('./pages/Home/Assignment'))
const Assignment1 = React.lazy(() => import('./pages/Home/Assignment1'))

const Learn = React.lazy(() => import('./pages/Home/Learn'))
const LiveEvents = React.lazy(() => import('./pages/LiveEvents/LiveEvents'))
const SingleSession = React.lazy(() => import('./pages/SingleSession/SingleSession'))
const Enroll = React.lazy(() => import('./pages/Learn/Enroll/Enroll'))
const Program = React.lazy(() => import('./pages/Learn/Program/Program'))
const Community = React.lazy(() => import('./pages/Learn/Community/Community'))
const Confirmation = React.lazy(() => import('./pages/Learn/Confirmation/Confirmation'))

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
    //my acc
    // ReactGA.initialize('GTM-PQWLJCR')

    //client acc
    ReactGA.initialize('GTM-PKH9VTQ')
  }, [])
  // console.log(gapi);
  // console.log(profileData);

  // useEffect(() => {
  //   if(profileData.id === undefined) return
  //   window.dataLayer.push({
  //     'user_id': profileData.id
  //   });  
  // }, [profileData.id])

  useEffect(() => {
    fetchUserDetails()
  }, [loggedIn])

  if (loading === true) return <></>

  return (
    <BrowserRouter>
      <Navbar />
      <NavbarDesktop />
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense>
        } />
        <Route path="/login" element={<Login />} />
        <Route exact path='/logolanding' element={<LogoLanding />}></Route>
        <Route exact path='/landing' element={<Landing />}></Route>
        <Route exact path='/second' element={<Second />}></Route>
        <Route exact path='/third' element={<Third />}></Route>
        <Route exact path='/four' element={<Four />}></Route>
        <Route exact path="/learn" element={<Learn />}></Route>
        <Route path="/otp" element={<Otp />} />
        <Route path="/dob" element={<Dob />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Congrates" element={<Congrates />} />

        <Route path="/home" element={
          <React.Suspense fallback={<>...</>}>
            <LoggedInHome />
          </React.Suspense>
        } />

        <Route path="/activities" element={
          <React.Suspense fallback={<>...</>}>
            <Activities />
          </React.Suspense>
        } />
        <Route path="/activities/:categoryId" element={
          <React.Suspense fallback={<>...</>}>
            <ActivityType />
          </React.Suspense>
        } />
        <Route path="/activities/:categoryId/:activityId/start"
          element={
            <React.Suspense fallback={<>...</>}>
              <StartActivity fetchUserDetails={fetchUserDetails} />
            </React.Suspense>
          } />
        <Route path="/live-events" element={
          <React.Suspense fallback={<>...</>}>
            <LiveEvents />
          </React.Suspense>
        } />
        <Route path="/live-events/:id" element={
          <React.Suspense fallback={<>...</>}>
            <SingleSession />
          </React.Suspense>
        } />
        <Route path="/program/:id" element={
          <React.Suspense fallback={<>...</>}>
            <Program />
          </React.Suspense>
        } />
        <Route path="/community" element={
          <React.Suspense fallback={<>...</>}>
            <Community />
          </React.Suspense>
        } />
        <Route path="/learn" element={
          <React.Suspense fallback={<>...</>}>
            <Learn />
          </React.Suspense>
        } />
        <Route path="/learn/:id" element={
          <React.Suspense fallback={<>...</>}>
            <Enroll />
          </React.Suspense>
        } />

        <Route
          path="/CreateProfile"
          element={
            <RequireAuth loggedIn={loggedIn ? true : false}>
              <Profile />
            </RequireAuth>
          }
        />

        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/Assignment" element={<Assignment />} />
        <Route path="/Assignment1" element={<Assignment1 />} />

      </Routes >
      <Footer />
    </BrowserRouter >

  );
}

const LazyLoad = ({ Component }) => {
  return <React.Suspense fallback={<>...</>}>
    <Component />
  </React.Suspense>
}

function RequireAuth({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" />;
}

export default App;
