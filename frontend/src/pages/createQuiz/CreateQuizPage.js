import { useState } from 'react'
import { Plus, X } from 'lucide-react';
import styles from './createQuizPage.module.css'
import { useNavigate } from 'react-router-dom'
import AskQuizType from './component/AskQuizType'
import { nanoid } from 'nanoid';
import { validateQuizData } from '../../utils/validateQuizData';
import { createQuizApi } from '../../services/QuizService';
import { toast } from 'react-toastify';

const CreateQuizPage = () => {
  const navigate = useNavigate();

  const [formPopUp, setFormPopUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [quizType, setQuizType] = useState(null);
  const [quizName, setQuizName] = useState(null);
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("")
  const [questions, setQuestions] = useState([{
    id: nanoid(),
    questionTitle: '',
    optionType: 'text',
    options: [
      {
        id: nanoid(),
        content: '',
        isCorrect: false
      },
      {
        id: nanoid(),
        content: '',
        isCorrect: false
      }
    ],
    timer: 'off'
  }]);

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const addQuestion = () => {
    if (questions.length < 5) {
      const newQuestion = {
        id: nanoid(),
        questionTitle: '',
        optionType: 'text',
        options: [
          {
            id: nanoid(),
            content: '',
            isCorrect: false
          },
          {
            id: nanoid(),
            content: '',
            isCorrect: false
          }
        ],
        timer: 'off'
      }
      setQuestions([...questions, newQuestion])
      setActiveQuestionIndex(questions.length);
    }
  }

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestion = questions.filter((_, i) => i !== index);
      setQuestions(newQuestion);
      setActiveQuestionIndex(Math.min(activeQuestionIndex, newQuestion.length - 1));
    }
  }

  const updateQuestion = (index, updates) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...updates };
    setQuestions(newQuestions);
  }


  const addOption = (questionIndex) => {
    const question = questions[questionIndex];
    const newOption = {
      id: nanoid(),
      content: '',
      isCorrect: false
    }
    updateQuestion(questionIndex, {
      options: [...question.options, newOption]
    })
  }

  const removeOption = (questionIndex, optionIndex) => {
    const question = questions[questionIndex];
    if (question.options.length > 2) {
      const newOptions = question.options.filter((_, i) => i !== optionIndex);
      updateQuestion(questionIndex, { options: newOptions });
    }
  }

  const updateOption = (questionIndex, optionIndex, updates) => {
    const question = questions[questionIndex];
    const newOptions = [...question.options];
    newOptions[optionIndex] = { ...newOptions[optionIndex], ...updates }
    updateQuestion(questionIndex, { options: newOptions })
  }

  const setCorrectOption = (questionIndex, optionIndex) => {
    const question = questions[questionIndex];
    const newOptions = question.options.map((option, i) => ({
      ...option,
      isCorrect: i === optionIndex,
    }));
    updateQuestion(questionIndex, { options: newOptions });
  }

  //submit/save quiz
  const handleSubmit = async () => {
    const error = validateQuizData({ quizName, quizType, questions });

    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage("");
    setLoading(true);
    const quizData = {
      quizName,
      quizType,
      questions
    };

    try {
      const res = await createQuizApi(quizData);
      toast.success(res.message);
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setQuestions([{
      id: nanoid(),
      questionTitle: '',
      optionType: 'text',
      options: [
        {
          id: nanoid(),
          content: '',
          isCorrect: false
        },
        {
          id: nanoid(),
          content: '',
          isCorrect: false
        }
      ],
      timer: 'off'
    }]);
    setActiveQuestionIndex(0);
    setFormPopUp(false);
    navigate('/');
  }

  const currentQuestion = questions[activeQuestionIndex];

  return (
    <>
      {formPopUp && (
        <div className={styles.homepage} onClick={(e) => {
          if (e.target === e.currentTarget) handleCancel();
        }}>
          {step === 1 ? (
            <AskQuizType setQuizType={setQuizType} setQuizName={setQuizName} handleFormClose={handleCancel} goNext={() => setStep(2)} />
          ) : (
            <div className={styles.formdiv} onClick={(e) => e.stopPropagation()}>
              {errorMessage && (
                <div className={styles.errorMessage}>
                  {errorMessage}
                </div>
              )}
              <div className={styles.closebtndiv}>
                <X onClick={handleCancel} className={styles.closebtn} />
              </div>
              <div className={styles.header}>
                <div className={styles.questionNav}>
                  {questions.map((q, index) => (
                    <div key={q.id} className={`${styles.questionTabWrapper} ${activeQuestionIndex === index ? styles.activeQuestionTab : ""}`}>
                      <button onClick={() => setActiveQuestionIndex(index)} className={styles.questionTab}>Q{index + 1}</button>
                      {questions.length > 1 && (
                        <button onClick={() => removeQuestion(index)} className={styles.removeQuestionBtn}>
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))}

                  {questions.length < 5 && (
                    <button onClick={addQuestion} className={styles.addQuestionBtn}>
                      <Plus size={30} />
                    </button>
                  )}
                </div>
              </div>
              <input
                type="text"
                value={currentQuestion.questionTitle}
                onChange={(e) =>
                  updateQuestion(activeQuestionIndex, { questionTitle: e.target.value })
                }
                placeholder={`${quizType === 'qna' ? 'Enter your quiz question here...' : 'Poll question.....'}`}
                className={styles.input}
              />
              <div className={styles.optionType}>
                <h3>Option Type</h3>
                <label>
                  <input
                    type="radio"
                    name="optionType"
                    value='text'
                    checked={currentQuestion.optionType === 'text'}
                    onChange={(e) =>
                      updateQuestion(activeQuestionIndex, { optionType: e.target.value })
                    }
                  />
                  Text
                </label>
                <label>
                  <input
                    type="radio"
                    name="optionType"
                    value='image'
                    checked={currentQuestion.optionType === 'image'}
                    onChange={(e) =>
                      updateQuestion(activeQuestionIndex, { optionType: e.target.value })
                    }
                  />
                  Image URL
                </label>
                <label>
                  <input
                    type="radio"
                    name="optionType"
                    value='text-image'
                    checked={currentQuestion.optionType === 'text-image'}
                    onChange={(e) =>
                      updateQuestion(activeQuestionIndex, { optionType: e.target.value })
                    }
                  />
                  Text & Image URL
                </label>

              </div>
              <div className={styles.optionHeader}>
                <h3 className={styles.optionsTitle}>Options (Select Correct Answer)</h3>
                {currentQuestion.options.length < 4 && (
                  <button
                    type="button"
                    onClick={() => addOption(activeQuestionIndex)}
                    className={styles.addOptionBtn}
                  >
                    <Plus size={18} /> Add Option
                  </button>
                )}
              </div>
              <div className={styles.actionBtnOptionWrapper}>
                <div className={styles.optionTimerContainer}>
                  <div className={styles.optionContainer}>
                    {currentQuestion.options.map((option, idx) => (
                      <div key={option.id} className={styles.optionRow}>
                        <input
                          type="radio"
                          name={`correctOption-${currentQuestion.id}`}
                          checked={option.isCorrect}
                          onChange={() => setCorrectOption(activeQuestionIndex, idx)}
                          className={styles.optionRadio}
                        />
                        {currentQuestion.optionType === 'text-image' ? (
                          <div className={styles.textImageInputs}>
                            <input
                              type="text"
                              value={option.content?.text || ""}
                              placeholder={`Text`}
                              onChange={e => updateOption(activeQuestionIndex, idx, { content: { ...option.content, text: e.target.value } })}
                              className={styles.optionInput}
                            />
                            <input
                              type="text"
                              value={option.content?.image || ""}
                              placeholder={`Image URL`}
                              onChange={e => updateOption(activeQuestionIndex, idx, { content: { ...option.content, image: e.target.value } })}
                              className={styles.optionInput}
                            />
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={option.content}
                            placeholder={`${currentQuestion.optionType === 'image' ? 'Image URL' : 'Text'}`}
                            onChange={e => updateOption(activeQuestionIndex, idx, { content: e.target.value })}
                            className={styles.optionInput}
                          />
                        )}
                        {currentQuestion.options.length > 2 && (
                          <button
                            type="button"
                            className={styles.optionDeleteBtn}
                            onClick={() => removeOption(activeQuestionIndex, idx)}
                            tabIndex={-1}
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className={styles.timerContainer}>
                    {['off', '5sec', '10sec'].map(timer => (
                      <button
                        key={timer}
                        className={`${styles.timerBtn} ${currentQuestion.timer === timer ? styles.selected : ''}`}
                        onClick={() => updateQuestion(activeQuestionIndex, { timer })}
                        type="button"
                      >
                        {timer === 'off' ? 'Off' : timer}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.actionBtnContainer}>
                  <div className={styles.actionBtns}>
                    <button onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
                    <button
                      onClick={handleSubmit}
                      className={styles.createQuizBtn}
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Quiz"}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CreateQuizPage;
