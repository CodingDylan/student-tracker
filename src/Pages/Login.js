import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import useAuth from '../context/useAuth';
import { db, auth } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import useAuths from '../context/AuthContex';

const Login = () => {
    // const [role, setRole] = React.useState("")
    const { login } = useAuth();
    const { user } = useAuths()
    
    const getrole = async (uid) => {
        if (uid) {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                //setRole(docSnap.data().role)
                return await docSnap.data().role
            } else {
                return null
                // setRole(null)
            }
        }
        
    }
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onLogin = async (e) => {
        const result = await login({email: email, password: password}, e, 1)
        console.log(result)
        if (result) {
            let role = await getrole(result.uid)


                if (role === "Teacher" || role === "Parent") {
                    navigate('/dashboard')
                } else if(role === "Student") {
                    navigate('/profile')
                } 


        }
        
    }
    
    const googleLogin = () => {
        if (user) {
            (async () => {
            
            const role = await getrole(user.uid)
            if (role === 'Teacher' || role === "Parent") {
                navigate('/dashboard')
                
            } else if(role === 'Student') {
                navigate('/profile')
            }
        })()
        
    }

        
    }
    
    React.useEffect(() => {
        if (user) {
                (async () => {
                
                const role = await getrole(user.uid)
                if (role === 'Teacher' || role === "Parent") {
                    navigate('/dashboard')
                    
                } else if(role === 'Student') {
                    navigate('/profile')
                }
            })()
            
        }

    }, [])
 
    return(
        <>
            <main>
                <Header />        
                <section>
                <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                 </div>
                    <div>                                                                                           
                        <form className='form'>
                            <h3>Login</h3>                                              
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onLogin}  
                                    disabled={email.length > 0 && password.length > 0 ? false : true}                                      
                                >      
                                    Login                                                                  
                                </button>
                            </div>

                            <div class="social">
                                <div className="go" onClick={() => googleLogin()}><i className="fab fa-google"></i>Google</div>
                                <div className="fb" onClick={() => navigate('/signup')}><i className="fab fa-facebook"></i>Don't have an account?</div>
                            </div>                     
                        </form>
                       

                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default Login