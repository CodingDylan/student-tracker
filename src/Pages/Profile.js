import React from 'react';

import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import useAuths from '../context/AuthContex';
import useAuth from '../context/useAuth';

const Profile = () => {
    const { user } = useAuths();
    const { logout } = useAuth()
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        const result = logout()
        if (!result) {
            navigate('/login')
        }
    }

    React.useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   
    return(
        <div>
            
             <Header />
                <div class="background">
                    {auth.currentUser && <h1 style={{textAlign: 'center'}}>Hello, {auth.currentUser.displayName }</h1>}
                    {auth.currentUser && <h1 style={{textAlign: 'center'}}>User ID: {auth.currentUser.uid}</h1>}
                    <button onClick={() => navigate('/grades')}>Grades</button>
                    <button onClick={() => navigate('/attendance')}>Attendance</button>
                    <button onClick={() => navigate('/announcements')}>Announcements</button>
    
                    <button onClick={handleLogout}>Sign Out</button>

                </div>
        </div>
    )
}
 
export default Profile;