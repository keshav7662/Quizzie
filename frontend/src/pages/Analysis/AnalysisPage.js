import { useEffect, useState } from "react";
import AnalysisRow from "../../components/AnalysisRow/AnalysisRow";
import styles from "./analysisPage.module.css";
import { deleteQuizApi, getAllQuizApi } from "../../services/QuizService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AnalysisPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllQuizApi();
      setQuizzes(response.quizzes || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (quizId) => {
    try {
      const res = await deleteQuizApi(quizId);
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizId));
      toast.success(res.message);
    } catch (error) {
      setError(error);
    }
  }

  if (loading) {
    return (
      <div className={styles.stateWrapper}>
        <p className={styles.loadingText}>Loading quizzes...</p>
      </div>
    );
  }


  if (error) {
    const isAuthError =
      error?.toLowerCase().includes("unauthorized") ||
      error?.toLowerCase().includes("token") ||
      error?.toLowerCase().includes("expired") ||
      error?.toLowerCase().includes("login");

    return (
      <div className={styles.stateWrapper}>
        <p className={styles.errorText}>⚠️ {error}</p>
        {isAuthError ? (
          <button
            className={styles.retryBtn}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        ) : (
          <button className={styles.retryBtn} onClick={fetchQuizzes}>
            Retry
          </button>
        )}
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className={styles.stateWrapper}>
        <p className={styles.emptyText}>You haven’t created any quizzes yet.</p>
        <button
          className={styles.createBtn}
          onClick={() => navigate('/create')}
        >
          Create Quiz
        </button>
      </div>
    );
  }

  return (
    <div className={styles.analysisPage}>
      <h1 className={styles.heading}>Quiz Analysis</h1>
      <table>
        <thead className={styles.tableHead}>
          <tr>
            <th>S.No</th>
            <th>Quiz Name</th>
            <th>Created On</th>
            <th>Impression</th>
            <th colSpan={2}></th>
          </tr>
        </thead>

        <tbody>
          {quizzes.map((quiz, idx) => (
            <AnalysisRow
              key={quiz._id}
              quiz={quiz}
              index={idx + 1}
              onDelete={handleDelete}
              className={idx % 2 !== 0 ? styles.evenRow : ""}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisPage;
