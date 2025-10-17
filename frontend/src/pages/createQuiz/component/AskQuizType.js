import { useState } from 'react'
import styles from './askQuizType.module.css'

const AskQuizType = ({ setQuizType, handleFormClose, setQuizName, goNext }) => {

  const [selectedType, setSelectedType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    goNext();
    setQuizType(selectedType);
  }
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <form className={styles.createQuizBoxForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Name"
          name="quizName"
          required
          onChange={(e) => setQuizName(e.target.value)}
        />
        <div className={styles.selectQuizType}>
          <label htmlFor="quizType">Quiz Type </label>
          <button type='button' className={`${styles.defaultStyle} ${selectedType === 'qna' ? styles.selectedBtn : ''}`}
            onClick={() => setSelectedType("qna")}>
            Q & A
          </button>
          <button type='button' className={`${styles.defaultStyle} ${selectedType === 'poll' ? styles.selectedBtn : ''}`}
            onClick={() => setSelectedType("poll")}>
            Poll Type
          </button>
        </div>
        <div className={styles.actionBtn}>
          <button type='button' className={styles.cancelBtn} onClick={() => handleFormClose()}>Cancel</button>
          <button type='submit' className={styles.continueBtn}>Continue</button>
        </div>
      </form>
    </div>
  )
}

export default AskQuizType