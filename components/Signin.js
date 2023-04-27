// import styles from "../styles/Signin.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Signin() {
  const dispatch = useDispatch();
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
          console.log("username:", data);
          setSignInUsername("");
          setSignInPassword("");
          //   setIsModalVisible(false);
        }
      });
  };

  return (
    <div>
      <img src="/images/twitter-logo.png" alt="logo" />
      <p>Connect to Hackatweet</p>
      <input
        type="text"
        placeholder="Username"
        id="signInUsername"
        onChange={(e) => setSignInUsername(e.target.value)}
        value={signInUsername}
      />
      <input
        type="password"
        placeholder="Password"
        id="signInPassword"
        onChange={(e) => setSignInPassword(e.target.value)}
        value={signInPassword}
      />
      <button id="connection" onClick={() => handleConnection()}>
        Sign in
      </button>
    </div>
  );
}

export default Signin;
