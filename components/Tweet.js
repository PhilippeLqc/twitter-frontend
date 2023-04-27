import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faHeart,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletetweet } from '../reducers/deleted';


function Tweet(props) {
  const tweetDate = new Date(props.date);
  const currentDate = new Date();
  const diffMs = currentDate - tweetDate;
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  const dispatch = useDispatch();


  const token = useSelector((state) => state.user.value);

  // crée un variable timediff conditionnelle selon le temps (en min, hours, jours)

  let timeDiff = "";
  if (diffDays > 0) {
    timeDiff = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffHours > 0) {
    timeDiff = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffMinutes > 0) {
    timeDiff = `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else {
    timeDiff = "just now";
  }

//   fonction qui gere la suppression d'un tweet au clic sur l'icone poubelle

  function handleDelete(props) {
    fetch(`http://localhost:3000/tweets/delete/${props._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(deletetweet())
      });
  }

// const qui gère l'affichage de l'icone poubelle

  const showTrashIcon = props.user.token === token;

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <FontAwesomeIcon
          icon={faUserCircle}
          style={{ color: "#47a4cd", width: "8%", height: "auto" }}
        />
        <p>{props.user.firstname}</p>
        <p>@{props.user.username}</p>
        <p>{timeDiff}</p>
      </div>
      <div className={styles.middle}>
        <p>{props.message}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.likes}>
          <FontAwesomeIcon
            icon={faHeart}
            style={{ color: "#ffffff", marginTop: "17px" }}
          />
          <p>0</p>
        </div>
        {showTrashIcon && (
          <FontAwesomeIcon
            onClick={() => handleDelete(props)}
            icon={faTrashCan}
            style={{ color: "#ffffff" }}
          />
        )}
      </div>
    </div>
  );
}

export default Tweet;
