import React, { useState, useEffect } from 'react';
import styles from './quizStatCard.module.css';
import { getAllQuizzes } from '../../../services/QuizService';

const QuizStatCard = () => {
  const [data, setData] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);

  useEffect(() => {
    const getQuizData = async () => {
      const response = await getAllQuizzes();
      console.log(response)
      setData(response.allQuizzes);

      let total = 0;
      response.allQuizzes.forEach((item) => {
        total += item.questions.length;
      });
      setTotalQuestion(total);
    };
    getQuizData();
  }, []);

  return (
    <div className={styles.quizStatsContainer}>
      <div className={`${styles.quizCard} ${styles.orangeText}`}>
        <div className={styles.cardContent}>
          <p>{data.length}</p>
          <span>Quiz</span>
        </div>
        <span>Created</span>
      </div>
      <div className={`${styles.quizCard} ${styles.greenText}`}>
        <div className={styles.cardContent}>
          <p>{totalQuestion}</p>
          <span>Questions</span>
        </div>
        <span>Created</span>
      </div>
      <div className={`${styles.quizCard} ${styles.blueText}`}>
        <div className={styles.cardContent}>
          <p>998</p>
          <span>Total</span>
        </div>
        <span>Impressions</span>
      </div>
    </div>
  );
};

export default QuizStatCard;
