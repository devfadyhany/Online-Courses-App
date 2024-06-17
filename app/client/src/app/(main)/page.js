"use client";

import Card from "@/components/Card";
import { LoginContext } from "@/components/LoginContext";

import styles from "@/styles/home/page.module.css";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../layout";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const { logged } = useContext(LoginContext);

  useEffect(() => {
    fetch(`${API_URL}/course`)
      .then((res) => res.json())
      .then((data) => setCourses(data.data));

    setCourses(
      courses.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    );
    setCourses(courses.slice(0, 3));
  }, []);

  return (
    <>
      <section className={`container ${styles.hero}`}>
        <h1>A New Way Of Learning</h1>
        <h3>Modern Learning is Here</h3>
        {!logged.value && (
          <div>
            <Link className={styles.signUpBtn} href="/register">
              Register
            </Link>
            <Link className={styles.signInBtn} href="/login">
              Login
            </Link>
          </div>
        )}
      </section>

      <h1 className="section-title">Latest Courses</h1>

      <section className={`container ${styles.latestCourses}`}>
        {courses ? (
          courses.map((course) => {
            return <Card key={course.id} course={course}/>;
          })
        ) : (
          <h1 style={{ color: "white" }}>No Courses Found!</h1>
        )}
      </section>

      <span id="About"></span>
      <h1 className="section-title">About</h1>

      <section className={`container ${styles.about}`}>
        <div className={styles.aboutText}>
          <p>
            Learning always has been Challenging, but fear no more because we
            are here to help by making it more fun.
          </p>
          <p>
            We aim to give you a smooth and simple User-Interface to get you
            from
            <span className={styles.specialWord}> Zero</span> to
            <span className={styles.specialWord}> Hero</span>.
          </p>
        </div>
        <div className={styles.imgContainer}>
          <img
            className={styles.aboutImg}
            src="https://placehold.co/600x400"
            alt="About-img"
          />
        </div>
      </section>

      <span id="Contact"></span>
      <h1 className="section-title">Contact</h1>

      <form className={`container ${styles.contact}`} action="">
        <div>
          <input type="text" placeholder="Enter Your Email-address..." />
          <button className={styles.contactBtnLg}>Send</button>
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Enter Your Message Here..."
        ></textarea>
        <button className={styles.contactBtnSm}>Send</button>
      </form>
    </>
  );
}
