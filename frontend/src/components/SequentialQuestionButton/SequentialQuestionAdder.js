import React from 'react';
import styles from './sequentialQuestionAdder.module.css';
import CancelBtn from '../../assets/cancel.svg';

const SequentialQuestionAdder = ({ index, isLast, onCancelClick }) => {
    const handleCancelClick = () => {
        onCancelClick(index);
    };
    return (
        <div className={styles.roundButton}>
            <span>{index + 1}</span>
            {isLast && <img src={CancelBtn} alt="" onClick={handleCancelClick} />}
        </div>
    );
};

export default SequentialQuestionAdder;
