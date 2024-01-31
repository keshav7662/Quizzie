import React from "react";
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import shareIcon from '../../assets/share.svg'
import styles from "./analysisRow.module.css";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
const AnalysisRow = ({
    item,
    index,
    className,
    deleteAnalytics,
    setShowSweetAlert,
    setShowQuizwiseAnalysisPage,
    setReceivedQuizId,
    setShowAddQuestion,
    setUpdateBtn,
}) => {
    const linkForQuiz = `${process.env.REACT_APP_QUIZ_PUBLISH_URL}/quiz-interface/${item._id}`;

    const deleteById = (id) => {
        setShowSweetAlert(true);
        deleteAnalytics(id);
    };
    const getAnalysisData = (item) => {
        setReceivedQuizId(item._id)
        setShowQuizwiseAnalysisPage(true)
    };
    const shareLink = () => {
        toast.success('Link copied to clipboard!');
    };

    return (
        <>
            <tr className={`${styles.quizRow} ${className}`}>
                <td>{index}</td>
                <td>{item.quizName}</td>
                <td>{item.createdAt}</td>
                <td>{item.impressions}</td>
                <td className={styles.iconCell}>
                    <img src={editIcon} alt="Edit" onClick={() => {
                        setShowAddQuestion(true);
                        setReceivedQuizId(item._id)
                        setUpdateBtn(true)
                    }} />
                    <img src={deleteIcon} alt="Delete" onClick={() => deleteById(item._id)} />

                    <CopyToClipboard text={linkForQuiz} onCopy={shareLink}>
                        <img src={shareIcon} alt="Share" />
                    </CopyToClipboard>
                </td>
                <td
                    className={styles.analysisToReview}
                    onClick={() => {
                        getAnalysisData(item);
                    }}
                >
                    Quiz Wise Analysis
                </td>
            </tr>
        </>
    );
};

export default AnalysisRow;