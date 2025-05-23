import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { useChat } from "@ai-sdk/react";

function App() {
  // const { messages, input, handleInputChange, handleSubmit, isLoading } =
  //   useChat({
  //     api: "/api/groq",
  //   });
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/groq",
    initialMessages: [
      {
        id: "initial-groq-message",
        role: "assistant",
        content: "Hello World! How are you today?",
      },
    ],
  });

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="message-list">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.role}-message`}
              >
                <div className="message-content">
                  <p>{message.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="chat-box">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              // disabled={isLoading}
              className="message-input"
            />
            <button
              type="submit"
              // disabled={isLoading || !input.trim()}
              className="send-button"
            >
              {/* {isLoading ? "Sending..." : "Send"} */}
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
