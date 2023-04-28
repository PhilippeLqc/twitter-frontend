import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Tweet from "./Tweet";
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
        console.log('data', data);
        sethashtags(data);
      });
  }, []);

  console.log('hashtags', hashtags);


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
            <p className={styles.title_middle}>Trends</p>
          </div>
          <div className={styles.input_container}>
            <input
              className={styles.input_tweet}
              type="text"
              placeholder="research"
              id="signUpUsername"
              onChange={(e) => setInputTweet(e.target.value)}
              value={inputTweet}
            />
          </div>
        </div>
        <div className={styles.tweets_container}> AFFICHER TWEETTRENDS</div>
      </div>
      <div className={styles.content_right}>
        <p className={styles.trends}>Trends</p>
        <div className={styles.hashtag_container}>
          <Trends />
        </div>
      </div>
    </main>
  );
}

export default Hometrends;
