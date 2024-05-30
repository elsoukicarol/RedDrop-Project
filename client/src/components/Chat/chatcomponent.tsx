import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addMessage } from '../../store/Slices/ChatSlice';

const Chat: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const dispatch = useDispatch();
  const chatResponses = useSelector((state: RootState) => state.chat.messages);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    try {
      console.log('Sending message:', userInput);
      const response = await axios.post<{ response: string }>('/api/chat', { query: userInput });
      console.log('Received response:', response.data);
      dispatch(addMessage({ role: 'user', content: userInput }));
      dispatch(addMessage({ role: 'bot', content: response.data.response }));
      setUserInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        console.error('Axios error code:', error.code);
        console.error('Axios error response:', error.response);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const styles = {
    chatContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100vh',
      margin: '0 auto',
      border: '1px solid #ccc',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      flexGrow: 1
    },
    chatWindow: {
      flex: 1,
      padding: '10px',
      overflowY: 'auto' as const,
      display: 'flex',
      flexDirection: 'column' as const
    },
    chatMessage: {
      display: 'flex',
      margin: '10px 0'
    },
    userMessage: {
      justifyContent: 'flex-end' as const
    },
    botMessage: {
      justifyContent: 'flex-start' as const
    },
    chatBubble: {
      maxWidth: '70%',
      padding: '10px 15px',
      borderRadius: '20px',
      backgroundColor: '#e0e0e0',
      color: '#333',
      fontSize: '14px'
    },
    userBubble: {
      backgroundColor: '#6200ea',
      color: '#fff',
      borderBottomRightRadius: '0'
    },
    botBubble: {
      backgroundColor: '#fff',
      color: '#333',
      borderBottomLeftRadius: '0'
    },
    chatInputContainer: {
      display: 'flex',
      padding: '10px',
      backgroundColor: '#fff',
      borderTop: '1px solid #ccc'
    },
    chatInput: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      outline: 'none'
    },
    chatSendButton: {
      backgroundColor: '#6200ea',
      border: 'none',
      borderRadius: '50%',
      marginLeft: '10px',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#fff'
    },
    sendIcon: {
      fill: '#fff'
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatWindow}>
        {chatResponses.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.chatMessage,
              ...(msg.role === 'user' ? styles.userMessage : styles.botMessage)
            }}
          >
            <p
              style={{
                ...styles.chatBubble,
                ...(msg.role === 'user' ? styles.userBubble : styles.botBubble)
              }}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div style={styles.chatInputContainer}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type a message here..."
          style={styles.chatInput}
        />
        <button onClick={sendMessage} style={styles.chatSendButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24px"
            height="24px"
            style={styles.sendIcon}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;