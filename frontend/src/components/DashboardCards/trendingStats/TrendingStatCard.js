import React from 'react'
import styles from './trendingStatCard.module.css'
import impressionSvg from '../../../assets/eye.svg'
import { formatTime } from '../../../utils/TimeFormatter'

const TrendingStatCard = ({ trendingQuizzes }) => {
    return (
        <div className={styles.trendingStatsContainer}>
            <div className={styles.quizCount}>
                <h2>{trendingQuizzes.quizName}</h2>
                <div className={styles.impressionCount}>
                    <p>{trendingQuizzes.impressions}</p>
                    <img src={impressionSvg} alt="" />
                </div>
            </div>
            <p className={styles.createdTime}>{`Created on : ${formatTime(trendingQuizzes.createdAt)}`}</p>
        </div>
    )
}

export default TrendingStatCard
