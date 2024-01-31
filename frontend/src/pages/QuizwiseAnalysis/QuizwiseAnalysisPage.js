import React, { useEffect, useState } from "react";
import styles from "./quizwiseAnalysisPage.module.css";
import { getQuizById } from "../../services/QuizService";
import { formatTime } from "../../utils/TimeFormatter";
import QuestionAnalysis from "../../components/QuestionAnalysis/QuestionAnalysis";

const QuizwiseAnalysisPage = ({ receivedQuizId }) => {
    const [createdAt, setCreatedAt] = useState();
    const [impression, setImpression] = useState();
    const [quizTitle, setQuizTitle] = useState();
    const [question, setQuestion] = useState([]);
    const [receivedQuizType, setReceivedQuizType] = useState()

    useEffect(() => {
        const getQuizAnalysisDetails = async () => {
            try {
                const response = await getQuizById(receivedQuizId);
                setReceivedQuizType(response.requiredQuiz.quizType);
                setCreatedAt(formatTime(response.requiredQuiz.createdAt));
                setImpression(response.requiredQuiz.impressions);
                setQuizTitle(response.requiredQuiz.quizName);
                setQuestion(response.requiredQuiz.questions || []);
            } catch (error) {
                console.log(error);
            }
        };

        if (receivedQuizId) {
            getQuizAnalysisDetails();
        }
    }, [receivedQuizId]);
    return (
        <div className={styles.detailAnalysisPage}>
            <div className={styles.analysisHead}>
                <h1>{quizTitle} Question Analysis</h1>
                <div>
                    <p>
                        Created On: <span>{createdAt}</span>
                    </p>
                    <p>
                        Impressions: <span>{impression}</span>
                    </p>
                </div>
            </div>
            <div className={styles.questionContainer}>
                {question.map((questions, index) => (
                    <QuestionAnalysis
                        questions={questions}
                        key={index}
                        questionNo={index + 1}
                        receivedQuizType={receivedQuizType}
                    />
                ))}
            </div>
        </div>
    );
};

export default QuizwiseAnalysisPage;