import styles from "../styles/Signup.module.css";

function Signup() {
  return (
    <div className={styles.popup_box}>
      <div className={styles.box}>
        <div className={styles.content_button}>
        <button className={styles.btn_close}>x</button>
        </div>
        <img className={styles.logo} src='/images/twitter-logo.png'></img>
        <p className={styles.h1}>Connect to Hackatweet</p>
        <div className={styles.inputs}>
            <input type="text" placeholder="Username" id="signUpUsername"/>
            <input type="password" placeholder="Password" id="signInPassword"/>
        </div>
        <button id="signup">Signup</button>

      </div>
    </div>
  );
}
export default Signup;
