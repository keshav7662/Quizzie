import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/DashboardSidebar/Sidebar';
import styles from './dashboardPage.module.css';
import QuizStatCard from '../../components/DashboardCards/quizStats/QuizStatCard';
import TrendingStatCard from '../../components/DashboardCards/trendingStats/TrendingStatCard';
import AnalysisPage from '../Analysis/AnalysisPage';
import SweetAlert from '../../components/SweetAlert/SweetAlert';
import CreateQuizCard from '../../components/CreateQuizCard/CreateQuizCard';
import AddQuestionPage from '../AddQuestion/AddQuestionPage';
import QuizLinkPage from '../QuizLink/QuizLinkPage';
import QuizwiseAnalysisPage from '../QuizwiseAnalysis/QuizwiseAnalysisPage';
import { getAllQuizzes } from '../../services/QuizService'

const DashboardPage = () => {
  const [selectedButton, setSelectedButton] = useState('Dashboard');
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showPublishPage, setShowPublishPage] = useState(false);
  const [showQuizwiseAnalysisPage, setShowQuizwiseAnalysisPage] = useState(false);
  const [receivedQuizId, setReceivedQuizId] = useState();
  const [receivedQuizType, setReceivedQuizType] = useState();
  const [updateBtn, setUpdateBtn] = useState(false);
  const [data, setData] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [totalImpression, setTotalImpression] = useState(0);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getQuizData = async () => {
      setLoading(true)
      const response = await getAllQuizzes();
      setData(response.allQuizzes);

      let total = 0;
      let impressions = 0;
      response.allQuizzes.forEach((item) => {
        total += item.questions.length;
        impressions += item.impressions;
      });
      setTotalQuestion(total);
      setTotalImpression(impressions);
      if (response) {
        setLoading(false)
      }
      const filteredData = response.allQuizzes.filter((quiz) => quiz.impressions >= 10);
      filteredData.sort((a, b) => a.impressions - b.impressions);
      setTrendingQuizzes(filteredData);
    };
    getQuizData();
  }, [selectedButton]);

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
    setUpdateBtn(false)
  };

  return (
    <>
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
              updateBtn={updateBtn}
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
          <Sidebar
            selectedButton={selectedButton}
            handleSidebarButtonClick={handleSidebarButtonClick}
            setShowCreateQuiz={setShowCreateQuiz}
            setShowQuizwiseAnalysisPage={setShowQuizwiseAnalysisPage}
          />
        </div>
        {loading ?
          (
            <div className={styles.loaderContainer}><span className={styles.loader}></span></div>
          )
          :
          (


            <div className={styles.quizStatsContainer}>
              <div className={styles.quizStatsSubContainer}>
                {selectedButton === 'Dashboard' ? (
                  <div className={styles.dashboardStats}>
                    <QuizStatCard
                      data={data}
                      totalQuestion={totalQuestion}
                      totalImpression={totalImpression}
                    />
                    <div className={styles.displayCards}>
                      <h1>Trending Quizzes</h1>
                      <div className={styles.trendingCards}>
                        {
                          trendingQuizzes.map((quiz, index) => (
                            <TrendingStatCard
                              key={index}
                              trendingQuizzes={quiz}
                            />
                          ))
                        }
                      </div>
                    </div>
                  </div>
                ) : showQuizwiseAnalysisPage ? (<QuizwiseAnalysisPage receivedQuizId={receivedQuizId} />) : (
                  <AnalysisPage
                    setShowSweetAlert={setShowSweetAlert}
                    confirmDelete={confirmDelete}
                    setConfirmDelete={setConfirmDelete}
                    setShowQuizwiseAnalysisPage={setShowQuizwiseAnalysisPage}
                    setReceivedQuizId={setReceivedQuizId}
                    setShowAddQuestion={setShowAddQuestion}
                    setUpdateBtn={setUpdateBtn}
                  />
                )}
              </div>
            </div>
          )
        }
      </div>



    </>

  );
};

export default DashboardPage;
