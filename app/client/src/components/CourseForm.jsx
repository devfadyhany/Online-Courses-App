"use client";

import { API_URL } from "@/app/layout";
import styles from "@/styles/dashboard/page.module.css";
import { useEffect, useState } from "react";

const CourseForm = ({ EditMode, instructorId, courseId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const userId = instructorId;
  const formData = new FormData();

  useEffect(() => {
    if (EditMode) {
      fetch(`${API_URL}course/${courseId}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.data.title);
          setDescription(data.data.description);
          setPrice(data.data.price);
          setLevel(data.data.level);

          fetch(`${API_URL}course/img/${data.data.image}`).then((res) => {
            setPreview(res.url);
          });
        });
    }
  }, []);

  const ValidData = (title, description, price, level) => {
    if (title.length < 3 || description.length < 3) {
      return false;
    }

    if (price <= 0) {
      return false;
    }

    if (level != "Beginner" && level != "Intermediate" && level != "Advanced") {
      return false;
    }

    return true;
  };

  const AddCourse = async () => {
    if (ValidData(title, description, price, level)) {
      if (image) {
        const file = new File([image], `${Date.now()}${image.name}`);
        formData.append("image", file);

        await fetch(`${API_URL}course`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            length: "00:00:00",
            level: level,
            image: file.name,
            userId: userId,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            await fetch(`${API_URL}course/uploadImage`, {
              method: "POST",
              body: formData,
            });

            if (data.status === 200) {
              console.log("success");
            } else {
              console.log(data.message);
            }
          });
      }
    }
  };

  const EditCourse = async () => {
    if (ValidData(title, description, price, level)) {
      if (image != null) {
        const file = new File([image], `${Date.now()}${image.name}`);
        formData.append("image", file);

        await fetch(`${API_URL}course/${courseId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            level: level,
            image: file.name,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            await fetch(`${API_URL}course/uploadImage`, {
              method: "POST",
              body: formData,
            });

            if (data.status === 200) {
              console.log("success");
            } else {
              console.log(data.message);
            }
          });
      } else {
        await fetch(`${API_URL}course/${courseId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: description,
            price: price,
            level: level,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              console.log("success");
            } else {
              console.log(data.message);
            }
          });
      }
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (EditMode) {
      await EditCourse();
    } else {
      await AddCourse();
    }
  };

  return (
    <div className={styles.createCourseFormOverlay}>
      <form
        onSubmit={HandleSubmit}
        encType="multipart/form-data"
        className={styles.createCourseForm}
      >
        <h1 className={styles.formTitle}>
          {EditMode ? "Edit" : "Create A New"} Course
        </h1>

        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter course title..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          rows={5}
          cols={64}
          name="description"
          value={description}
          placeholder="Enter course description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="number"
          name="price"
          value={price}
          placeholder="Enter course price..."
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <select
          name="level"
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
          }}
        >
          <option value="">Choose course Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <div className={styles.fileGroup}>
          <div>
            <p>Choose course image:</p>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          {preview && <img src={preview} width={100} height={100} />}
        </div>

        <button type="submit">{EditMode ? "Edit" : "Create"}</button>
      </form>
    </div>
  );
};

export default CourseForm;
