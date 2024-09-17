// App.js
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Models/Login Model/Login';
import ChatRoom from './Components/Chatroom/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Cookies from 'universal-cookie';
import FullScreenPage from './Pages/startscreen/LoginPage';
import DocumentationPage from './Components/Documentations/Documentation';

const cookiesInstance = new Cookies(); 

function App() {
  const [isAuth, setIsAuth] = useState(cookiesInstance.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for three-dot menu
  const navigate = useNavigate(); // Hook to navigate programmatically

  const roomInputRef = useRef(null);
  const menuRef = useRef(null); // Reference to the menu container

  const signUserOut = async () => {
    await signOut(auth);
    cookiesInstance.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle dropdown menu visibility
  };

  const handleInviteOthers = () => {
    if (room) {
      const url = `${window.location.origin}`; // Use origin to get the base URL of the app
      const message = `Chat Room Invitation\nJoin me in this chat room by visiting: ${url} and entering the room name: ${room}`;
  
      // Check if the Web Share API is supported
      if (navigator.share) {
        navigator.share({
          title: 'Chat Room Invitation',
          text: message, // Full message with URL and room name
          url: url, // Base URL of the app
        })
        .then(() => console.log('Thanks for sharing!'))
        .catch((error) => console.log('Error sharing:', error));
      } else {
        // Fallback for browsers that do not support Web Share API
        prompt('Copy this message and share it with others:', message);
      }
    }
  };
  
  const handleLeaveRoom = () => {
    setRoom(null);
  };

  const handleDocumentation = () => {
    navigate('/documentation'); // Navigate to DocumentationPage
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

  if (!showLogin && !isAuth) {
    return <FullScreenPage onGetStarted={handleGetStarted} />;
  }

  if (!isAuth && showLogin) {
    return (
      <div>
        <Login setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <div className="three-dot-menu-container"> {/* Wrapper for relative positioning */}
          {room ? (
            <>
              <ChatRoom room={room} />
              <div className="three-dot-menu" ref={menuRef}> {/* Add ref to the menu container */}
                <button className="menu-button" onClick={toggleMenu}>⋮</button>
                {menuOpen && (
                  <ul className="dropdown-menu">
                    <li onClick={handleInviteOthers}>Invite Others</li>
                    <li onClick={handleLeaveRoom}>Leave Room</li>
                    <li>Report Bug</li>
                    <li onClick={handleDocumentation}>Documentation</li>
                    <li onClick={signUserOut}>Sign Out</li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <div className='room'>
              <label>Enter Room Name:</label>
              <input ref={roomInputRef} />
              <button onClick={() => setRoom(roomInputRef.current.value)}>
                Enter Chat
              </button>
            </div>
          )}
        </div>
      } />
      <Route path="/documentation" element={<DocumentationPage />} />
    </Routes>
  );
}

export default App;
