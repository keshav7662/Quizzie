import React, { useState } from 'react';
import Sidebar from '../../components/DashboardSidebar/Sidebar';
import styles from './dashboardPage.module.css';
import QuizStatCard from '../../components/DashboardCards/quizStats/QuizStatCard';
import TrendingStatCard from '../../components/DashboardCards/trendingStats/TrendingStatCard';
import AnalysisPage from '../Analysis/AnalysisPage';
import SweetAlert from '../../components/SweetAlert/SweetAlert';
import CreateQuizCard from '../../components/CreateQuizCard/CreateQuizCard';
import AddQuestionPage from '../AddQuestion/AddQuestionPage';
import QuizLinkPage from '../QuizLink/QuizLinkPage';

const DashboardPage = () => {
  const [selectedButton, setSelectedButton] = useState('Dashboard');
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showPublishPage, setShowPublishPage] = useState(false);
  const [receivedQuizId, setReceivedQuizId] = useState();
  const [receivedQuizType,setReceivedQuizType] = useState();

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
    setShowPublishPage(false)
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
          <CreateQuizCard
            hideCreateQuizCard={hideCreateQuizCard}
            setShowCreateQuiz={setShowCreateQuiz}
            setShowAddQuestion={setShowAddQuestion}
            setRecievedQuizId={setReceivedQuizId}
            setReceivedQuizType={setReceivedQuizType}
          />
        </div>
      ) : showAddQuestion ?
        (<div className={styles.createQuizContainer} onClick={hideCreateQuizCard}>
          <AddQuestionPage
            hideCreateQuizCard={hideCreateQuizCard}
            setShowAddQuestion={setShowAddQuestion}
            setShowPublishPage={setShowPublishPage}
            receivedQuizId={receivedQuizId}
            receivedQuizType={receivedQuizType}
          />
        </div>) : showPublishPage ? (
          <div className={styles.createQuizContainer} onClick={hideCreateQuizCard}>
            <QuizLinkPage 
              hideCreateQuizCard={hideCreateQuizCard}
              receivedQuizId={receivedQuizId}
            />
          </div>
        ) : null
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
