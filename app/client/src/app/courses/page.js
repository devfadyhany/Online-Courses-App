import React from "react";
import styles from "@/styles/courses/page.module.css";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "@/components/Card";

export default function page() {
  return (
    <>
      <section className="container">
        <div className={styles.searchSection}>
          <input type="text" placeholder="Enter Your Search Here..." />
          <FontAwesomeIcon icon={fas.faMagnifyingGlass} />
        </div>
      </section>

      <section className="container">
        <div className={styles.filtersSection}>
          <select name="Price Filter" id="">
            <option value="">Price Filter</option>
            <option value="5">5$ - 10$</option>
            <option value="10">10$ - 15$</option>
            <option value="15">15$ - 20$</option>
            <option value="20">20$ - 25$</option>
          </select>

          <select name="Level Filter" id="">
            <option value="">Level Filter</option>
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
          </select>
        </div>
      </section>

      <section className="container">
        <div className={styles.coursesSection}>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </>
  );
}
