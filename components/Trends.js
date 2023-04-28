import styles from "../styles/Trends.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";

function Trends() {
  const [hashtags, sethashtags] = useState([]);
  const [id, setId] = useState("");
  const [filteredTweets, setFilteredTweets] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    fetch("http://localhost:3000/hashtags/getHashtags")
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        sethashtags(data);
      });
  }, []);

  console.log('test', hashtags[0].hashtag)
  return (
    <div className={styles.trends}>
      <div>
        <h3 className={styles.hashtags}>{hashtags[0].hashtag}</h3>
        <p className={styles.count}>{hashtags.length} Tweets</p>
      </div>
    </div>
  );
}

export default Trends;
