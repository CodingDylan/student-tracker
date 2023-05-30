import React from 'react'
import Header from '../components/Header'
import AnnouncementCard from '../components/AnnouncementCard'
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import useAuths from '../context/AuthContex';

function Announcements() {
  const [announcements, setAnnouncements] = React.useState([])
  const navigate = useNavigate()
  const { user } = useAuths()
  const joins = (objectd) => {
   const table = {}
   table.id = objectd.id
   table.data = objectd.data()
   return table
  }

  const getAnnouncements = async() => {
    const data = await getDocs(collection(db, "annnouncementsT"))
    const datas = data.docs.map(doc => joins(doc))
    setAnnouncements(datas)
  }

  React.useEffect(() => {
 
      if(!user) {
      navigate('/')
      } else {
        getAnnouncements()
      }
  }, [])
  
  return (
    <div>
      <Header />
      <div style={{padding: '100px'}}>
      <h1 style={{textAlign: 'center', marginBottom: "30px"}}>Announcements</h1>
      <div style={{display: 'flex'}}>
      {announcements.map((x, index) => <AnnouncementCard Title={x.data.Title} Description={x.data.Description} date={x.data.datePublished} img={x.data.imgLink} publisher={x.data.publisher} key={index} id={x.id}/>)}
      </div>
      </div>  
    </div>
  )
}

export default Announcements