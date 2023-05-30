import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

function Attendance() {
    const [percentage, setPercentage] = React.useState(100)
    const navigate = useNavigate()
    const getAttendance = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setPercentage(docSnap.data().attendance)
          } else {
            console.log("No such document!");
          }
    }
    React.useEffect(() => {
      onAuthStateChanged(auth, async user => {
        if(user) {
          getAttendance()
        } else {
            navigate('/login')
    }})
        
    }, [])
  return (
    <div>
        <Header />
        <h1 style={{fontSize: "50px", marginLeft: "10%"}}>Attendance</h1>
        <div style={{marginLeft: "20%", marginTop: "5%", display: "flex"}}>
          <div style={{width: 200, height: 200}} >
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
            <h1 style={{fontSize: "70px", marginLeft: 100, marginTop: "20px"}}>{auth.currentUser.displayName}</h1>
        </div>
        <button onClick={() => navigate('/profile')}>Go Back</button>
        
    </div>
    
    
  )
}

export default Attendance