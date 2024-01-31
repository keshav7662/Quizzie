import React, { useState } from 'react'
import styles from './quizCompletedCard.module.css'
import trophy from '../../assets/trophy.png'
import ConfettiExplosion from 'react-confetti-explosion';

const QuizCompletedCard = ({ questionsLength, correctAnswers, quizType }) => {
  const [isExploding, setIsExploding] = useState(true);
  return (
    <div className={styles.quizCompletedCard}>
      {isExploding && <ConfettiExplosion
        force={0.8}
        duration={2000}
        particleCount={300}
        width={2600}
      />}
      {
        quizType === 'poll' ? (
          <div className={styles.pollSuccessContainer}>
            <h2 className={styles.pollSuccess}>Thank you for participating in the Poll</h2>
          </div>
        ) : (
          <>
            <h2>Congrats Quiz is completed</h2>
            <div className={styles.trophy}>
              <img src={trophy} alt="" />
            </div>
            <div className={styles.quizScore}>
              <h2>Your Score is</h2>
              <span>{correctAnswers}/{questionsLength}</span>
            </div>
          </>
        )
      }

    </div>
  )
}

export default QuizCompletedCard
