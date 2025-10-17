import React from 'react';
import styles from './quizStatCard.module.css';

const QuizStatCard = ({ name, value, color }) => {

  return (
    <div className={styles.quizCard}>
      <div className={styles.cardContent}>
        <p className={styles[color]}>{value}</p>
        <span className={styles[color]}>{name.split(' ')[0]}</span>
      </div>
      <span className={styles[color]}>{name.split(' ')[1]}</span>
    </div>
  );
};

export default QuizStatCard;
