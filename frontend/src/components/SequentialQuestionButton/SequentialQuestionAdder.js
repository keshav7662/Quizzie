import React from 'react';
import styles from './sequentialQuestionAdder.module.css';
import CancelBtn from '../../assets/cancel.svg';

const SequentialQuestionAdder = ({ index, isLast, onCancelClick, switchPrevQuestion, updateBtn }) => {
    const handleCancelClick = () => {
        onCancelClick(index);
    };
    const handlePrevQuestionData = () => {
        switchPrevQuestion(index)
    }
    return (
        <div className={styles.roundButton} onClick={handlePrevQuestionData}>
            <span >{index + 1}</span>
            {updateBtn ?
                ('')
                :
                (isLast && <img src={CancelBtn} alt="" onClick={handleCancelClick} />)}

        </div>
    );
};

export default SequentialQuestionAdder;
