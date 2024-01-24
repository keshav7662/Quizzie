import React, { useState } from 'react';
import Sidebar from '../../components/DashboardSidebar/Sidebar';
import styles from './dashboardPage.module.css';
import QuizStatCard from '../../components/DashboardCards/quizStats/QuizStatCard';
import TrendingStatCard from '../../components/DashboardCards/trendingStats/TrendingStatCard';
import AnalysisPage from '../Analysis/AnalysisPage';
import SweetAlert from '../../components/SweetAlert/SweetAlert';
import CreateQuizCard from '../../components/CreateQuizCard/CreateQuizCard';
import AddQuiz from '../../components/AddQuiz';

const DashboardPage = () => {
  const [selectedButton, setSelectedButton] = useState('Dashboard');
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const handleSidebarButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const cancelDelete = () => {
    setShowSweetAlert(false);
  };

  const hideSweetAlert = () => {
    setShowSweetAlert(false);
  };

  const hideCreateQuizCard = () => {
    setShowCreateQuiz(false);
    setShowAddQuestion(false)
  };

  return (
    <div className={styles.dashboard}>
      {showSweetAlert && (
        <div className={styles.sweetContainer} onClick={hideSweetAlert}>
          <SweetAlert setConfirmDelete={setConfirmDelete} cancelDelete={cancelDelete} setShowSweetAlert={setShowSweetAlert} />
        </div>
      )}

      {showCreateQuiz ? (
        <div className={styles.createQuizContainer} onClick={hideCreateQuizCard}>
          <CreateQuizCard hideCreateQuizCard={hideCreateQuizCard} setShowAddQuestion={setShowAddQuestion} />
        </div>
      ) : showAddQuestion ? (<div className={styles.createQuizContainer} onClick={hideCreateQuizCard}>
        <AddQuiz hideCreateQuizCard={hideCreateQuizCard} setShowAddQuestion={setShowAddQuestion} />
      </div>) : null
      }
      <div className={styles.sidebarContainer}>
        <Sidebar selectedButton={selectedButton} handleSidebarButtonClick={handleSidebarButtonClick} setShowCreateQuiz={setShowCreateQuiz} />
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
          ) : (
            <AnalysisPage setShowSweetAlert={setShowSweetAlert} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
