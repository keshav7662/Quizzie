import React from 'react';
import styles from './addQuestionBtn.module.css'
import AddBtn from '../../assets/add.svg';

const AddQuestionBtn = ({ onClick, count }) => {
    return (
        <div className={styles.addQuestionBtn} onClick={onClick} >
            {
                count < 5 ? <img src={AddBtn} alt="" /> : null
            }
        </div>
    );
};

export default AddQuestionBtn;
