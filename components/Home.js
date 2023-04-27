import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Tweet from "./Tweet";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";

function Home() {
  const [inputTweet, setInputTweet] = useState("");
  const [username, setusername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [id, setId] = useState("");
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState(false);
	const dispatch = useDispatch();


  const Isdeleted = useSelector((state) => state.deleted.value);
  const user = useSelector((state) => state.user.value);

// récupère les infos du user et les stocks dans des variables (username, firstname, id)

  useEffect(() => {
    
    fetch("http://localhost:3000/users/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setusername(data.data.username);
        setFirstname(data.data.firstname);
        setId(data.data._id)
      });
  }, []);

  // récupère les tweets et les stocks dans la const tweets


  useEffect(() => {
    fetch("http://localhost:3000/tweets/getTweets")
      .then((response) => response.json())
      .then((data) => {
        setTweets(data)
      })
  }, [newTweet, Isdeleted]);




    // Au clic, ajoute un tweet en bdd

  function handleTweet() {
    const date = new Date();


    fetch("http://localhost:3000/tweets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: date,
        message: inputTweet,
        user: id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInputTweet("")
        setNewTweet(!newTweet)
  
      });
  }

  


  // Map sur les tweets et les ajoutes dans la constante tweet

  const tweet = tweets.map((data, i) => {
    return <Tweet key={i} {...data} />;
  });



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
            <button onClick={() => handleTweet()} id="tweet">
              Tweet
            </button>
          </div>
        </div>
        <div className={styles.tweets_container}>
          {" "}
          {tweet}
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
