import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './quizInterfacePage.module.css';
import { getQuizById } from '../../services/QuizService';
import useCountdownTimer from '../../utils/useCountdownTimer';

const QuizInterfacePage = () => {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionsForQuiz, setQuestionsForQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleTimerEnd = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption(null);
  }
  const { availableSecond, initialTimer } = useCountdownTimer(handleTimerEnd);
  const handleSelectedOption = (optionNumber) => {
    setSelectedOption(optionNumber);
  };

  useEffect(() => {
    const quizFound = async () => {
      const response = await getQuizById(id);
      if (response) {
        setQuestionsForQuiz(() => response.requiredQuiz.questions);
        initialTimer(response.requiredQuiz.questions[currentQuestionIndex].timer)
      }
    };
    if (id) {
      quizFound();
    }
  }, [id, currentQuestionIndex]);

  const handleNextButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedOption(null);
  };

  const currentQuestion = questionsForQuiz[currentQuestionIndex];

  return (
    <div className={styles.quizInterfaceContainer}>
      {currentQuestion && (
        <div className={styles.quizPlayArea}>
          <div className={styles.questionCountAndTimer}>
            <p>{`${currentQuestionIndex + 1}/${questionsForQuiz.length}`}</p>
            <p className={styles.secondsLeft}>{availableSecond !== 'OFF' ? `00:${String(availableSecond).padStart(2, '0')}s` : ''}</p>
          </div>
          <div className={styles.questionOptionArea}>
            <h2>{currentQuestion.title}</h2>

            <div className={styles.optionArea}>
              {currentQuestion.optionType === 'Text' ? (
                currentQuestion.option.map((option, index) => (
                  <p key={index} className={`${styles.individualOptionText} ${selectedOption === index ? styles.selected : ''
                    }`}
                    onClick={() => handleSelectedOption(index)}>
                    {option.text}
                  </p>
                ))
              ) : currentQuestion.optionType === 'Image URL' ? (
                currentQuestion.option.map((option, index) => (
                  <div
                    key={index}
                    className={`${styles.individualOptionImage} ${selectedOption === index ? styles.selected : ''
                      }`}
                    onClick={() => handleSelectedOption(index)}
                  >
                    <img src={option.image} alt={`Option ${index + 1}`} />
                  </div>
                ))
              ) : (
                currentQuestion.option.map((option, index) => (
                  <div key={index} className={`${styles.individualOptionTextAndImage} ${selectedOption === index ? styles.selected : ''
                    }`}
                    onClick={() => handleSelectedOption(index)}>
                    <p>{option.text}</p>
                    <div className={styles.individualOptionImage}>
                      <img src={option.image} alt={`Option ${index + 1}`} />
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className={styles.submitBtn}>
              <button onClick={handleNextButtonClick}>NEXT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizInterfacePage;
