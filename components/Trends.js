import styles from "../styles/Trends.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";

function Trends() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className={styles.trends}>
      <div>
        <h3 className={styles.hashtags}>#ZeldaTOTK</h3>
        <p className={styles.count}>50k Tweets</p>
      </div>
    </div>
  );
}

export default Trends;
