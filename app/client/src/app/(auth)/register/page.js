import React from "react";
import styles from "@/styles/(auth)/register/page.module.css";
import Link from "next/link";

function Register() {
  return (
    <div className={styles.container}>
      <form
        action="http://192.168.1.103:8000/api/v1/user/register"
        method="post"
        encType="multipart/form-data"
        className={styles.RegisterForm}
      >
        <h1>Create New Account</h1>

        <div className={styles.TextGroup}>
          <input name="name" type="text" placeholder="Enter your Name..." />
        </div>

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

        <div className={styles.RadioGroup}>
          <div>
            <input type="radio" name="gender" id="male" value="M" />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" name="gender" id="female" value="F" />
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
          />
        </div>

        {/* <div className="PaymentGroup">
          <h1>Payment Method</h1>
          <div className="TextGroup">
            <label htmlFor="card-num">Card-Number</label>
            <input
              id="card-num"
              type="number"
              placeholder="Enter your Card-Number..."
            />
          </div>
          <div className="TextGroup">
            <label htmlFor="card-exp">Expiration-Date</label>
            <input
              id="card-exp"
              type="date"
              placeholder="Enter your Card Expiration-Date..."
            />
          </div>
          <div className="TextGroup">
            <label htmlFor="card-cvv">CVV</label>
            <input
              id="card-cvv"
              type="number"
              placeholder="Enter your Card CVV..."
            />
          </div>
        </div> */}

        <div className={styles.FileGroup}>
          <label htmlFor="image">Upload your Profile Image:</label>
          <input type="file" id="image" name="image" />
        </div>

        <Link href="/login">Already Have an Account?</Link>

        <input className={styles.SubmitBtn} type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
