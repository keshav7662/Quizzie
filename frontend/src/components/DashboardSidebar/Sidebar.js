import React from 'react';
import styles from './sidebar.module.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({selectedButton,handleButtonClick}) => {
  
  const buttonNames = ['Dashboard', 'Analytics', 'CreateQuiz'];
  
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
            onClick={() => handleButtonClick(buttonName)}
          >
            {buttonName}
          </button>
        ))}
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;