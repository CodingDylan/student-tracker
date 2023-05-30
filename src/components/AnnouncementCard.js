import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';


export default function AnnouncementCard(props) {
    const navigate = useNavigate();
    const [user, setUser] = React.useState({})
    const date = new Date(props.date.seconds * 1000)  
    
    const getUsers = async() => {
        const docRef = doc(db, "users", props.publisher);
        const users = await getDoc(docRef);
        setUser(users.data())
    }

    React.useEffect(() => {
        getUsers()
    }, [])
    
  return (
    <>
        { user &&
    <div style={{padding: "20px",}} onClick={() => navigate('/announcements/'+ props.id)}>
      
        <Card sx={{ maxWidth: 345}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name && user.name.charAt(0)}
          </Avatar>
        }
        title={user.name}
        subheader={date.toDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.img}
        alt="image"
      />
      <CardContent>
        <h1>{props.Title}</h1>
        <Typography variant="body2" color="text.secondary">
          {props.Description.slice(0, 100)}...
        </Typography>
      </CardContent>
      
    </Card>
    </div>
    }
    </>
    
  );
}