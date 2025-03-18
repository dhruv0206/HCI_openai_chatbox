import React, { useState } from "react";

/**
 * ChatBox component provides an input field for users to type and send messages.
 *
 * It disables the input and button while a message is being sent.
 *
 * @param {Function} onSendMessage - Callback function to handle sending a message.
 * @param {boolean} loading - Indicates whether a message is currently being sent.
 */
function ChatBox({ onSendMessage, loading }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="chat-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className="message-input"
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="send-button"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
