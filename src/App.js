import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Components/Models/Login Model/Login';
import ChatRoom from './Components/Chatroom/Chat';
import FullScreenPage from './Pages/startscreen/LoginPage';
import DocumentationPage from './Components/Documentations/Documentation';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setIsAuth(false);
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const handleEnterChat = (roomName) => {
    navigate(`/chat/${roomName}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isAuth ? (
            !showLogin ? (
              <FullScreenPage onGetStarted={handleGetStarted} />
            ) : (
              <Login setIsAuth={setIsAuth} />
            )
          ) : (
            <div className='room'>
              <label>Enter Room Name:</label>
              <input id="roomNameInput" />
              <button onClick={() => handleEnterChat(document.getElementById('roomNameInput').value)}>
                Enter Chat
              </button>
            </div>
          )
        }
      />
      <Route path="/chat/:roomName" element={<ChatRoom onSignOut={handleSignOut} />} />
      <Route path="/documentation" element={<DocumentationPage />} />
    </Routes>
  );
}

export default App;
