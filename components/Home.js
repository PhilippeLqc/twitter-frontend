import styles from "../styles/Home.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Tweet from "./Tweet";

function Home() {

  const [inputTweet, setInputTweet] = useState("");

  let date = new Date

  console.log("date", date)

  function handleTweet () {

  

    fetch('http://localhost:3000/tweets/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ username: signInUsername, token: data.token }));
					setSignInUsername('');
					setSignInPassword('');
					setIsModalVisible(false)
				}
			});
	};
  
   


  return (
    <main className={styles.main}>
      <div className={styles.content_left}>
        <img className={styles.logo} src="/images/twitter-logo.png" />
        <div>
          <div className={styles.left_bottom}>
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ color: "#47a4cd", width: "20%", height: "auto" }}
            />
            <div className={styles.userinfo_bottom}>
              <p className={styles.firstname}>Paul</p>
              <p className={styles.username}>@username</p>
            </div>
          </div>
          <div className={styles.btn_container}>
            <button id="signup" className={styles.signup}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className={styles.content_middle}>
        <div className={styles.home_container}>
          <div className={styles.title_middle_container}>
            <p className={styles.title_middle}>Home</p>
          </div>
          <div className={styles.input_container}>
            <input
              className={styles.input_tweet}
              type="text"
              placeholder="Whats'up?"
              id="signUpUsername"
              onChange={(e) => setInputTweet(e.target.value)}
              value={inputTweet}
            />
          </div>
          <div className={styles.home_bottom}>
            <p>16/280</p>
            <button 
            onClick={() => handleTweet ()}
            id="tweet">Tweet</button>
          </div>
        </div>
        <div className={styles.tweets_container}>
          {" "}
          <Tweet />
        </div>
      </div>
      <div className={styles.content_right}>
        <p className={styles.trends}>Trends</p>
        <div className={styles.hashtag_container}>
          Je suis un joli petit test
        </div>
      </div>
    </main>
  );
}

export default Home;
