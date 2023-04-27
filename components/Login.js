import styles from "../styles/Login.module.css";
import Signup from "../components/Signup";
import { useState } from "react";

function Login() {

  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);


  return (
    <div>
      {!isSignupModalVisible && <Signup />}

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
          <p className={styles.text}>Join Hackatweet today</p>
          <button id="signup" className={styles.signup}>
            Sign up
          </button>
          <p className={styles.text}>Already have an account ?</p>
          <button id="signin" className={styles.signin}>
            Sign in
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
