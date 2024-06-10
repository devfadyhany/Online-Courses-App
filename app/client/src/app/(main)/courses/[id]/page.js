"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/courseDetails/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default function page() {
  const url = "http://localhost:8000/api/v1";

  const params = useParams();
  const [course, setCourse] = useState({});
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch(`${url}/course/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.data);
        fetch(`${url}/user/${data.data.user_id}`)
          .then((res) => res.json())
          .then((data) => setAuthor(data.data.name));
      });
  }, []);

  const videos = [
    {
      course_id: params.id,
      title: "introduction",
    },
  ];

  const contentBackground = {
    background: `url('${url}/course/img/${course.image}')`,
  };

  return (
    <>
      <div className={styles.content} style={contentBackground}>
        <div className={styles.textPart}>
          <h3>{course.title}</h3>
          <h4>Price: {course.price}$</h4>
          <h4>Level: {course.level}</h4>
          <h4>Duration: {course.length}</h4>
          <h4>Author: {author}</h4>
        </div>
        <div className={styles.imgPart}>
          <img src={`${url}/course/img/${course.image}`} />
          <a href="" className={styles.purchaseBtn}>
            Purchase
          </a>
        </div>
      </div>

      <div className={styles.description}>
        <h3>Description</h3>
        <p>{course.description}</p>
      </div>

      <div className={styles.videosList}>
        <h3>Videos</h3>
        <ul>
          {videos.map((video, index) => {
            return (
              <li key={index}>
                <a href="">
                  <FontAwesomeIcon icon={fas.faCirclePlay} />
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}-{video.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
