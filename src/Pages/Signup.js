import React, {useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import Header from '../components/Header';
import { NotificationManager } from 'react-notifications';
import { onAuthStateChanged } from 'firebase/auth';
import useAuths from '../context/AuthContex';

const Signup = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const { user } = useAuths();
    const onSubmit = async (e) => {
      e.preventDefault()
     
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
           

            // Add a new document in collection "cities"
            setDoc(doc(db, "users", user.uid), {
            name: "",
            attendance: 100
            });
            navigate("/almostdone")

            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            NotificationManager.warning(errorCode, errorMessage, 3000);
            // ..
        });
 
   
    }

    const googleSignUp = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // For later use
    // The signed-in user info.
    const user = result.user;

    setDoc(doc(db, "students", user.uid), {
        name: "",
        attendance: 100
        });
        navigate("/almostdone")
                
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    NotificationManager.warning(errorCode, errorMessage, 3000);
    //const email = error.customData.email;
    // The AuthCredential type that was used.
    //const credential = GoogleAuthProvider.credentialFromError(error);
    if (errorCode === 'auth/account-exists-with-different-credential') {
        NotificationManager.warning(errorCode, errorMessage, 3000);
    }
    // ...
  });
    }
    
 
 
  return (
    <main>
        <Header />        
        <section>
            <div>
                <div class="background">
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div>
                <div>                  
                                                                          
                    <form className='form'>
                        <h3>Sign Up</h3>                                                                                                  
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                        <div class="social">
                           <div class="go" onClick={() => googleSignUp()  }><i class="fab fa-google"></i>  Google</div>
                            <div class="fb" onClick={() => navigate('/login')}><i class="fab fa-facebook"></i>Have an account?</div>
                        </div>                                                
                    </form>
                                      
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup