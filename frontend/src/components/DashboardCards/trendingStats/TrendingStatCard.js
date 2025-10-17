import React from 'react'
import styles from './trendingStatCard.module.css'
import impressionSvg from '../../../assets/eye.svg'
import { formatTime } from '../../../utils/TimeFormatter'

const TrendingStatCard = ({ trendingQuizzes }) => {
    return (
        <div className={styles.trendingStatsCard}>
            <div className={styles.quizCount}>
                <h2 className={styles.trendingQuizTitle}>My Quiz</h2>
                <div className={styles.impressionCount}>
                    <p>200</p>
                    <img src={impressionSvg} alt="" />
                </div>
            </div>
            <p className={styles.createdTime}>{`Created on : ${'22-04-2024'}`}</p>
        </div>
    )
}

export default TrendingStatCard
