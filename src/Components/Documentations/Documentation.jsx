import React from 'react';
import styles from './Documentation.module.css'; // Import CSS module for styling

const DocumentationPage = () => {
  return (
    <div className={styles['container']}>
      <header className={styles['header']}>
        <h1>Documentation</h1>
        <p>Your guide to using the chat application effectively.</p>
      </header>
      
      <section className={styles['section']}>
        <h2>Introduction</h2>
        <p>Welcome to the documentation for our chat application. This guide provides all the information you need to understand and use the application effectively.</p>
        <p>Our chat application allows users to join chat rooms, interact in real-time, and manage their user settings. This documentation will cover all the key features and provide instructions on how to use the application.</p>
      </section>
      
      <section className={styles['section']}>
        <h2>Features</h2>
        <ul>
          <li><strong>Real-Time Messaging:</strong> Engage in real-time conversations with other users in a chat room.</li>
          <li><strong>User Authentication:</strong> Secure login and sign-out options using Firebase authentication.</li>
          <li><strong>Chat Room Management:</strong> Create, join, and leave chat rooms easily.</li>
          <li><strong>Share Invitations:</strong> Invite others to join a chat room via the Web Share API.</li>
          <li><strong>Responsive Design:</strong> Fully functional on both desktop and mobile devices.</li>
          <li><strong>Dropdown Menu:</strong> Access additional options like 'Report Bug,' 'Documentation,' and 'Sign Out' from a three-dot menu.</li>
        </ul>
      </section>
      
      <section className={styles['section']}>
        <h2>Usage</h2>
        <h3>1. Starting the Application:</h3>
        <p>When you first access the application, you’ll see a full-screen page with a ‘Get Started’ button. Click this button to log in or sign up.</p>
        
        <h3>2. Logging In:</h3>
        <p>Enter your credentials in the login form and submit. Upon successful authentication, you'll be directed to the chat room entry page.</p>
        
        <h3>3. Joining a Chat Room:</h3>
        <p>Enter the desired chat room name and click 'Enter Chat' to join the room.</p>
        
        <h3>4. Using the Chat Room:</h3>
        <p>Once inside the chat room, you can send and receive messages in real-time. Use the dropdown menu to access additional features like inviting others or leaving the room.</p>
        
        <h3>5. Inviting Others:</h3>
        <p>Click on 'Invite Others' from the dropdown menu to share the chat room invitation. The message will be pre-filled with instructions on how to join the room.</p>
        
        <h3>6. Leaving the Room:</h3>
        <p>Click 'Leave Room' from the dropdown menu to exit the current chat room and return to the room entry page.</p>
      </section>
      
      <section className={styles['section']}>
        <h2>FAQ</h2>
        <h3>Q: How do I recover my account if I forget my password?</h3>
        <p>A: Use the password recovery option on the login page to reset your password.</p>
        
        <h3>Q: Can I create multiple chat rooms?</h3>
        <p>A: Yes, you can create and join multiple chat rooms as needed.</p>
        
        <h3>Q: How can I report a bug?</h3>
        <p>A: Use the 'Report Bug' option in the dropdown menu to send feedback about any issues.</p>
      </section>
      
      <section className={styles['section']}>
        <h2>Contact</h2>
        <p>If you have any questions or need further assistance, please contact our support team at support@example.com.</p>
      </section>
      
      <footer className={styles['footer']}>
        <p>© 2024 Chat Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DocumentationPage;
