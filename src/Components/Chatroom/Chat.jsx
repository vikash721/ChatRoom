import React, { useEffect, useState, useRef } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import styles from './Chat.module.css';
import { useSwipeable } from 'react-swipeable';
import Header from '../Headers/Header';
import { useParams } from 'react-router-dom';

const bannedWords = ['badword1', 'badword2'];

const ChatRoom = ({ onSignOut }) => {
  const { roomName } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showBranding, setShowBranding] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);

  const messagesRef = collection(db, 'messages');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const brandingHidden = localStorage.getItem('brandingHidden') === 'true';
    setShowBranding(!brandingHidden);

    const queryMessages = query(messagesRef, where('room', '==', roomName), orderBy('createdAt'));

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [roomName]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filterProfanity = (text) => {
    const regex = new RegExp(`\\b(${bannedWords.join('|')})\\b`, 'gi');
    return text.replace(regex, '****');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    const filteredMessage = filterProfanity(newMessage);
    const currentUser = auth.currentUser;

    await addDoc(messagesRef, {
      text: filteredMessage,
      createdAt: serverTimestamp(),
      user: currentUser ? currentUser.displayName : 'Anonymous',
      room: roomName,
    });

    setNewMessage('');
    setReplyingTo(null);
  };

  const handleCloseBranding = () => {
    setShowBranding(false);
    localStorage.setItem('brandingHidden', 'true');
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      const messageId = eventData.event.currentTarget.dataset.id;
      setReplyingTo(messages.find(msg => msg.id === messageId));
    },
    trackMouse: true,
  });

  return (
    <div className={styles['chat-app']}>
      <Header roomName={roomName} onCloseBranding={handleCloseBranding} showBranding={showBranding} />

      <div className={styles['messages']}>
        {messages.map((message) => (
          <div
            key={message.id}
            data-id={message.id}
            className={`${styles['message']} ${
              message.user === (auth.currentUser ? auth.currentUser.displayName : 'Anonymous') ? styles['sent'] : styles['received']
            }`}
            {...swipeHandlers}
          >
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
    </div>
  );
};

export default ChatRoom;
