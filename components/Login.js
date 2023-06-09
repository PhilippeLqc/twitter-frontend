import styles from "../styles/Login.module.css";
import Signup from "./Signup";
import Signin from "./Signin";
import { useState } from "react";

function Login() {
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isSigninModalVisible, setIsSigninModalVisible] = useState(false);

  const handleSignupModal = () => {
    setIsSignupModalVisible(!isSignupModalVisible);
  };

  const handleSigninModal = () => {
    setIsSigninModalVisible(!isSigninModalVisible);
  };

  const closeModal = () => {
    setIsSignupModalVisible(false);
    setIsSigninModalVisible(false);
  };

  return (
    <div>
      {isSignupModalVisible && <Signup closeModal={closeModal}/>}
      {isSigninModalVisible && <Signin closeModal={closeModal}/>}

      <main className={styles.main}>
        <div className={styles.title}>
          <img
            src="/images/twitter-logo.png"
            alt="logo"
            className={styles.logoleft}
          />
        </div>

        <div className={styles.right}>
          <img
            src="/images/twitter-logo.png"
            alt="logo"
            className={styles.logo}
          />
          <p className={styles.text + " " + styles.toptext}>
            See what's happening
          </p>
          <p className={styles.textmiddle}>Join Hackatweet today.</p>
          <button id="signup" className={styles.signup} onClick={() => handleSignupModal()}>
            Sign up
          </button>
          <p className={styles.text}>Already have an account ?</p>
          <button id="signin" className={styles.signin} onClick={() => handleSigninModal()}>
            Sign in
          </button>
        </div>
      </main>
    </div>
  );
  }

export default Login;
