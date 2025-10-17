import { useState } from "react";
import styles from "./registerPage.module.css";
import { useNavigate } from 'react-router-dom'
import { authRequest } from "../../services/AuthService";
import { toast } from 'react-toastify'

const Register = () => {
  const [isSignUo, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) => setFormData((prev) => ({ ...prev, [name]: value, }));

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isSignUo ? 'register' : 'login';
      const response = await authRequest(endpoint, formData);

      localStorage.setItem('token', response.token);
      toast.success(response.message);
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
    }
  };

  const toggleForm = (isSignUp) => {
    setIsSignUp(isSignUp);
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.registrationArea}>
        <h1 className={styles.quizTitle}>QUIZZIE</h1>
        <div className={styles.toggleBtn}>
          <button
            className={isSignUo ? styles.isSelected : null}
            onClick={() => toggleForm(true)}
          >
            Sign Up
          </button>
          <button
            className={!isSignUo ? styles.isSelected : null}
            onClick={() => toggleForm(false)}
          >
            Login
          </button>
        </div>
        <form onSubmit={handleRegistration}>
          {isSignUo && (
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {isSignUo && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className={styles.submitBtn}>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : isSignUo ? "Sign-Up" : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
