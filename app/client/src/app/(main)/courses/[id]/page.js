"use client";

import React from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/courseDetails/page.module.css"

export default function page() {
  const params = useParams();

  return (
    <>
      <div className={styles.content}>
      <div className={styles.textPart}>
        <h3>Title</h3>
        <h4>Price: 500 EGP</h4>
        <h4>Level: Beginner</h4>
        <h4>Duration: 60:00:00 Hours</h4>
        <h4>Author: Fady Hany</h4>
      </div>
      <div className={styles.imgPart}>
        <img src="https://placehold.co/1280x720" />
        <button className={styles.purchaseBtn}>Purchase</button>
      </div>
    </div>

    <div className={styles.description}>
      <h3>Description</h3>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolore
        delectus ut repudiandae eveniet voluptatum. Velit provident dignissimos
        odio quas ipsam natus ipsa atque illum architecto quo, incidunt ex porro
        error commodi laboriosam assumenda! Maiores illum optio iusto,
        laudantium aspernatur modi nobis et id ex veritatis, sequi doloribus
        voluptas aliquid.
      </p>
    </div>

    <div className={styles.videosList}>
        <h3>Videos</h3>
        <ul>
            <li><i className="fa-solid fa-circle-play"></i><a href="">01-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">02-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">03-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">04-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">05-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">06-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">07-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">08-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">09-Introduction</a></li>
            <li><i className="fa-solid fa-circle-play"></i><a href="">10-Introduction</a></li>
        </ul>
    </div>
    </>
  );
}
