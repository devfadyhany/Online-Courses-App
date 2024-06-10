"use client";

import React, { useState } from "react";
import styles from "@/styles/register/page.module.css";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

function Register() {
  const url = "http://localhost:8000/api/v1/";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [response, setResponse] = useState({});
  const cookies = useCookies();
  const router = useRouter();

  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(gender);
    console.log(isInstructor);
    console.log(image);

    if (
      username.length >= 3 &&
      password >= 8 &&
      (gender == "M" || gender == "F") &&
      image
    ) {
      const file = new File([image] , `${Date.now()}${image.name}`);
      formData.append("image", file);

      await fetch(`${url}user/register`, {
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
          await fetch(`${url}user/uploadImage`, {
            method: "POST",
            body: formData,
          });
          setResponse(data);
          if (data.status === 200) {
            cookies.set("token", data.token);
            router.push("/");
          }
        });
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        action="http://192.168.1.103:8000/api/v1/user/register"
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
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          {preview && <img src={preview} width={100} height={100} />}
        </div>

        <input className={styles.SubmitBtn} type="submit" value="Register" />

        <Link href="/login">Already Have an Account?</Link>
      </form>
    </div>
  );
}

export default Register;
