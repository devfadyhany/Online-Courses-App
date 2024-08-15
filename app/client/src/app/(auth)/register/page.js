"use client";

import React, { useState } from "react";
import styles from "@/styles/register/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/layout";
import { toast } from "react-toastify";

function Register() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [response, setResponse] = useState({});
  const router = useRouter();
  const formData = new FormData();

  const ValidData = (username, password, email, gender, image) => {
    if (username.length < 3) {
      toast.error(
        "Invaild Username, username should be greater than 3 characters",
        {
          closeOnClick: true,
          autoClose: 2000,
          theme: "dark",
        }
      );
      return false;
    }

    if (email.length < 3) {
      return false;
    }

    if (password.length < 8) {
      toast.error(
        "Invaild Password, password should be greater than 8 characters",
        {
          closeOnClick: true,
          autoClose: 2000,
          theme: "dark",
        }
      );
      return false;
    }

    if (gender !== "M" && gender !== "F") {
      toast.error("Please choose a gender", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "dark",
      });
      return false;
    }

    if (!image) {
      toast.error("Please add an image", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "dark",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (ValidData(username, password, email, gender, image)) {
      const file = new File([image], `${Date.now()}${image.name}`);
      formData.append("image", file);

      await fetch(`${API_URL}user/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
          gender: gender,
          isInstructor: isInstructor,
          image: file.name,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          await fetch(`${API_URL}user/uploadImage`, {
            method: "POST",
            body: formData,
          });
          setResponse(data);
          if (data.status === 200) {
            toast.success("Registered Successfully", {
              closeOnClick: true,
              autoClose: 2000,
              theme: "dark",
            });
            router.push("/login");
          } else {
            toast.error(data.message, {
              closeOnClick: true,
              autoClose: 2000,
              theme: "dark",
            });
          }
        });
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className={styles.RegisterForm}
      >
        <h1>Create New Account</h1>
        {response && (
          <p
            style={
              response.status == 200 ? { color: "green" } : { color: "red" }
            }
          >
            {response.message}
          </p>
        )}
        <div className={styles.TextGroup}>
          <input
            name="name"
            type="text"
            placeholder="Enter your Name..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.TextGroup}>
          <input
            name="email"
            type="email"
            placeholder="Enter your Email-address..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.TextGroup}>
          <input
            name="password"
            type="password"
            placeholder="Enter your Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.RadioGroup}>
          <div>
            <input
              type="radio"
              name="gender"
              id="male"
              value="M"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              id="female"
              value="F"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className={styles.CheckboxGroup}>
          <label htmlFor="isInstructor">Are you an Instructor?</label>
          <input
            name="isInstructor"
            type="checkbox"
            id="isInstructor"
            value="Y"
            onChange={(e) => setIsInstructor(e.target.value)}
          />
        </div>

        <div className={styles.FileGroup}>
          <div>
            <label htmlFor="image">Upload your Profile Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          {preview && <img src={preview} width={100} height={100} />}
        </div>

        <input
          className={styles.SubmitBtn}
          type="submit"
          disabled={loading}
          value={loading ? "Loading..." : "Register"}
        />

        <Link href="/login">Already Have an Account?</Link>
      </form>
    </div>
  );
}

export default Register;
