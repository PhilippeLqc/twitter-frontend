import styles from "../styles/Hometrends.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Tweet from "./Tweet";
import TweetTrends from "./TweetTrends";
import Trends from "./Trends";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";


function Hometrends() {
  const [username, setusername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [inputTweet, setInputTweet] = useState("");
  const [hashtags, sethashtags] = useState([]);
  const [id, setId] = useState("");
  const [filteredTweets, setFilteredTweets] = useState([]);

  const user = useSelector((state) => state.user.value);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleHome = () => {
    router.push("/homepage");
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

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
        setId(data.data._id);
      });
  }, []);


  useEffect(() => {
    fetch("http://localhost:3000/hashtags/getHashtags")
      .then((response) => response.json())
      .then((data) => {
        // console.log('data', data);
        sethashtags(data);
      });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filtered = hashtags.filter(hashtag => hashtag.hashtag === searchTerm);
    console.log("hashtag tweets", filtered)
  
    setFilteredTweets(filtered);

  };



  const finalTweets = filteredTweets.map((data, i) => (
  (data)))

  const tweetsArray = finalTweets.map(obj => obj.tweets);

  
    const tweetsTrends = tweetsArray.map((data, i) => {
     return <TweetTrends key={i} {...data}  />})

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
              <p className={styles.firstname}>{firstname}</p>
              <p className={styles.username}>@{username}</p>
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
            <p className={styles.title_middle}></p>
          </div>
          <input
              className={styles.input_tweet}
              type="text"
              placeholder="research"
              id="signUpUsername"
              onChange={(e) => handleSearch(e)}
              value={inputTweet}
            />
          </div>
        </div>
        <div className={styles.tweets_container}>{tweetsTrends}</div>
      </div>
      <div className={styles.content_right}>
        <p className={styles.trends}>Trends</p>
        <div className={styles.hashtag_container}>
          <Trends />
        </div>
      </div>
    </main>);
  }

export default Hometrends;
