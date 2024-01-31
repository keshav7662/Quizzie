import React from 'react'
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from './quizLinkPage.module.css'

const QuizLinkPage = ({ hideCreateQuizCard, receivedQuizId }) => {
    const linkForQuiz = `${process.env.REACT_APP_QUIZ_PUBLISH_URL}/quiz-interface/${receivedQuizId}`;
    const handleCopyLink = () => {
        toast.success('Link copied to clipboard!')
    }
    return (
        <div className={styles.publishPageContainer} onClick={(e) => e.stopPropagation()}>
            <h1>Congrats your Quiz is Published!</h1>
            <input type="text" placeholder='Your Link is here' value={linkForQuiz} />
            <div className={styles.shareBtn}>
                <CopyToClipboard text={linkForQuiz} onCopy={handleCopyLink}>
                    <button>Share</button>
                </CopyToClipboard>
            </div>

        </div>
    )
}

export default QuizLinkPage
