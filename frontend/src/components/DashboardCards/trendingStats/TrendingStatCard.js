import React from 'react'
import styles from './trendingStatCard.module.css'

const TrendingStatCard = () => {
    return (
        <div className={styles.trendingStatsContainer}>
            <div className={styles.quizCount}>
                <h2>Quiz 1</h2>
                <p>667 👁️</p>
            </div>
            <p className={styles.createdTime}>Created on : 04 Sep, 2023</p>
        </div>
    )
}

export default TrendingStatCard
