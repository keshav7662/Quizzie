import React, { useEffect, useState } from "react";
import AnalysisRow from "../../components/AnalysisRow/AnalysisRow";
import styles from "./analysisPage.module.css";
import { getAllQuizzes, deleteQuiz } from "../../services/QuizService";

const AnalysisPage = ({
  setShowSweetAlert,
  confirmDelete,
  setConfirmDelete,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [quizData, setQuizData] = useState([]);

  const getQuizAnalysis = async () => {
    try {
      const response = await getAllQuizzes();
      const sortedData = response.allQuizzes.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setQuizData(sortedData);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    const handleDeleteQuiz = async () => {
      if (confirmDelete && selectedId !== null) {
        await deleteQuiz(selectedId);
        setConfirmDelete(false);
        getQuizAnalysis();
      }
    };

    handleDeleteQuiz();
  }, [confirmDelete, selectedId, setConfirmDelete]);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  useEffect(() => {
    getQuizAnalysis();
  }, []);

  const deleteAnalytics = (id) => {
    setSelectedId(id);
  };

  return (
    <div className={styles.analysisPage}>
      <h1 className={styles.heading}>Quiz Analysis</h1>
      <table>
        <thead className={styles.tableHead}>
          <tr>
            <th>S.No</th>
            <th>Quiz Name</th>
            <th>Created on</th>
            <th>Impression</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {quizData.map((item, index) => (
            <AnalysisRow
              item={{ ...item, createdAt: formatDate(item.createdAt) }}
              key={index}
              index={index + 1}
              className={index % 2 !== 0 ? styles.evenRow : ""}
              deleteAnalytics={deleteAnalytics}
              setShowSweetAlert={setShowSweetAlert}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisPage;