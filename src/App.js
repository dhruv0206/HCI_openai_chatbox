import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import MessageList from "./components/MessageList";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = { id: Date.now(), text: message, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setLoading(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add assistant response to chat
        const assistantMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: "assistant",
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } else {
        throw new Error(data.error || "Error getting response");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your request.",
        sender: "system",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <MessageList messages={messages} />
        <ChatBox onSendMessage={handleSendMessage} loading={loading} />
      </main>
    </div>
  );
}

export default App;
