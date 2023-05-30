import React from 'react'
import './App.css';
import 'react-notifications/lib/notifications.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Profile from './Pages/Profile';
import AddDetails from './Pages/Adddetails';
import PageNotFound from './Pages/PageNotFound';
import Attendance from './Pages/attendance';
import Grades from './Pages/Grades';
import Announcements from './Pages/Announcements';
import AnnounceDetails from './Pages/AnnounceDetails';
import { Navigate, Outlet } from 'react-router-dom';
import useAuths from './context/AuthContex';
import Dashboard from './Pages/Dashboard';


function RoutesComp() {
  
  const { user } = useAuths();
const ProtectedRoute = ({
  redirectPath = '/',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

  return (
    <Router>
      <div>
        <section>                            
            <Routes>

              <Route path="/" element={<Home/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signup" element={<Signup />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/almostdone" element={<AddDetails/>} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={ <Dashboard />}/>
                <Route path="/grades" element={ <Grades/> }/>
                <Route path="/attendance" element={ <Attendance/>} />
                <Route path="/announcements" element={< Announcements/>} />
                <Route path="/announcements/:id" element={<AnnounceDetails />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />      
            </Routes>                    
        </section>
      </div>
    </Router>
  )
}

export default RoutesComp