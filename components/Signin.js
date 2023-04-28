import styles from "../styles/Signin.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router"; 

function Signin(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
        // console.log('data:', data)
          dispatch(login(data.token));
          setSignInUsername("");
          setSignInPassword("");
          router.push("/homepage");
        }
      });
  };
// console.log('user:', user)
  const handleclose = () => {
    props.closeModal();
  };

  console.log('user:', user)


  return (
    <div className={styles.popup_box}>
      <div className={styles.box}>
        <div className={styles.content_button}>
          <button className={styles.btn_close} onClick={() => handleclose()}>
            x
          </button>
        </div>
        <img className={styles.logo} src="/images/twitter-logo.png"></img>
        <p className={styles.h1}>Connect to Hackatweet</p>
        <div className={styles.btn}>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <input
            className={styles.inputs}
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
          <button
            className={styles.signin}
            id="signin"
            onClick={() => handleConnection()}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
