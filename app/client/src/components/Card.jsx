import React from "react";
import styles from "@/styles/home/page.module.css";
import Link from "next/link";

export default function Card() {
  const course_id = 1;

  return (
    <div className={styles.card}>
      <Link href={`/courses/${course_id}`}>
        <div className={styles.priceTag}>
          <p>$0</p>
        </div>
        <img
          className={styles.cardImg}
          src="https://placehold.co/600x400"
          alt="card-img"
        />
        <div className={styles.cardText}>
          <h3>Course Title</h3>
          <h5>Author</h5>
          <h5>Level</h5>
          <h5>Time</h5>
          <h5>Date</h5>
        </div>
      </Link>
    </div>
  );
}
