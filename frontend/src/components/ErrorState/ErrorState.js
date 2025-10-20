import styles from "./errorState.module.css";

const ErrorState = ({ message, onRetry, showLoginButton = false, onLogin }) => {
  return (
    <div className={styles.stateWrapper}>
      <p className={styles.errorText}>⚠️ {message}</p>

      {showLoginButton ? (
        <button className={styles.retryBtn} onClick={onLogin}>
          Go to Login
        </button>
      ) : (
        onRetry && (
          <button className={styles.retryBtn} onClick={onRetry}>
            Retry
          </button>
        )
      )}
    </div>
  );
};

export default ErrorState;
