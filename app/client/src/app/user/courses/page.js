"use client";

import { API_URL } from "@/app/layout";
import Card from "@/components/Card";
import { LoginContext } from "@/components/LoginContext";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/user/page.module.css";

function UserCourses() {
  const [enrolls, setEnrolls] = useState([]);
  const [courses, setCourses] = useState([]);
  const { logged } = useContext(LoginContext);

  const GetUserEnrolls = async () => {
    if (logged.value) {
      return await fetch(`${API_URL}enroll/${logged.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setEnrolls(data.data);
        //   GetUserCourses(data.data);
        });
    }
  };

  const GetUserCourses = (enrolls) => {
    enrolls.forEach(async (enroll) => {
      await fetch(`${API_URL}course/${enroll.course_id}`)
        .then((res) => res.json())
        .then((data) => {
          setCourses((courses) => [...courses, data.data]);
        });
    });
  };

  useEffect(() => {
    GetUserEnrolls();
  }, [logged.value]);

  useEffect(() => {
    GetUserCourses(enrolls);
  }, [enrolls])

  return (
    <div className="container">
      <div className={styles.CardHolder}>
        {courses.map((course) => {
          return <Card key={course.id} course={course} />;
        })}
      </div>
    </div>
  );
}

export default UserCourses;
