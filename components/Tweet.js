import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faHeart,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function Tweet(props) {


  let heartIconStyle = { 'cursor': 'pointer', 'color': "#ffffff" };
  if (props.isLiked) {
    heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
  }

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
        <p className={styles.firstname}>John</p>
        <p className={styles.username}>@JohnDoe</p>
        <p className={styles.time}>· a few seconds</p>
      </div>
      <div className={styles.middle}>
        <p>
          JE NE PEUX PAS PARTIR AU YEMEN, JE SUIS ANALYSTE FINANCIER !!
          #analyste
        </p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.likes}>
          <FontAwesomeIcon icon={faHeart} style={heartIconStyle} />
          <p className={styles.count}>0</p>
          <FontAwesomeIcon icon={faTrashCan} style={{ color: "#ffffff" }} />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
