import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from './quizLinkPage.module.css'
const QUIZ_URL = `${process.env.REACT_APP_QUIZ_PUBLISH_URL}/quiz-interface`
const QuizLinkPage = ({ hideCreateQuizCard, receivedQuizId }) => {
    const [linkForQuiz, setLinkForQuiz] = useState(`${QUIZ_URL}/${receivedQuizId}`);

    return (
        <div className={styles.publishPageContainer} onClick={(e) => e.stopPropagation()}>
            <h1>Congrats your Quiz is Published!</h1>
            <input type="text" placeholder='Your Link is here' value={linkForQuiz} />
            <div className={styles.shareBtn}>
                <CopyToClipboard text={linkForQuiz} onCopy={() => toast.success('Link copied to clipboard!')}>
                    <button>Share</button>
                </CopyToClipboard>
            </div>

        </div>
    )
}

export default QuizLinkPage
