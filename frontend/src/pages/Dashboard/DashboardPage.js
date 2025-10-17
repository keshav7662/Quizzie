import React from 'react'
import styles from './dashboardPage.module.css'
import QuizStatCard from '../../components/DashboardCards/quizStats/QuizStatCard'
import TrendingStatCard from '../../components/DashboardCards/trendingStats/TrendingStatCard';
const DashboardPage = () => {
  const statsData = [
    {
      id: 1,
      name: 'Total Quizzes',
      value: 24,
      color: 'orange'
    },
    {
      id: 2,
      name: 'Questions Created',
      value: 156,
      color: 'green'
    },
    {
      id: 3,
      name: 'Total Impressions',
      value: 12847,
      color: 'lightblue'
    }
  ];
  return (
    <div className={styles.dashboardPage}>
      <div className={styles.cardContainer}>
        {
          statsData.map((stat) => (
            <QuizStatCard key={stat.id} name={stat.name} value={stat.value} color={stat.color} />
          ))
        }
      </div>
      <h1 className={styles.title}>Trending Quizzes</h1>
      <div className={styles.trendingCardContainer}>
        <TrendingStatCard />
        <TrendingStatCard />
        <TrendingStatCard />
        <TrendingStatCard />
        <TrendingStatCard />
        <TrendingStatCard />
        <TrendingStatCard />
      </div>
    </div>
  )
}

export default DashboardPage