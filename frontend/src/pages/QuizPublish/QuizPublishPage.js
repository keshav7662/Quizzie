import React from 'react'
import styles from './quizPublishPage.module.css'
const QuizPublishPage = ({ hideCreateQuizCard }) => {
    return (
        <div className={styles.publishPageContainer} onClick={(e) => e.stopPropagation()}>
            <h1>Congrats your Quiz is Published!</h1>
            <input type="text" placeholder='Your link is here!' />
            <div className={styles.shareBtn}>
                <button>Share</button>
            </div>

        </div>
    )
}

export default QuizPublishPage
