import React from 'react';
import styles from './LoginPage.module.css'; // Adjust import path if necessary

const FullScreenPage = ({ onGetStarted }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>CHAT ROOM</h1>
      </div>
      <button className={styles.getStartedButton} onClick={onGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default FullScreenPage;
