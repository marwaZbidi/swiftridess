"use client"
import React, { useState, useEffect } from 'react';
import './Clifford.css';

const Clifford: React.FC = () => {
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<{ type: string; message: string }[]>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);

  const handleAskQuestion = () => {
    if (userQuestion.trim() !== '') {
      setIsBotTyping(true);
      setTimeout(() => {
        const newUserMessage = { type: 'user', message: userQuestion };
        setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
        setIsBotTyping(false);
        setTimeout(() => {
          const newBotMessage = { type: 'bot', message: getBotResponse(userQuestion) };
          setChatMessages(prevMessages => [...prevMessages, newBotMessage]);
        }, 1000); 
      }, 2000); 
      setUserQuestion('');
    }
  };

  const getBotResponse = (question: string): string => {
    const faq: { [key: string]: string } = {
      'Hey': 'Hello There, How can i help you?',
      'What is your name?': 'My name is Clifford and i am a chatbot.',
      'what can you do ?': 'I can help you with your questions.',
      'who made you ?': 'SwiftRides Made Me To Help Answer Your Questions.',
      'I Have A Company Can You Tell Me About Your Memberships and their Perks ?': 'Yes Sure If You Have A Company We Have 3 Tiers Of Memberships For You Here Are The Perks Of Each Tier Basic Tier: Listing up to 5 vehicles for Rent-Standard visibility in search results-Basic customer support we also have a Premium Tier here are the perks :Listing up to 15 vehicles for Rent.-Featured placement in search results-Enhanced visibility with a premium badge-Priority customer support-Monthly analytics report on listing performance',
    };
    return faq[question] || "I'm sorry, I don't have an answer to that question.";
  };

  useEffect(() => {
    const chatBox = document.querySelector('.chat-box') as HTMLElement;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, [chatMessages]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chatMessages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}>
            <div className="message-title">{message.type === 'user' ? 'You' : 'Chatbot'}</div>
            <div className="message-content">{message.message}</div>
          </div>
        ))}
        {isBotTyping && (
          <div className="chat-message bot-message">
            <div className="message-title">Chatbot</div>
            <div className="message-content">Bot is typing...</div>
          </div>
        )}
      </div>
      <div className="user-input">
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleAskQuestion}>Send</button>
      </div>
    </div>
  );
};

export default Clifford;
