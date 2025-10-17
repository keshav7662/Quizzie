import React from 'react';
import styles from './sidebar.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navMenu = [
    { id: 1, name: 'Dashboard', path: '/dashboard' },
    { id: 2, name: 'Analytics', path: '/analytics' },
    { id: 3, name: 'Create Quiz', path: '/create' },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
    <div className={styles.sidebar}>
      <h1 className={styles.sidebarTitle}>QUIZZIE</h1>
      <div className={styles.navigateBtn}>
        {navMenu.map((menu) => (
          <NavLink
            to={menu.path}
            key={menu.id}
            className={({ isActive }) => (isActive ? styles.selectedButton : "")}
          >
            {menu.name}
          </NavLink>
        ))}
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;
