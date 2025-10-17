import { Lock } from "lucide-react";
import styles from "./protectedRoute.module.css";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <Lock className={styles.icon} />
          <p className={styles.text}>Please login to continue</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className={styles.button}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
