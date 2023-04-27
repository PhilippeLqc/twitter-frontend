import styles from "../styles/Tweet.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";



function Tweet() {
  return (
   <div className={styles.main}>
    <div className={styles.top}>
    <FontAwesomeIcon
              icon={faUserCircle}
              style={{ color: "#47a4cd", width: "8%", height: "auto" }}
            />
    <p>firstname</p>
    <p>@username</p>
    <p>a few seconds</p>
    </div>
    <div className={styles.middle}>
        <p>Tweet content</p>
    </div>
    <div className={styles.bottom}>
        <div className={styles.likes}>
    <FontAwesomeIcon icon={faHeart} style={{color: "#ffffff", marginTop: "17px"}} />
    <p>0</p>
    </div>
    <FontAwesomeIcon icon={faTrashCan} style={{color: "#ffffff",}} />
    </div>

   </div>
  );
}

export default Tweet;
