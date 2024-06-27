"use client";

import { API_URL } from "@/app/layout";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "@/components/LoginContext";
import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/courseDetails/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CourseDetails() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState({});
  const [videos, setVideos] = useState([]);
  const [author, setAuthor] = useState("");
  const [enrollment, setEnrollment] = useState(false);
  const { logged } = useContext(LoginContext);

  const GetCourse = async () => {
    return await fetch(`${API_URL}/course/${params.id}`)
      .then((res) => res.json())
      .then(async (result) => {
        setCourse(result.data);
        await fetch(`${API_URL}/user/${result.data.userId}`)
          .then((res) => res.json())
          .then((author) => setAuthor(author.data.name));

        await fetch(`${API_URL}/video/${params.id}`)
          .then((res) => res.json())
          .then((video) => setVideos(video.data));
      });
  };

  const GetUserEnrolls = async () => {
    if (logged.value) {
      return await fetch(`${API_URL}enroll/${logged.user.id}`)
        .then((res) => res.json())
        .then((result) => {
          CheckEnrollment(result.data);
        });
    }
  };

  const CheckEnrollment = (enrolls) => {
    if (enrolls == null) {
      return;
    }

    enrolls.forEach((enroll) => {
      if (enroll.course_id == params.id) {
        setEnrollment(true);
      }
    });
  };

  useEffect(() => {
    try {
      GetCourse();
    } catch (err) {
      console.log("Failed To Retreive Course Data");
    }
  }, []);

  useEffect(() => {
    try {
      GetUserEnrolls();
    } catch (err) {
      console.log("Failed To Check User Enrollment");
    }
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
      .then((result) => router.push(result.url));
  };

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
            <button
              className={styles.purchaseBtn}
              onClick={() => {
                router.push(
                  `/course/${params.id}/watch?video=${videos[0].video_src}`
                );
              }}
            >
              Watch
            </button>
          ) : (
            <button
              onClick={PurchaseCourse}
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
        {videos ? (
          <>
            <h3>Videos</h3>
            <ul>
              {enrollment ? (
                <>
                  {videos.map((video, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={`/course/${params.id}/watch?video=${video.video_src}`}
                        >
                          <FontAwesomeIcon icon={fas.faCirclePlay} />
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}-
                          {video.title}
                        </Link>
                      </li>
                    );
                  })}
                </>
              ) : (
                <>
                  {videos.map((video, index) => {
                    return (
                      <li style={{ cursor: "auto" }} key={index}>
                        <FontAwesomeIcon icon={fas.faLock} />
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}-
                        {video.title}
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </>
        ) : (
          <h3>No Videos Yet.</h3>
        )}
      </div>
    </>
  );
}
