import React from "react";
import styles from "./questionAnalysis.module.css";

const QuestionAnalysis = ({ questions, questionNo, receivedQuizType }) => {
    return (
        <div className={styles.questionDetailsCard}>
            <p className={styles.question}>
                Q. <span>{questionNo}</span> {questions.title} ?
            </p>
            <div className={receivedQuizType === 'Q&A' ? styles.qaCardContainer : styles.pollCardContainer}>
                <div>
                    <p>{questions.attempts}</p>
                    <p>{receivedQuizType === 'Q&A' ? 'People Attempted Question' : 'Option 1'}</p>
                </div>
                <div>
                    <p>{questions.correctAnswers}</p>
                    <p>{receivedQuizType === 'Q&A' ? 'People Answered Correctly' : 'Option 2'}</p>
                </div>
                <div>
                    <p>{questions.incorrectAnswers}</p>
                    <p>{receivedQuizType === 'Q&A' ? 'People Answered Incorrectly' : 'Option 3'}</p>
                </div>
                {receivedQuizType !== "Q&A" ? (
                    <div >
                        <p>{questions.incorrectAnswers}</p>
                        <p>
                            {receivedQuizType === "Q&A"
                                ? "People Answered Incorrectly"
                                : "Option 4"}
                        </p>
                    </div>
                ) : null}
            </div>
            <hr />
        </div>
    );
};

export default QuestionAnalysis;