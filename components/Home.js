import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Tweet from "./Tweet";
import Trends from "./Trends";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const [inputTweet, setInputTweet] = useState("");
  const [likedTweet, setLikedTweet] = useState([]);
  const [tweetData, setTweetData] = useState([]);

  let date = new Date();

  function handleTweet() {
    fetch("http://localhost:3000/tweets/add", {
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
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername("");
          setSignInPassword("");
          setIsModalVisible(false);
        }
      });
  }

    // Liked tweet (inverse data flow)
    // const updateLikedTweet = (messageTweet) => {
    //   if (likedTweet.find((message) => message === messageTweet)) {
    //     setLikedTweet(likedTweet.filter((message) => message !== messageTweet));
    //   } else {
    //     setLikedTweet([...likedTweet, messageTweet]);
    //   }
    // };

    //A revoir, pas sur de l'écriture
    // useEffect(() => {
    //   fetch("http://localhost:3000/tweets/getTweets")
    //     .then((res) => res.json())
    //     .then((messageTweet) => setTweetData(messageTweet));
    // }, []);
    // console.log('tweetData:', tweetData);
  
    // const tweet = tweetData.map((data, i) => {
    //   const isLiked = likedTweet.some((message) => message === data.message);
    //   return (
    //     <Tweet
    //       key={i}
    //       {...data}
    //       updateLikedTweet={updateLikedTweet}
    //       isLiked={isLiked}
    //     />
    //   );
    // });


  const handleHome = () => {
    router.push("/homepage");
  };

  const handleLogout = () => {
    // dispatch(logout());
    router.push("/login");
  };

  return (
    <main className={styles.main}>
      <div className={styles.content_left}>
        <img
          className={styles.logo}
          src="/images/twitter-logo.png"
          onClick={() => handleHome()}
        />
        <div>
          <div className={styles.left_bottom}>
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ color: "#47a4cd", width: "50px", height: "auto" }}
            />
            <div className={styles.userinfo_bottom}>
              <p className={styles.firstname}>John</p>
              <p className={styles.username}>@JohnDoe</p>
            </div>
          </div>
          <div className={styles.btn_container}>
            <button
              id="signup"
              className={styles.logout}
              onClick={() => handleLogout()}
            >
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
            <p>{inputTweet.length}/280</p>
            <button
              className={styles.btn_tweet}
              onClick={() => handleTweet()}
              id="tweet"
            >
              Tweet
            </button>
          </div>
        </div>
        <div className={styles.tweets_container}>
          {/* {tweet} */}
          <Tweet/>
        </div>
      </div>
      <div className={styles.content_right}>
        <p className={styles.trends}>Trends</p>
        <div className={styles.hashtag_container}>
          <Trends/>
        </div>
      </div>
    </main>
  );
}

export default Home;
