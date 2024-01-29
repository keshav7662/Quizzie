import React from 'react'
import styles from './timer.module.css'
const Timer = ({ addQuestionData, handleTimer }) => {
    const Timer = ['OFF', '5 Sec', '10 Sec']
    const initialTimerState = 'OFF'
    return (
        <div className={styles.setTimerBox}>
            <span>Timer</span>
            {
                Timer.map((time, index) => (
                    <button type='button' className={`${addQuestionData.timer === time ? styles.selectedTimerStyle : addQuestionData.timer ? '' : time === initialTimerState ? styles.selectedTimerStyle : ''} ${styles.timerButtons}`} key={index} onClick={() => handleTimer(index, time)}>{time}</button>
                ))
            }
        </div>
    )
}

export default Timer
