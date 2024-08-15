"use client";

import React, { useState } from "react";
import styles from "@/styles/login/page.module.css";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { API_URL } from "@/app/layout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = useCookies();
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    await fetch(`${API_URL}user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          cookies.set("token", data.token);
          toast.success("Logged In Successfully", {
            closeOnClick: true,
            autoClose: 2000,
            theme: "dark",
          });
          router.push("/");
        } else {
          toast.error(data.message, {
            closeOnClick: true,
            autoClose: 2000,
            theme: "dark",
          });
        }
      });
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.LoginForm}>
        <h1>Login to your Account</h1>
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

        <input
          className={styles.SubmitBtn}
          type="submit"
          disabled={loading}
          value={loading ? "Loading..." : "Login"}
        />

        <Link href="/register">Don't Have an Account?</Link>
      </form>
    </div>
  );
}

export default Login;
