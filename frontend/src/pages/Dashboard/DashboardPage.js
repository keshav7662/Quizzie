import React, { useState } from "react";
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import styles from "./dashboardPage.module.css";
import QuizStatCard from "../../components/DashboardCards/quizStats/QuizStatCard";
import TrendingStatCard from "../../components/DashboardCards/trendingStats/TrendingStatCard";
import AnalysisPage from "../Analysis/AnalysisPage";
import SweetAlert from "../../components/SweetAlert/SweetAlert";
const DashboardPage = () => {
  const [selectedButton, setSelectedButton] = useState("Dashboard");
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const cancelDelete = () => {
    setShowSweetAlert(false);
  };
  const hideSweetAlert = () => {
    setShowSweetAlert(false);
  };
  return (
    <div className={styles.dashboard}>
      {showSweetAlert ? (
        <div className={styles.sweetContainer} onClick={hideSweetAlert}>
          <SweetAlert
            setConfirmDelete={setConfirmDelete}
            cancelDelete={cancelDelete}
            setShowSweetAlert = {setShowSweetAlert}
          />
        </div>
      ) : null}
      <div className={styles.sidebarContainer}>
        <Sidebar
          selectedButton={selectedButton}
          handleButtonClick={handleButtonClick}
        />
      </div>
      <div className={styles.quizStatsContainer}>
        <div className={styles.quizStatsSubContainer}>
          {selectedButton === "Dashboard" ? (
            <div className={styles.dashboardStats}>
              <QuizStatCard />
              <div className={styles.displayCards}>
                <h1>Trending Quizzes</h1>
                <div className={styles.trendingCards}>
                  <TrendingStatCard />
                </div>
              </div>
            </div>
          ) : selectedButton === "Analytics" ? (
            <AnalysisPage
              setShowSweetAlert={setShowSweetAlert}
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;