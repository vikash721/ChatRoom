import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookiesInstance = new Cookies();

const Header = ({ roomName, onCloseBranding, showBranding, onSignOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleInviteOthers = () => {
    if (roomName) {
      const url = `${window.location.origin}/chat/${roomName}`;
      const message = `Chat Room Invitation\nJoin me in this chat room by visiting: ${url}`;

      if (navigator.share) {
        navigator.share({
          title: 'Chat Room Invitation',
          text: message,
          url: url,
        })
        .then(() => console.log('Thanks for sharing!'))
        .catch((error) => console.log('Error sharing:', error));
      } else {
        prompt('Copy this message and share it with others:', message);
      }
    }
  };

  const handleLeaveRoom = () => {
    navigate('/'); // Redirect to the home page or room selection page
  };

  const handleReportBug = () => {
    console.log('Bug report clicked');
  };

  const handleOpenDocumentation = () => {
    navigate('/documentation');
  };

  const handleSignOut = async () => {
    await signOut(auth);
    cookiesInstance.remove('auth-token');
    navigate('/'); // Redirect to the home page after sign-out
  };

  return (
    <div className={styles.header}>
      <h1>{`Room: ${roomName.toUpperCase()}`}</h1>
      {showBranding && (
        <div className={styles['branding']}>
          <span className={styles['branding-text']}>Designed and Developed by Vikash</span>
          <button className={styles['close-button']} onClick={onCloseBranding}>×</button>
        </div>
      )}
      <div className={styles['three-dot-menu']} ref={menuRef}>
        <button className={styles['menu-button']} onClick={toggleMenu}>⋮</button>
        {menuOpen && (
          <ul className={styles['dropdown-menu']}>
            <li onClick={handleInviteOthers}>Invite Others</li>
            <li onClick={handleLeaveRoom}>Leave Room</li>
            <li onClick={handleReportBug}>Report Bug</li>
            <li onClick={handleOpenDocumentation}>Documentation</li>
            <li onClick={handleSignOut}>Sign Out</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
