import React from 'react'
import { Link } from 'react-router-dom'


import useAuths from '../context/AuthContex';
function Header() {
    const { user} = useAuths();
    
  return (
    <>
        { user ? 

        <header class="site-header">
            <div class="site-identity">
                <Link to='/'><img src="http://via.placeholder.com/400" alt="Site Name"/></Link>
                <h1> <Link to='/login'>Student Trax</Link></h1>
            </div>  
            <nav class="site-navigation">
                <ul class="nav">
                <li> <Link to='/grades'>Grades</Link></li> 
                <li><Link to='/attendance'>Attendance</Link></li> 
                <li><Link to='/announcements'>Announcements</Link></li> 
                </ul>
            </nav>
        </header>
        :
        <header class="site-header">
        <div class="site-identity">
            <Link to='/'><img src="http://via.placeholder.com/400" alt="Site Name"/></Link>
            <h1> <Link to='/'>Student Trax </Link></h1>
        </div>  
        <nav class="site-navigation">
            <ul class="nav">
            <li> <Link to='/login'>Login</Link></li> 
            <li><Link to='/signup'>Sign up</Link></li> 
            </ul>
        </nav>
    </header>
    }
    </>
  )
}

export default Header