import React from 'react'
import styles from './trendingStatCard.module.css'
import impressionSvg from '../../../assets/eye.svg'
const TrendingStatCard = () => {
    return (
        <div className={styles.trendingStatsContainer}>
            <div className={styles.quizCount}>
                <h2>Quiz 1</h2>
                <div className={styles.impressionCount}>
                    <p>667</p>
                    <img src={impressionSvg} alt="" />
                </div>
            </div>
            <p className={styles.createdTime}>Created on : 04 Sep, 2023</p>
        </div>
    )
}

export default TrendingStatCard
