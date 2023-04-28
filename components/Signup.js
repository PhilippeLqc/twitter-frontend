import styles from "../styles/Signup.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router"; 

function Signup(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFirstname, setSignUpFirstname] = useState("");

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("user:", data);
          setSignUpUsername("");
          setSignUpPassword("");
          setSignUpFirstname("");
          router.push("/homepage");
        }
      });
  };

  const handleclose = () => {
    props.closeModal();
  };

  return (
    <div className={styles.popup_box}>
      <div className={styles.box}>
        <div className={styles.content_button}>
          <button className={styles.btn_close} onClick={() => handleclose()}>
            x
          </button>
        </div>
        <img className={styles.logo} src="/images/twitter-logo.png"></img>
        <p className={styles.h1}>Create your Hackatweet account</p>
        <div className={styles.btn}>
          <input
            className={styles.inputs}
            type="firstname"
            placeholder="firstname"
            id="firstname"
            onChange={(e) => setSignUpFirstname(e.target.value)}
            value={signUpFirstname}
          />
          <input
            className={styles.inputs}
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <input
            className={styles.inputs}
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
          />
          <button
            className={styles.signup}
            id="signup"
            onClick={() => handleRegister()}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
