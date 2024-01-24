import React, { useState } from 'react';
import Sidebar from '../../components/DashboardSidebar/Sidebar';
import styles from './dashboardPage.module.css';
import QuizStatCard from '../../components/DashboardCards/quizStats/QuizStatCard';
import TrendingStatCard from '../../components/DashboardCards/trendingStats/TrendingStatCard';

const DashboardPage = () => {

  const [selectedButton, setSelectedButton] = useState('Dashboard');

  const handleSidebarButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebarContainer}>
        <Sidebar selectedButton={selectedButton} handleSidebarButtonClick={handleSidebarButtonClick} />
      </div>
      <div className={styles.quizStatsContainer}>
        <div className={styles.quizStatsSubContainer}>
          {selectedButton === 'Dashboard' ? (
            <div className={styles.dashboardStats}>
              <QuizStatCard />
              <div className={styles.displayCards}>
                <h1>Trending Quizzes</h1>
                <div className={styles.trendingCards}>
                  <TrendingStatCard />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
