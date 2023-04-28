import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faHeart,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletetweet } from "../reducers/deleted";
import { addLiked } from "../reducers/liked";

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
  const Isdeleted = useSelector((state) => state.deleted.value);

  const [heartIconStyle, setHeartIconStyle] = useState({});

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
// couleur du coeur
useEffect(() => {
  fetch("http://localhost:3000/users/getUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (props.like.includes(data.data._id)) {
        setHeartIconStyle({ color: "#e74c3c", cursor: "pointer" });
      }
    });
  }, [])
  //   fonction qui gere la suppression d'un tweet au clic sur l'icone poubelle

  function handleDelete(props) {
    fetch(`http://localhost:3000/tweets/delete/${props._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(deletetweet());
      });
  }

  const handleLike = (props) => {
    fetch("http://localhost:3000/users/getUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!props.like.includes(data.data._id)) {
          console.log("data:", data.data._id);
          fetch(`http://localhost:3000/tweets/like/${props._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ authorId: data.data._id }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("result:", data);
              console.log("prosId:", props._id);
            });
          setHeartIconStyle({ color: "#e74c3c", cursor: "pointer" });
        } else {
          console.log("elseData:", data.data._id);
          fetch(`http://localhost:3000/tweets/deletelike/${props._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ authorId: data.data._id }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("likecollection:", data);
            });
          setHeartIconStyle({ cursor: "pointer", color: "#ffffff" });
        }
        dispatch(addLiked());
      });
  };
  console.log("coeur", heartIconStyle);
  // const qui gère l'affichage de l'icone poubelle et coeur

  const showTrashIcon = props.user.token === token;

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <FontAwesomeIcon
          icon={faUserCircle}
          style={{
            color: "#47a4cd",
            width: "50px",
            height: "auto",
            marginRight: "10px",
          }}
        />
        <p className={styles.firstname}>{props.user.firstname}</p>
        <p className={styles.username}>@{props.user.username}</p>
        <p className={styles.time}>· {timeDiff}</p>
      </div>
      <div className={styles.middle}>
        <p>{props.message}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.likes}>
          <FontAwesomeIcon
            icon={faHeart}
            style={heartIconStyle}
            onClick={() => handleLike(props)}
          />
          <p className={styles.count}>{props.like.length}</p>
          {showTrashIcon && (
            <FontAwesomeIcon
              onClick={() => handleDelete(props)}
              icon={faTrashCan}
              style={{ color: "#ffffff" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tweet;
