import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import ChatBox from "./components/ChatBox";
import { useChat } from "@ai-sdk/react";
import { v4 as uuidv4 } from "uuid"; // You'll need to install this: npm install uuid

/**
 * App component serves as the main entry point for the chat application.
 * Now includes an initial greeting message from the AI assistant.
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
  });

  // State for our custom messages that will include the initial greeting
  const [messages, setMessages] = useState([]);

  // Initialize with a greeting message when the component mounts
  useEffect(() => {
    // Only add the initial message if there are no messages yet
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          text: "Hello World! How are you?",
          sender: "assistant",
        },
      ]);
    }
  }, [messages.length]);

  // Sync messages from the API
  useEffect(() => {
    if (apiMessages.length > 0) {
      // Convert API messages to our format and append to our state
      // But skip adding them if they're duplicates of what we already have
      const newMessages = apiMessages.map((msg) => ({
        id: msg.id,
        text: msg.content,
        sender: msg.role,
      }));

      // Filter out the initial message from our newMessages if it exists
      const filteredNewMessages = newMessages.filter(
        (newMsg) =>
          !messages.some(
            (existingMsg) =>
              existingMsg.sender === "assistant" &&
              existingMsg.text === "Hello World! How are you?"
          )
      );

      if (filteredNewMessages.length > 0) {
        setMessages((prev) => [...prev, ...filteredNewMessages]);
      }
    }
  }, [apiMessages, messages]);

  // Handle sending a message through the API
  const sendMessage = (text) => {
    if (text.trim()) {
      // Add user message to our state
      const userMessage = {
        id: uuidv4(),
        text: text,
        sender: "user",
      };
      setMessages((prev) => [...prev, userMessage]);

      // Submit to API
      handleSubmit({ preventDefault: () => {} });
    }
  };

  return (
    <div className="App">
      {/* Header component displays the application title */}
      <Header />

      <main className="main-content">
        {/* Message list component displays the chat history */}
        <MessageList messages={messages} />

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
