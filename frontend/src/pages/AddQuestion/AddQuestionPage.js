import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./addQuestionPage.module.css";
import SequentialQuestionAdder from "../../components/SequentialQuestionButton/SequentialQuestionAdder";
import AddQuestionBtn from "../../components/AddQuestionButton/AddQuestionBtn";
import DeleteBtn from "../../assets/delete.svg";
import Timer from "../../components/Timer/Timer";
import { addQuestion } from "../../services/QuizService";

const AddQuestionPage = ({
  hideCreateQuizCard,
  setShowAddQuestion,
  setShowPublishPage,
  receivedQuizId,
  receivedQuizType,
}) => {
  const [questionCount, setQuestionCount] = useState(1);
  const [optionCount, setOptionCount] = useState(2);
  const [selectedOption, setSelectedOption] = useState();
  const [finalQuestionForQuiz, setFinalQuestionForQuiz] = useState([]);
  const [addQuestionData, setAddQuestionData] = useState({
    title: "",
    optionType: "",
    option: [],
    answer: "",
    timer: "",
  });
  useEffect(() => {
    console.log("final", finalQuestionForQuiz);
  }, [finalQuestionForQuiz]);

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
  const handleAddButtonClick = async (actionType) => {
    if (actionType === "addQuestion" && questionCount < 5) {
      const isQuestionDataFilled = Object.values(addQuestionData).every((value) => value !== "");
  
      if (!isQuestionDataFilled) {
        toast.error("Please fill in all fields before adding a question!", {});
        return;
      }
  
      const updatedQuestionData = { ...addQuestionData, timer: addQuestionData.timer || "OFF" };
  
      const existingQuestionIndex = finalQuestionForQuiz.findIndex((question) => question.title === updatedQuestionData.title);
  
      if (existingQuestionIndex !== -1) {
        setQuestionCount((prevCount) => prevCount + 1);

        finalQuestionForQuiz[existingQuestionIndex] = updatedQuestionData;
      } else {
        setFinalQuestionForQuiz([...finalQuestionForQuiz, updatedQuestionData]);
        setQuestionCount((prevCount) => prevCount + 1);
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
      setFinalQuestionForQuiz((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions.splice(index, 1);
        const previousQuestionIndex = index - 1;

        if (previousQuestionIndex >= 0) {
          const { title, optionType, option, answer, timer } =
            updatedQuestions[previousQuestionIndex];

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
  const isAddQuestionDataValid = () => {
    const { title, optionType, option, answer } = addQuestionData;
    return (
      title !== "" && optionType !== "" && option.length > 0 && answer !== ""
    );
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    const isValid = isAddQuestionDataValid();

    if (!isValid) {
      toast.error("Please add at least one question before submitting!", {});
      return;
    }

    try {
      const questionExists = finalQuestionForQuiz.some(
        (question) => question.title === addQuestionData.title
      );

      const updatedFinalQuestionForQuiz = questionExists
        ? [...finalQuestionForQuiz]
        : [
            ...finalQuestionForQuiz,
            { ...addQuestionData, timer: addQuestionData.timer || "OFF" },
          ];

      const response = await addQuestion(receivedQuizId, {
        questions: updatedFinalQuestionForQuiz,
      });

      if (response) {
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
      } else {
        toast.error("Failed to add questions. Please try again.", {});
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleTimer = (index, timerValue) => {
    setAddQuestionData((prevData) => ({
      ...prevData,
      timer: timerValue,
    }));
  };

  return (
    <div className={styles.addQuestionBox} onClick={(e) => e.stopPropagation()}>
      <div className={styles.addQuestionBtn}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {[...Array(questionCount)].map((_, index) => (
            <SequentialQuestionAdder
              key={index}
              index={index}
              isLast={index > 0}
              onCancelClick={() =>
                handleRemoveItem("cancelQuestion", index)
              }
            />
          ))}
          <AddQuestionBtn
            onClick={() => handleAddButtonClick("addQuestion")}
            count={questionCount}
          />
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
                      className={`${
                        selectedOption === index ? styles.selectedStyle : ""
                      } ${styles.optionInputBox} ${
                        selectedOption === index ? styles.whitePlaceholder : ""
                      } ${styles.smallerTextInput}`}
                      onChange={(e) => handleInputChange(e, index)}
                      value={addQuestionData.option[index]?.text || ""}
                    />
                    <input
                      type="text"
                      name="image"
                      placeholder="Image URL"
                      className={`${
                        selectedOption === index ? styles.selectedStyle : ""
                      } ${styles.optionInputBox} ${
                        selectedOption === index ? styles.whitePlaceholder : ""
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
                    className={`${
                      selectedOption === index ? styles.selectedStyle : ""
                    } ${styles.optionInputBox} ${
                      selectedOption === index ? styles.whitePlaceholder : ""
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
                    className={`${
                      selectedOption === index ? styles.selectedStyle : ""
                    } ${styles.optionInputBox} ${
                      selectedOption === index ? styles.whitePlaceholder : ""
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
            <button
              type="button"
              className={`${styles.optionInputBox} `}
              onClick={() => handleAddButtonClick("addOption")}
            >
              Add Option
            </button>
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
            onClick={hideCreateQuizCard}
          >
            Cancel
          </button>
          <button type="submit" className={styles.createBtn}>
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionPage;
