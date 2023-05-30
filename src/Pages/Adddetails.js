import React from 'react'
import { auth, db } from '../firebase';
import { updateProfile } from "firebase/auth"
import {  useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import {NotificationManager} from 'react-notifications';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAuths from '../context/AuthContex';

function AddDetails() {
    const { user } = useAuths();
    const [role, setRole] = React.useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };
    const [name, setName] = React.useState("")
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()

        if (user) {
            if (role === "Student") {
                setDoc(doc(db, "users", auth.currentUser.uid), {
                    name: name,
                    attendance: 100,
                    role: role,
                    grades: []
                    });
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(function () {
                    navigate("/profile")
                }, function (error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    NotificationManager.warning(errorCode, errorMessage, 3000);
                });
            } else if(role === "Teacher") {
                setDoc(doc(db, "users", auth.currentUser.uid), {
                    name: name,
                    role: role
                    });
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(function () {
                    navigate("/dashboard")
                }, function (error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    NotificationManager.warning(errorCode, errorMessage, 3000);
                })

            } else {
                setDoc(doc(db, "users", auth.currentUser.uid), {
                    name: name,
                    });
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(function () {
                    navigate("/dashboard")
                }, function (error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    NotificationManager.warning(errorCode, errorMessage, 3000);
                })
            }
        }
            
    }

    React.useEffect(() => {
 
        // if(!user) {
        //     navigate('/login')
        // }
    })
  return (
    <section>
            <div>
                <div class="background">
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div>

                <form className='form'>
                        <h3>Add Details</h3>                                                                                                  
                        <div>
                            <label htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}  
                                required                                    
                                placeholder="Full Name"                                
                            />
                                <div style={{marginTop: '30px'}}>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={role}
                                            label="Role"
                                            onChange={handleChange}
                                            >
                                            <MenuItem value={"Student"}>Student</MenuItem>
                                            <MenuItem value={"Teacher"}>Teacher</MenuItem>
                                            <MenuItem value={"Parent"}>Parent</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                

                        <button
                            type="submit" 
                            onClick={onSubmit}  
                                           
                        >  
                            Finish                              
                        </button>
                        </div>
                </form>
            </div>
    </section>
  )
}

export default AddDetails

