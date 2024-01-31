import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./addQuestionPage.module.css";
import SequentialQuestionAdder from "../../components/SequentialQuestionButton/SequentialQuestionAdder";
import AddQuestionBtn from "../../components/AddQuestionButton/AddQuestionBtn";
import DeleteBtn from "../../assets/delete.svg";
import Timer from "../../components/Timer/Timer";
import { addQuestion, deleteQuiz } from "../../services/QuizService";
import { getQuizById } from '../../services/QuizService'

const AddQuestionPage = ({
  hideCreateQuizCard,
  setShowAddQuestion,
  setShowPublishPage,
  receivedQuizId,
  receivedQuizType,
  updateBtn
}) => {
  const [questionCount, setQuestionCount] = useState(1);
  const [optionCount, setOptionCount] = useState(2);
  const [selectedOption, setSelectedOption] = useState();
  const [finalQuestionForQuiz, setFinalQuestionForQuiz] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0)
  const [addQuestionData, setAddQuestionData] = useState({
    title: "",
    optionType: "",
    option: [],
    answer: "",
    timer: "",
  });
  useEffect(() => {
    const getDataToEdit = async () => {
      try {
        const response = await getQuizById(receivedQuizId);
        setFinalQuestionForQuiz(response.requiredQuiz.questions);
        setQuestionCount(response.requiredQuiz.questions.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (updateBtn) {
      getDataToEdit();
    }
  }, [updateBtn]);

  useEffect(() => {
    if (updateBtn && finalQuestionForQuiz && finalQuestionForQuiz.length > 0) {
      switchPrevQuestion(0);
    }
  }, [finalQuestionForQuiz, updateBtn]);

  useEffect(() => {
    if (!updateBtn) {
      setFinalQuestionForQuiz((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        if (!isEqual(updatedQuestions[questionIndex - 1], addQuestionData)) {
          updatedQuestions[questionIndex] = addQuestionData;
        }
        return updatedQuestions;
      });
    }
  }, [addQuestionData, questionIndex]);

  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "text" || name === "image") {
      setAddQuestionData((prevData) => {
        const updatedOption = [...prevData.option];
        updatedOption[index] = {
          ...updatedOption[index],
          [name]: value,
        };
        return {
          ...prevData,
          option: updatedOption,
        };
      });
    } else {
      setAddQuestionData((prevData) => ({
        ...prevData,
        [name]: value,
        timer: prevData.timer || "OFF",
      }));
    }
  };

  const switchPrevQuestion = (indexOfPrev) => {
    setQuestionIndex(indexOfPrev);
    const prevQuestionData = finalQuestionForQuiz[indexOfPrev];
    if (updateBtn) {
      setOptionCount(prevQuestionData.option.length);
    }

    if (prevQuestionData) {
      setAddQuestionData(prevQuestionData);
      setSelectedOption(prevQuestionData.answer || "");
      setOptionCount(
        prevQuestionData.option.length >= 2 ? prevQuestionData.option.length : 2
      );
      const answerIndex = prevQuestionData.answer || -1;
      if (answerIndex !== -1) {
        setSelectedOption(Number(answerIndex));
      }
    } else {
      setAddQuestionData({
        title: "",
        optionType: "",
        option: [],
        answer: "",
        timer: "",
      });
      setSelectedOption();
    }
  };

  const handleAddButtonClick = async (actionType) => {
    if (actionType === "addQuestion" && questionCount < 5) {
      setOptionCount(2);
      const updatedQuestionData = { ...addQuestionData, timer: addQuestionData.timer || "OFF" };

      const existingQuestionIndex = finalQuestionForQuiz.findIndex((question) => question.title === updatedQuestionData.title);

      if (existingQuestionIndex !== -1) {
        setQuestionCount((prevCount) => prevCount + 1);
        setQuestionIndex((prevCount) => prevCount + 1)
      } else {
        setFinalQuestionForQuiz([...finalQuestionForQuiz, updatedQuestionData]);
        setQuestionCount((prevCount) => prevCount + 1);
        setQuestionIndex((prevCount) => prevCount + 1)
      }
      setAddQuestionData({
        title: "",
        optionType: "",
        option: [],
        answer: "",
        timer: "",
      });
      setSelectedOption();
    } else if (actionType === "addOption" && optionCount < 4) {
      setOptionCount((prevCount) => prevCount + 1);
    }
  };

  const handleRemoveItem = (actionType, index) => {
    if (actionType === "cancelOption" && optionCount > 2) {
      setOptionCount((prevCount) => prevCount - 1);
      setAddQuestionData((prevData) => {
        const updatedOption = [...prevData.option];
        updatedOption.splice(index, 1);
        return {
          ...prevData,
          option: updatedOption,
        };
      });
    } else if (actionType === "cancelQuestion" && questionCount > 1) {
      setQuestionCount((prevCount) => prevCount - 1);
      setQuestionIndex((prevCount) => prevCount - 1)
      setFinalQuestionForQuiz((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions.splice(index, 1);
        const previousQuestionIndex = index - 1;

        if (previousQuestionIndex >= 0) {
          const { title, optionType, option, answer, timer } =
            updatedQuestions[previousQuestionIndex];
          setOptionCount(option.length) // just to make sure boxes open equal to option length
          setSelectedOption(Number(answer));
          setAddQuestionData({
            title,
            optionType,
            option: [...option],
            answer,
            timer: timer ? timer : "OFF",
          });
        } else {
          setAddQuestionData({
            title: "",
            optionType: "",
            option: [],
            answer: "",
            timer: "",
          });
        }
        return updatedQuestions;
      });
    }
  };

  const handleSelectAnswer = (index) => {
    setSelectedOption(() => index);
    setAddQuestionData((prevData) => ({
      ...prevData,
      answer: `${index}`,
    }));
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!updateBtn) {
        const response = await addQuestion(receivedQuizId, {
          questions: finalQuestionForQuiz,
          if(response) {
            setAddQuestionData({
              title: "",
              optionType: "",
              option: [],
              answer: "",
              timer: "",
            });
            setFinalQuestionForQuiz([]);
            setQuestionCount(1);
            setOptionCount(2);
            setShowAddQuestion(false);
            setShowPublishPage(true);
          }
        });
      } else {
        toast.warning("Could not implement frontend due to time constraints, but API is working check controllers!", {})
        setShowPublishPage(false);
        setShowAddQuestion(false);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleTimer = (index, timerValue) => {
    if (!updateBtn) {
      setAddQuestionData((prevData) => ({
        ...prevData,
        timer: timerValue,
      }));
    } else {
      toast.error("You can not modify this feature!", {});
    }
  };

  const handleCancelQuiz = async () => {
    if (!updateBtn) {
      await deleteQuiz(receivedQuizId)
    }
    hideCreateQuizCard()
  }

  return (
    <div className={styles.addQuestionBox} onClick={(e) => e.stopPropagation()}>
      <div className={styles.addQuestionBtn}>
        <div className={styles.flexContainer}>
          {[...Array(questionCount)].map((_, index) => (
            <SequentialQuestionAdder
              key={index}
              index={index}
              isLast={index > 0}
              onCancelClick={() =>
                handleRemoveItem("cancelQuestion", index)
              }
              switchPrevQuestion={switchPrevQuestion}
              updateBtn={updateBtn}
            />
          ))}
          {updateBtn ? (
            ""
          ) : (
            <AddQuestionBtn
              onClick={() => handleAddButtonClick("addQuestion")}
              count={questionCount}
            />
          )}
        </div>
        <span>Max 5 questions</span>
      </div>
      <form className={styles.addQuestionForm} onSubmit={handleQuestionSubmit}>
        <input
          type="text"
          placeholder="Poll Question"
          name="title"
          value={addQuestionData.title}
          onChange={handleInputChange}
        />
        <div className={styles.optionType}>
          <span>Option Type</span>
          <div>
            <input
              type="radio"
              name="optionType"
              id="text"
              value="Text"
              checked={addQuestionData.optionType === "Text"}
              onChange={handleInputChange}
            />
            <label htmlFor="text">Text</label>
          </div>
          <div>
            <input
              type="radio"
              name="optionType"
              id="Image URL"
              value="Image URL"
              checked={addQuestionData.optionType === "Image URL"}
              onChange={handleInputChange}
            />
            <label htmlFor="Image URL">Image URL</label>
          </div>
          <div>
            <input
              type="radio"
              name="optionType"
              id="Text & Image URL"
              value="Text & Image URL"
              checked={addQuestionData.optionType === "Text & Image URL"}
              onChange={handleInputChange}
            />
            <label htmlFor="Text & Image URL">Text & Image URL</label>
          </div>
        </div>

        <div className={styles.optionTimerBox}>
          <div className={styles.optionsToSelect}>
            {[...Array(optionCount)].map((_, index) => (
              <div key={index}>
                {receivedQuizType !== "poll" && (
                  <input
                    type="radio"
                    name="option"
                    id={`option${index}`}
                    checked={selectedOption === index}
                    onChange={() => handleSelectAnswer(index)}
                    value={index}
                  />
                )}

                {addQuestionData.optionType === "Text & Image URL" ? (
                  <>
                    <input
                      type="text"
                      name="text"
                      placeholder="Text"
                      className={`${selectedOption === index ? styles.selectedStyle : ""
                        } ${styles.optionInputBox} ${selectedOption === index ? styles.whitePlaceholder : ""
                        } ${styles.smallerTextInput}`}
                      onChange={(e) => handleInputChange(e, index)}
                      value={addQuestionData.option[index]?.text || ""}
                    />
                    <input
                      type="text"
                      name="image"
                      placeholder="Image URL"
                      className={`${selectedOption === index ? styles.selectedStyle : ""
                        } ${styles.optionInputBox} ${selectedOption === index ? styles.whitePlaceholder : ""
                        }`}
                      onChange={(e) => handleInputChange(e, index)}
                      value={addQuestionData.option[index]?.image || ""}
                    />
                  </>
                ) : addQuestionData.optionType === "Image URL" ? (
                  <input
                    type="text"
                    name="image"
                    id={`option${index}`}
                    placeholder="Image URL"
                    className={`${selectedOption === index ? styles.selectedStyle : ""
                      } ${styles.optionInputBox} ${selectedOption === index ? styles.whitePlaceholder : ""
                      }`}
                    onChange={(e) => handleInputChange(e, index)}
                    value={addQuestionData.option[index]?.image || ""}
                  />
                ) : (
                  <input
                    type="text"
                    name="text"
                    id={`option${index}`}
                    placeholder="Text"
                    className={`${selectedOption === index ? styles.selectedStyle : ""
                      } ${styles.optionInputBox} ${selectedOption === index ? styles.whitePlaceholder : ""
                      }`}
                    onChange={(e) => handleInputChange(e, index)}
                    value={addQuestionData.option[index]?.text || ""}
                  />
                )}
                {optionCount > 2 && index > 1 && (
                  <img
                    src={DeleteBtn}
                    alt="delete"
                    className={styles.deleteBtn}
                    onClick={() =>
                      handleRemoveItem("cancelOption", index)
                    }
                  />
                )}
              </div>
            ))}
            {updateBtn ? (
              ""
            ) : (
              <button
                type="button"
                className={`${styles.optionInputBox} `}
                onClick={() => handleAddButtonClick("addOption")}
              >
                Add Option
              </button>
            )}
          </div>
          <div>
            {receivedQuizType !== "poll" && (
              <Timer
                addQuestionData={addQuestionData}
                handleTimer={handleTimer}
              />
            )}
          </div>
        </div>
        <div className={styles.actionBtn}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleCancelQuiz}
          >
            Cancel
          </button>
          <button type="submit" className={styles.createBtn}>
            {updateBtn ? "Update Quiz" : "Create Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionPage;
