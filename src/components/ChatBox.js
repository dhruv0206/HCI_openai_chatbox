import React from "react";

/**
 * ChatBox component provides an input field for users to type and send messages.
 * Updated with a simplified design that matches the screenshot.
 *
 * @param {Function} onSendMessage - Callback function to handle sending a message.
 * @param {string} value - The current value of the input field.
 * @param {Function} onChange - Callback for input changes.
 * @param {boolean} loading - Indicates whether a message is currently being sent.
 */
function ChatBox({ onSendMessage, value, onChange, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSendMessage(value);
    }
  };

  return (
    <div className="chat-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e)}
          placeholder="Type your message..."
          disabled={loading}
          className="message-input"
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
