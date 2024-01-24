import React from "react";
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'
import shareIcon from '../../assets/share.svg'
import styles from "./analysisRow.module.css";

const AnalysisRow = ({
    item,
    index,
    className,
    deleteAnalytics,
    setShowSweetAlert,
}) => {
    const deleteById = (id) => {
        setShowSweetAlert(true);
        deleteAnalytics(id);
    };
    const getAnalysisData = (item) => {
        console.log(item);
    };

    return (
        <>
            <tr className={`${styles.quizRow} ${className}`}>
                <td>{index}</td>
                <td>{item.quizName}</td>
                <td>{item.createdAt}</td>
                <td>{item.impressions}</td>
                <td className={styles.iconCell}>
                    <img src={editIcon} alt="Edit" />
                    <img src={deleteIcon} alt="Delete" onClick={() => deleteById(item._id)} />
                    <img src={shareIcon} alt="Share" />
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