import {  useEffect } from "react";
import useAuths from "./AuthContex";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {NotificationManager} from 'react-notifications';
import {  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,   } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
function useAuth() {
  

  const {user, setUser} = useAuths()

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      setUser(user)
  })
  }, []);

  const login = (user, e, method) => {
    if (method === 1) {
        e.preventDefault();
        return signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            // Signed in
            console.log(userCredential)
            setUser(userCredential.user)
            return userCredential.user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            NotificationManager.warning(errorCode, errorMessage, 3000);
        });
    } else {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
                 .then((result) => {
        setUser(result.user);
        return result.user

                     
       }).catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
            alert("email already being used with a different account " + error.customData.email)
        }
         // Handle Errors here.
         const errorCode = error.code;
         const errorMessage = error.message;
        NotificationManager.warning(errorCode, errorMessage, 3000);
         
       });
        
    
    }
    
    
  };

  const logout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
            setUser(null);
            return null
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            NotificationManager.warning(errorCode, errorMessage, 3000);
        });
    
  };
  return { user, login, logout };
};
export default useAuth;