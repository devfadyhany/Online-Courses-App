"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/home/page.module.css";
import Link from "next/link";
import { API_URL } from "@/app/layout";

export default function Card({ course }) {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/user/${course.userId}`)
      .then((res) => res.json())
      .then((data) => setAuthor(data.data.name));
  }, []);

  return (
    <div className={styles.card}>
      <Link href={`/courses/${course.id}`}>
        <div className={styles.priceTag}>
          <p>{course.price}$</p>
        </div>
        <img
          className={styles.cardImg}
          src={`${API_URL}/course/img/${course.image}`}
          width={600}
          height={250}
          alt="card-img"
        />
        <div className={styles.cardText}>
          <h3>
            {course.title.length > 20
              ? `${course.title.slice(0, 16)}...`
              : course.title}
          </h3>
          <h5>{`Author: ${author}`}</h5>
          <h5>{`Level: ${course.level}`}</h5>
          <h5>{`Duration: ${course.length}`}</h5>
          <h5>{`Publish-Date: ${course.publishDate.slice(0,10)}`}</h5>
        </div>
      </Link>
    </div>
  );
}
