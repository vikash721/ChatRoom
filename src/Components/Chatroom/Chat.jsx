import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import styles from './Chat.module.css'; // Import the CSS module

const ChatRoom = ({ room }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, 'messages');

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage(''); // Reset the input field
  };

  return (
    <div className={styles['chat-app']}>
      <div className={styles['header']}>
        <h1>{`Room: ${room.toUpperCase()}`}</h1>
      </div>

      <div className={styles['messages']}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles['message']} ${
              message.user === auth.currentUser.displayName ? styles['sent'] : styles['received']
            }`}
          >
            {/* Display username above the message */}
            <div className={styles['username']}>{message.user}</div>
            <div className={styles['message-bubble']}>{message.text}</div>
          </div>
        ))}
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
{}