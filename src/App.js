import React from "react";
import "./App.css";
import Header from "./components/Header";
import { useChat } from "@ai-sdk/react";

/**
 * App component serves as the main entry point for the chat application.
 *
 * It integrates the Header component, displays the chat messages, and provides
 * an input field for users to send messages.
 *
 * The `useChat` hook is used to manage chat state and handle interactions with the API.
 */
function App() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/groq", // API endpoint for handling chat messages
  });

  return (
    <div className="App">
      {/* Header component displays the application title */}
      <Header />

      <main className="main-content">
        {/* Message list section */}
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

        {/* Chat box section for user input */}
        <div className="chat-box">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              // disabled={isLoading} // Uncomment if loading state is implemented
              className="message-input"
            />
            <button
              type="submit"
              // disabled={isLoading || !input.trim()} // Uncomment if loading state is implemented
              className="send-button"
            >
              {/* {isLoading ? "Sending..." : "Send"} // Uncomment if loading state is implemented */}
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
