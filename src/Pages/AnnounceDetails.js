import React from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useAuths from '../context/AuthContex';


function AnnounceDetails() {
    const id = useParams()
    const navigate = useNavigate();
    const { user } = useAuths()
    const [data, setData] = React.useState({}) 
    const getData = async() => {

        const docRef = doc(db, "annnouncementsT", id.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data())
            console.log(data)
          } else {
            console.log("No such document!");
        }
    }

    React.useEffect(() => {
        
            if(user) {
                getData() 
            } else {
                navigate('/profile')
            }
        
    }, [])
      
  return (
    <>
     { data &&
        <div>
            <Header />
            <div>
                <h1>{data.Title}</h1>
                {/* <h2>{new Date(data.datePublished.seconds * 1000).toDateString()}</h2> */}
                <p>{data.Description}</p>
                <h3>{data.publisher}</h3>
                <img src={data.imglink} alt='sad' />
            </div>
        </div>
        

        
        }
    </>
   
  )
}

export default AnnounceDetails