import React, { useEffect, useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import styles from './Chat.module.css'; // Import the CSS module
import { useSwipeable } from 'react-swipeable'; // Import the swipeable library

const bannedWords = ['badword1', 'badword2']; // Example banned words list

const ChatRoom = ({ room }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showBranding, setShowBranding] = useState(true); // State for branding visibility
  const [replyingTo, setReplyingTo] = useState(null); // State to manage reply

  const messagesRef = collection(db, 'messages');
  const endOfMessagesRef = useRef(null); // Ref for the end of the messages list

  useEffect(() => {
    // Check local storage for branding visibility preference
    const brandingHidden = localStorage.getItem('brandingHidden') === 'true';
    setShowBranding(!brandingHidden);

    const queryMessages = query(messagesRef, where('room', '==', room), orderBy('createdAt'));

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages); // Update the state with the new messages
    });

    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filterProfanity = (text) => {
    // Replace banned words with asterisks
    const regex = new RegExp(`\\b(${bannedWords.join('|')})\\b`, 'gi');
    return text.replace(regex, '****');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    const filteredMessage = filterProfanity(newMessage);

    await addDoc(messagesRef, {
      text: filteredMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
      // Reply information is not saved to the database
    });

    setNewMessage(''); // Reset the input field
    setReplyingTo(null); // Clear the reply state
  };

  const handleCloseBranding = () => {
    setShowBranding(false);
    localStorage.setItem('brandingHidden', 'true'); // Remember user's choice
  };

  // Swipeable handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      const messageId = eventData.event.currentTarget.dataset.id;
      setReplyingTo(messages.find(msg => msg.id === messageId));
    },
    trackMouse: true,
  });

  return (
    <div className={styles['chat-app']}>
      <div className={styles['header']}>
        <h1>{`Room: ${room.toUpperCase()}`}</h1>
      </div>

      <div className={styles['messages']}>
        {messages.map((message) => (
          <div
            key={message.id}
            data-id={message.id}
            className={`${styles['message']} ${
              message.user === auth.currentUser.displayName ? styles['sent'] : styles['received']
            }`}
            {...swipeHandlers}
          >
            {/* Display username above the message */}
            <div className={styles['username']}>{message.user}</div>
            <div className={styles['message-bubble']}>
              {replyingTo && replyingTo.id === message.id && (
                <div className={styles['reply-info']}>
                  Replying to: {message.text}
                </div>
              )}
              {message.text}
            </div>
          </div>
        ))}
        {/* Ref for scrolling to the bottom */}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles['new-message-form']}>
        <input
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          className={styles['new-message-input']}
          placeholder='Type Your Message Here'
        />
        <button type="submit" className={styles['send-button']}>
          Send
        </button>
      </form>

      {showBranding && (
        <div className={styles['branding']}>
          <span className={styles['branding-text']}>Designed and Developed by Vikash</span>
          <button className={styles['close-button']} onClick={handleCloseBranding}>×</button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
