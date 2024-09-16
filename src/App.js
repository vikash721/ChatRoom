import { useState, useRef } from 'react';
import './App.css';
import Login from './Components/Models/Login Model/Login';
import ChatRoom from './Components/Chatroom/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import Cookies from 'universal-cookie';
import FullScreenPage from './Pages/startscreen/LoginPage'; // Adjust import path if necessary

const cookiesInstance = new Cookies(); 

function App() {
  const [isAuth, setIsAuth] = useState(cookiesInstance.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [showLogin, setShowLogin] = useState(false); // New state to handle fullscreen page

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookiesInstance.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const handleGetStarted = () => {
    setShowLogin(true); // Show login page when "Get Started" is clicked
  };

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
    <>
      {room ? (
        <ChatRoom room={room} />
      ) : (
        <div className='room'>
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}

      <div className='sign-out'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
