import React, { useState } from "react";
import styles from "./form.module.css";
import { useNavigate } from 'react-router-dom'
import { userLogin, userRegistration } from "../../services/AuthService";

const Form = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (showSignUpForm) {
      const response = await userRegistration(userData);
      if (response) {
        resetForm();
        setShowSignUpForm(false);
      }
    } else {
      const response = await userLogin(userData);
      if (response) {
        resetForm();
        navigate('/dashboard')
      }
    }
  };

  const resetForm = () => {
    setUserData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const toggleForm = (isSignUp) => {
    setShowSignUpForm(isSignUp);
    resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.registrationArea}>
        <h1 className={styles.quizTitle}>QUIZZIE</h1>
        <div className={styles.toggleBtn}>
          <button
            className={showSignUpForm ? styles.isSelected : null}
            onClick={() => toggleForm(true)}
          >
            Sign Up
          </button>
          <button
            className={!showSignUpForm ? styles.isSelected : null}
            onClick={() => toggleForm(false)}
          >
            Login
          </button>
        </div>
        <form onSubmit={handleRegistration}>
          {showSignUpForm && (
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Name</label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
          </div>

          {showSignUpForm && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className={styles.submitBtn}>
            <button type="submit">
              {showSignUpForm ? "Sign-Up" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
