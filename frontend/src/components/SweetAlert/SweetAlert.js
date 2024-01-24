import React from "react";
import styles from "./sweetAlert.module.css";

const SweetAlert = ({ setConfirmDelete, cancelDelete, setShowSweetAlert }) => {
    const handleSweetAlertState = (e) => {
        e.stopPropagation();
    };
    return (
        <div className={styles.sweetAlertCard} onClick={handleSweetAlertState}>
            <div className={styles.sweetAlertText}>
                Are you sure you want to delete?
            </div>
            <div className={styles.sweetAlertButtons}>
                <div>
                    <button
                        className={styles.deleteButton}
                        onClick={() => {
                            setConfirmDelete(true);
                            setShowSweetAlert(false);
                        }}
                    >
                        Confirm Delete
                    </button>
                </div>
                <div>
                    <button
                        className={styles.cancelButton}
                        onClick={() => {
                            cancelDelete();
                            setShowSweetAlert(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SweetAlert;