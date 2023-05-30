import React from 'react'
import { auth } from '../firebase'
import Header from '../components/Header';
import { doc, updateDoc, arrayUnion, setDoc, Timestamp} from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Dashboard() {
    const [UID, setUID] = React.useState('');
    const [percentage, setPercentage] = React.useState('20');

    const [assignment, setAssignment] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [grade, setGrade] = React.useState('');

    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')

    const navigate = useNavigate()
    const { logout } = useAuth()
    function Generator() {
        const S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    async function addGrade(e) {
        e.preventDefault();
       
        if(assignment && UID && subject && grade) {
            const Ref = doc(db, "users", UID);

        await updateDoc(Ref, {
            grades: arrayUnion({Assignment: assignment, Subject: subject, Grades: grade})
            })
        }
    }

    async function updateAttendance(e) {
        e.preventDefault();
       
        if(percentage && UID) {
            const Ref = doc(db, "users", UID);

        await updateDoc(Ref, {
            attendance: parseInt(percentage)
            })
        }
    }

    async function createAnnouncemnet(e) {
        e.preventDefault();

        if (description && title) {
            await setDoc(doc(db, "annnouncementsT", String(Generator())), {
                Title: title,
                Description: description,
                datePublished: Timestamp.fromDate(new Date()),
                publisher: auth.currentUser.uid,
                imgLink: "https://firebasestorage.googleapis.com/v0/b/student-tracker-e881c.appspot.com/o/Backyardpool.jpg?alt=media&token=7e4b8e09-10ce-4544-8086-c68aa1fe5d09"
              });
              
        }
    }
    
    
    const handleLogout = () => {               
        const result = logout()
        if (!result) {
            navigate('/login')
        }
    }

        
    return (
        <div>
            <Header />
            {auth.currentUser && <h1 style={{textAlign: 'center', padding: '10px'}}>Hello, {auth.currentUser.displayName }</h1>}
            <h1 style={{padding: "20px", textAlign: 'center'}}>Update Attendance for Student</h1>
            <form className='form--dash' style={{display: 'block'}}>                                          
                                <div>
                                    <label htmlFor="User-ID">
                                        User ID 
                                    </label>
                                    <input
                                        id="User-ID"
                                        name="User-ID"
                                        type='text'                                                                                                       
                                        placeholder="User ID"
                                        value={UID}
                                        onChange={(e)=>setUID(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Percentage">
                                        Attendance
                                    </label>
                                    <input
                                        id="Percentage"
                                        name="Percentage"
                                        type='text'                                                                                                       
                                        placeholder="Percentage"
                                        value={percentage}
                                        onChange={(e)=>setPercentage(e.target.value)}
                                    />
                                </div>
                                                    
                                <div>
                                    <button
                                        onClick={updateAttendance}
                                    >      
                                        Update Attendance                                                               
                                    </button>
                                </div>
                    
                
            </form>

            <h1 style={{padding: "20px", textAlign: 'center'}}>Add Grade</h1>
            <form className='form--dash'>
                                <div>
                                    <label htmlFor="User-ID">
                                        User ID
                                    </label>
                                    <input
                                        id="User-ID"
                                        name="User-ID"
                                        type='text'                                                                                                       
                                        placeholder="User ID"
                                        value={UID}
                                        onChange={(e)=>setUID(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Assignment">
                                        Assignment
                                    </label>
                                    <input
                                        id="Assingment"
                                        name="Assignment"
                                        type='text'                                                                                                       
                                        placeholder="Assignment"
                                        value={assignment}
                                        onChange={(e)=>setAssignment(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Subject">
                                        Subject
                                    </label>
                                    <input
                                        id="Subject"
                                        name="Subject"
                                        type='text'                                                                                                       
                                        placeholder="Subject"
                                        value={subject}
                                        onChange={(e)=>setSubject(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={grade}
                                            label="Grade"
                                            onChange={(e) => setGrade(e.target.value)}
                                            >
                                            <MenuItem value={"A"}>A</MenuItem>
                                            <MenuItem value={"B"}>B</MenuItem>
                                            <MenuItem value={"C"}>C</MenuItem>
                                            <MenuItem value={"D"}>D</MenuItem>
                                            <MenuItem value={"E"}>E</MenuItem>
                                            <MenuItem value={"F"}>F</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>

                                <button onClick={addGrade}> Add Grade</button>
            </form>

            <h1 style={{padding: "20px", textAlign: 'center'}}>Create Announcement</h1>

            <form className='form--dash'>

            <div>
                <label htmlFor="Title">
                    Title
                </label>
                                    <input
                                        id="Title"
                                        name="Title"
                                        type='text'                                                                                                       
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e)=>setTitle(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Description">
                                        Description
                                    </label>
                                    <input
                                        id="Description"
                                        name="Description"
                                        type='text'                                                                                                       
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                </div>
                                                    
                                <div>
                                    <button
                                        onClick={createAnnouncemnet}
                                    >      
                                        Create Announcement                                                             
                                    </button>
                                </div>            
            </form>

            <button onClick={handleLogout}>Sign Out</button>
            
        </div>
    ) 
}

export default Dashboard