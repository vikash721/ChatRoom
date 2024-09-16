import React from 'react';
import styles from './Login.module.css';
import { FaGoogle } from 'react-icons/fa'; // Importing Google icon
import { auth, provider} from "../../../firebase-config"
import { signInWithPopup } from 'firebase/auth';


import Cookies from 'universal-cookie';
const  cookiesInstance = new Cookies(); 


const Login = (props) => {
  const { setIsAuth } = props;

    const signInWithGoogle = async () =>{
      
     
      try{
        const result =  await signInWithPopup(auth, provider);
      cookiesInstance.set("auth-token", result.user.refreshToken)
      setIsAuth(true)
      } catch(err){

        console.error(err);

      }



    }


  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>Login</h1>
      </div>
      <form className={styles.loginForm}>
        <input type="text" placeholder="Username" className={styles.inputField} />
        <input type="password" placeholder="Password" className={styles.inputField} />
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
      <div className={styles.separator}>or</div>
      <button onClick={signInWithGoogle} className={styles.googleButton}>
        <FaGoogle className={styles.googleIcon} />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
