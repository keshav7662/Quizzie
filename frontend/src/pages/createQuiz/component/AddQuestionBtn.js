import React from 'react'
import styles from './addQuestionBtn.module.css'
import { X } from 'lucide-react'
const AddQuestionBtn = ({num}) => {
  return (
    <div className={styles.roundedBtn}>
      <span>{num}</span>
      <X className={styles.closeIcon} size={18} />
    </div>
  )
}

export default AddQuestionBtn