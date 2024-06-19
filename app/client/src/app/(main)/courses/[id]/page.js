"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/courseDetails/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "@/components/LoginContext";
import { API_URL } from "@/app/layout";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState({});
  const [author, setAuthor] = useState("");
  const [userEnrolls, setEnrolls] = useState([]);
  const [enrollment, setEnrollment] = useState(false);
  const { logged } = useContext(LoginContext);

  const GetCourse = async () => {
    return await fetch(`${API_URL}/course/${params.id}`)
      .then((res) => res.json())
      .then(async (data) => {
        setCourse(data.data);
        await fetch(`${API_URL}/user/${data.data.userId}`)
          .then((res) => res.json())
          .then((data) => setAuthor(data.data.name));
      });
  };

  const GetUserEnrolls = async () => {
    if (logged.value) {
      return await fetch(`${API_URL}enroll/${logged.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setEnrolls(data.data);
          CheckEnrollment(data.data);
        });
    }
  };

  const CheckEnrollment = (enrolls) => {
    enrolls.forEach((enroll) => {
      if (enroll.course_id == params.id) {
        setEnrollment(true);
      }
    });
  };

  useEffect(() => {
    GetCourse();
  }, []);

  useEffect(() => {
    GetUserEnrolls();
  }, [logged.value]);

  const PurchaseCourse = async () => {
    await fetch(`${API_URL}enroll`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: logged.user.id,
        course: course,
      }),
    })
      .then((res) => res.json())
      .then((data) => router.push(data.url));
  };

  const videos = [
    {
      course_id: params.id,
      title: "introduction",
    },
  ];

  const contentBackground = {
    background: `url('${API_URL}/course/img/${course.image}')`,
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
          <img src={`${API_URL}/course/img/${course.image}`} />
          {enrollment ? (
            <h1>Purchased</h1>
          ) : (
            <button
              onClick={PurchaseCourse}
              href={`/purchase/${params.id}`}
              disabled={!logged.value}
              className={styles.purchaseBtn}
            >
              {logged.value ? "Purchase" : "You Must Login First"}
            </button>
          )}
        </div>
      </div>

      <div className={styles.description}>
        <h3>Description</h3>
        <pre>{course.description}</pre>
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
