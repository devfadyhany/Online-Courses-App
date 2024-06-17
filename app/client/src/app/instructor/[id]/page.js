"use client";

import React, { useContext } from "react";
import styles from "@/styles/dashboard/page.module.css";
import { LoginContext } from "@/components/LoginContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useParams } from "next/navigation";

function Dashboard() {
  const { logged } = useContext(LoginContext);
  const params = useParams();

  return (
    <>
      {logged.user ? (
        <div className={styles.cardHolder}>
          {logged.user.id == params.id ? (
            <Link href={`/instructor/${logged.user.id}/courses`}>
              <div className={styles.cardOption}>
                <FontAwesomeIcon icon={fas.faChalkboardUser} />
                <h3>Courses</h3>
              </div>
            </Link>
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

export default Dashboard;
