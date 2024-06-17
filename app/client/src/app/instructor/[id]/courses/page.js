"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/dashboard/page.module.css";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginContext } from "@/components/LoginContext";
import { useParams } from "next/navigation";
import CourseForm from "@/components/CourseForm";
import { API_URL } from "@/app/layout";

function InstructorCourses() {
  const { logged } = useContext(LoginContext);
  const params = useParams();
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [EditMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  useEffect(() => {
    async function FetchData() {
      await fetch(`${API_URL}course/instructor/${params.id}`)
        .then((res) => res.json())
        .then((data) => setCourses(data.data));
    }

    FetchData();
  }, [courses]);

  const DeleteCourse = async (courseId) => {
    await fetch(`${API_URL}course/${courseId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      {logged.user ? (
        <div className={`container ${styles.content}`}>
          {logged.user.id == params.id ? (
            <>
              {showForm && (
                <div>
                  <button
                    className={styles.closeFormButton}
                    onClick={() => {
                      setShowForm(false);
                    }}
                  >
                    <FontAwesomeIcon icon={fas.faX} />
                  </button>
                  <CourseForm
                    EditMode={EditMode}
                    instructorId={params.id}
                    courseId={selectedCourse.id}
                  />
                </div>
              )}

              <div className={styles.header}>
                <h1>Your Courses:</h1>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setShowForm(true);
                  }}
                >
                  <FontAwesomeIcon icon={fas.faPlus} />
                </button>
              </div>
              {courses ? (
                <div className={styles.coursesTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Level</th>
                        <th>length</th>
                        <th>Publish Date</th>
                        <th>Operation</th>
                      </tr>
                    </thead>

                    <tbody>
                      {courses.map((course) => {
                        return (
                          <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.title}</td>
                            <td>
                              {course.description.length > 48
                                ? `${course.description.slice(0, 48)}...`
                                : course.description}
                            </td>
                            <td>{course.price}</td>
                            <td>{course.level}</td>
                            <td>{course.length}</td>
                            <td>{course.publishDate.slice(0, 10)}</td>
                            <td className={styles.OperationCell}>
                              <div>
                                <button
                                  className={styles.EditBtn}
                                  onClick={() => {
                                    setSelectedCourse(course);
                                    setEditMode(true);
                                    setShowForm(true);
                                  }}
                                >
                                  <FontAwesomeIcon icon={fas.faPenToSquare} />
                                </button>
                              </div>
                              <div>
                                <button
                                  className={styles.DeleteBtn}
                                  onClick={() => {
                                    DeleteCourse(course.id);
                                  }}
                                >
                                  <FontAwesomeIcon icon={fas.faTrash} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h1>No Courses Found</h1>
              )}
            </>
          ) : (
            <h1>Unauthorized</h1>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default InstructorCourses;
