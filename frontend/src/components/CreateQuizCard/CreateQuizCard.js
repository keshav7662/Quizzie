import React, { useState } from 'react';
import styles from './createQuizCard.module.css';
import { createQuiz } from '../../services/QuizService';

const CreateQuizCard = ({ hideCreateQuizCard, setShowAddQuestion }) => {
    const [newQuiz, setNewQuiz] = useState({
        quizName: '',
        quizType: '',
    });

    const [selectedType, setSelectedType] = useState(null);

    const handleSelectQuizType = (type) => {
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            quizType: type,
        }));
        setSelectedType(type);
    };

    const handleQuizName = (e) => {
        const { name, value } = e.target;
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            [name]: value,
        }));
    };
    const handleCreateQuiz = async () => {
        try {
            const response = await createQuiz(newQuiz);
            if (response) {
                setShowAddQuestion(true);
                hideCreateQuizCard();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDefaultClick = (e) => {
        e.stopPropagation();
    }
    return (
        <div className={styles.createQuizBox} onClick={handleDefaultClick}>
            <input
                type="text"
                placeholder="Quiz Name"
                name="quizName"
                onChange={handleQuizName}
                value={newQuiz.quizName}
            />
            <div className={styles.selectQuizType}>
                <label htmlFor="quizType">Quiz Type </label>
                <button
                    onClick={() => handleSelectQuizType('Q&A')}
                    className={`${styles.defaultStyle} ${selectedType === 'Q&A' ? styles.selectedButton : ''}`}
                >
                    Q & A
                </button>
                <button
                    onClick={() => handleSelectQuizType('poll')}
                    className={`${styles.defaultStyle} ${selectedType === 'poll' ? styles.selectedButton : ''}`}
                >
                    Poll Type
                </button>
            </div>
            <div className={styles.actionBtn}>
                <button className={styles.cancelBtn} onClick={hideCreateQuizCard}>Cancel</button>
                <button className={styles.continueBtn} onClick={handleCreateQuiz}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default CreateQuizCard;
