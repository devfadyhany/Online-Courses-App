"use client";

import { API_URL } from "@/app/layout";
import styles from "@/styles/dashboard/page.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    async function fetchData() {
      await fetch(`${API_URL}course/${courseId}`)
        .then((res) => res.json())
        .then(async (data) => {
          setTitle(data.data.title);
          setDescription(data.data.description);
          setPrice(data.data.price);
          setLevel(data.data.level);

          await fetch(`${API_URL}course/img/${data.data.image}`).then((res) => {
            setPreview(res.url);
          });
        });
    }

    if (EditMode) {
      fetchData();
    }
  }, []);

  const ValidData = (title, description, price, level) => {
    if (title.length < 3) {
      toast.error("Invalid title", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "dark",
      });
      return false;
    }

    if (description.length < 3) {
      toast.error("Invalid description", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "dark",
      });
      return false;
    }

    if (price <= 0) {
      toast.error("Invalid price", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "dark",
      });
      return false;
    }

    if (level != "Beginner" && level != "Intermediate" && level != "Advanced") {
      toast.error("Invalid level", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "dark",
      });
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
              toast.success("New Course Has Been Created Successfully", {
                closeOnClick: true,
                autoClose: 2000,
                theme: "dark",
              });
            } else {
              toast.error(data.message, {
                closeOnClick: true,
                autoClose: 2000,
                theme: "dark",
              });
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
              toast.success("Course Has Been Edited Successfully", {
                closeOnClick: true,
                autoClose: 2000,
                theme: "dark",
              });
            } else {
              toast.error(data.message, {
                closeOnClick: true,
                autoClose: 2000,
                theme: "dark",
              });
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
    <>
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
      <ToastContainer />
    </>
  );
};

export default CourseForm;
