import React from 'react';
import styles from './quizStatCard.module.css';

const QuizStatCard = ({ data, totalQuestion, totalImpression }) => {

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
          <p>{totalImpression}</p>
          <span>Total</span>
        </div>
        <span>Impressions</span>
      </div>
    </div>
  );
};

export default QuizStatCard;
