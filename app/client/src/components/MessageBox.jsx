import React from "react";
import styles from "@/styles/messageBox/page.module.css";

function MessageBox({ message, yesFunction, noFunction }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <p>{message}</p>
        <div>
          <button className={styles.yesBtn} onClick={yesFunction}>Yes</button>
          <button className={styles.noBtn} onClick={noFunction}>No</button>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
