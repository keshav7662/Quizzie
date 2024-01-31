import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './quizInterfacePage.module.css';
import { getQuizById } from '../../services/QuizService';
import useCountdownTimer from '../../hooks/useCountdownTimer';
import QuizCompletedCard from '../../components/QuizCompleted/QuizCompletedCard';
import { UpdateQuizResult } from '../../services/QuizService';

const QuizInterfacePage = () => {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionsForQuiz, setQuestionsForQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompletd] = useState(false);
  const [impressions, setImpressions] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizType, setQuizType] = useState()
  const [quizAttemptedData, setQuizAttemptedData] = useState([])
  const questionWiseDataRef = useRef({
    correctAnswers: 0,
    incorrectAnswers: 0,
    attempts: 0,
  });

  useEffect(() => {
    if (currentQuestionIndex === questionsForQuiz.length - 1) {
      handleSubmitQuiz()
    }
  }, [quizAttemptedData]);

  useEffect(() => {
    const quizFound = async () => {
      const response = await getQuizById(id);
      if (response) {
        const initialQuestion = response.requiredQuiz.questions[currentQuestionIndex];
        setImpressions(response.requiredQuiz.impressions);
        setQuizType(response.requiredQuiz.quizType)
        setQuestionsForQuiz(() => response.requiredQuiz.questions);
        questionWiseDataRef.current = {
          correctAnswers: initialQuestion.correctAnswers,
          incorrectAnswers: initialQuestion.incorrectAnswers,
          attempts: initialQuestion.attempts,
        };
        initialTimer(response.requiredQuiz.questions[currentQuestionIndex].timer);
      }
    };

    if (id) {
      quizFound();
    }
  }, [id, currentQuestionIndex]);

  const currentQuestion = questionsForQuiz[currentQuestionIndex];
  const handleNavigation = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex + 1 === questionsForQuiz.length) {
        setIsQuizCompletd(true);
        return prevIndex;
      } else {
        return prevIndex + 1;
      }
    });
    setSelectedOption(null);
  };

  const handleTimerEnd = () => {
    handleNavigation();
  };

  const handleNextButtonClick = () => {
    const correctOption = Number(currentQuestion.answer);

    if (selectedOption !== null) {
      const isCorrect = selectedOption === correctOption;
      if (isCorrect) {
        setQuizScore((prevMarks) => prevMarks + 1)
      }

      questionWiseDataRef.current = {
        correctAnswers: isCorrect ? questionWiseDataRef.current.correctAnswers + 1 : questionWiseDataRef.current.correctAnswers,
        incorrectAnswers: isCorrect ? questionWiseDataRef.current.incorrectAnswers : questionWiseDataRef.current.incorrectAnswers + 1,
        attempts: questionWiseDataRef.current.attempts + 1,
      };

      setQuizAttemptedData((prevData) => [
        ...prevData,
        {
          correctAnswers: questionWiseDataRef.current.correctAnswers,
          incorrectAnswers: questionWiseDataRef.current.incorrectAnswers,
          attempts: questionWiseDataRef.current.attempts,
          _id: currentQuestion._id || '',
        },
      ]);

    } else {
      setQuizAttemptedData((prevData) => [
        ...prevData,
        {
          correctAnswers: 0,
          incorrectAnswers: 0,
          attempts: 0,
        },
      ]);
    }

    handleNavigation();
  };

  const handleSubmitQuiz = async () => {
    const response = await UpdateQuizResult(id, impressions + 1, quizAttemptedData)
  }
  const handleSelectedOption = (optionNumber) => {
    setSelectedOption(optionNumber);
  };

  const { availableSecond, initialTimer } = useCountdownTimer(handleTimerEnd);

  return (
    <div className={styles.quizInterfaceContainer}>
      {
        isQuizCompleted ? (
          <QuizCompletedCard
            questionsLength={questionsForQuiz.length}
            correctAnswers={quizScore}
            quizType={quizType}
          />
        ) : (
          currentQuestion && (
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
                  <button onClick={handleNextButtonClick}>{currentQuestionIndex === questionsForQuiz.length - 1 ? 'SUBMIT' : 'NEXT'}</button>
                </div>
              </div>
            </div>
          )
        )
      }
    </div>
  );
};

export default QuizInterfacePage;
