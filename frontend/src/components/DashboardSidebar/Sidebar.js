import React from 'react';
import styles from './sidebar.module.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ selectedButton, handleSidebarButtonClick, setShowCreateQuiz }) => {

  const buttonNames = ['Dashboard', 'Analytics'];

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/register');
  };

  const getButtonClass = (buttonName) => (
    selectedButton === buttonName ? styles.selectedButton : ''
  );

  return (
    <div className={styles.sidebar} >
      <h1 className={styles.sidebarTitle}>QUEEZIE</h1>
      <div className={styles.navigateBtn}>
        {buttonNames.map((buttonName) => (
          <button
            key={buttonName}
            className={getButtonClass(buttonName)}
            onClick={() => handleSidebarButtonClick(buttonName)}
          >
            {buttonName}
          </button>
        ))}
        <button className={getButtonClass('Create Quiz')} onClick={() => { setShowCreateQuiz(true) }}>Create Quiz</button>
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;
