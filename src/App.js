import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import ChatBox from "./components/ChatBox";
import { useChat } from "@ai-sdk/react";
import { v4 as uuidv4 } from "uuid";

/**
 * App component serves as the main entry point for the chat application.
 * Includes an initial greeting message from the AI assistant.
 */
function App() {
  const {
    messages: apiMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/groq", // API endpoint for handling chat messages
    initialMessages: [
      {
        id: uuidv4(),
        content: "Hello World! How are you?",
        role: "assistant",
      },
    ],
  });

  // Convert API messages to our display format
  const displayMessages = apiMessages.map((msg) => ({
    id: msg.id || uuidv4(),
    text: msg.content,
    sender: msg.role,
  }));

  // Handle sending a message through the API
  const sendMessage = (text) => {
    if (text.trim()) {
      // Submit to API - this will add the user message to apiMessages as well
      handleSubmit(text);
    }
  };

  return (
    <div className="App">
      {/* Header component displays the application title */}
      <Header />

      <main className="main-content">
        {/* Message list component displays the chat history */}
        <MessageList messages={displayMessages} />

        {/* Chat box component for user input */}
        <ChatBox
          onSendMessage={sendMessage}
          value={input}
          onChange={handleInputChange}
          loading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
