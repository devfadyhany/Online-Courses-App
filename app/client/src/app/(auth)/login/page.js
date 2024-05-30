import React from "react";
import styles from "@/styles/(auth)/login/page.module.css";
import Link from "next/link";

function Login() {
  return (
    <div className={styles.container}>
      <form
        action="http://192.168.1.103:8000/api/v1/user/login"
        method="post"
        className={styles.LoginForm}
      >
        <h1>Login to your Account</h1>

        <div className={styles.TextGroup}>
          <input
            name="email"
            type="email"
            placeholder="Enter your Email-address..."
          />
        </div>

        <div className={styles.TextGroup}>
          <input
            name="password"
            type="password"
            placeholder="Enter your Password..."
          />
        </div>

        <Link href="/register">Don't Have an Account?</Link>

        <input className={styles.SubmitBtn} type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
