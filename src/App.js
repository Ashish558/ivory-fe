import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Navigate, Route  } from "react-router-dom";

import Home from './pages/Home/home';
import Activities from './pages/Activities/Activities';
import ActivityType from './pages/ActivityType/ActivityType';
import StartActivity from './pages/StartActivity/StartActivity';

function App() {
  //true for now will change later
  const loggedIn = true

  return (
    <BrowserRouter>
      <Routes>

       <Route
            path="/"
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
