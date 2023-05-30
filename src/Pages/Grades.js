import React from 'react'
import Header from '../components/Header'
import BasicTable from '../components/BasicTable'
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

function Grades() {

  const [rows, setRows] = React.useState([])

  const getData = async() => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let grades = docSnap.data().grades
        if (grades) {
          setRows(grades)
        } else {
          setRows(null)
        }
        
        
      } else {
        console.log("No such document!");
    }
  }
  
  
  
  

  React.useEffect(() => {
    getData()
    
  }, [])
  return (
    <div>
        <Header />
        <h1 style={{textAlign: "center", padding: "10px", marginTop: "10px"}}> Grades</h1>
        <BasicTable rows={rows}/>
    </div>
  )
}

export default Grades