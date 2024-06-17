"use client";

import React, { useState } from "react";
import styles from "@/styles/login/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { API_URL } from "@/app/layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({
    status: 0,
    message: "",
    token: "",
  });
  const router = useRouter();
  const cookies = useCookies();

  const submitHandler = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        if (data.status === 200) {
          cookies.set("token", data.token);
          router.push("/");
        }
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.LoginForm}>
        <h1>Login to your Account</h1>
        {response.status === 404 && (
          <p className={styles.Error}>{response.message}</p>
        )}

        <div className={styles.TextGroup}>
          <input
            name="email"
            type="email"
            placeholder="Enter your Email-address..."
            onChange={(e) => {
              setResponse({ status: 0, message: "", token: "" });
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className={styles.TextGroup}>
          <input
            name="password"
            type="password"
            placeholder="Enter your Password..."
            onChange={(e) => {
              setResponse({ status: 0, message: "", token: "" });
              setPassword(e.target.value);
            }}
          />
        </div>

        <input className={styles.SubmitBtn} type="submit" value="Login" />

        <Link href="/register">Don't Have an Account?</Link>
      </form>
    </div>
  );
}

export default Login;
