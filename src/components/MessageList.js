import React, { useEffect, useRef } from "react";

/**
 * MessageList component displays a list of messages in a chat interface.
 *
 * It automatically scrolls to the bottom when new messages are added.
 *
 * @param {Object[]} messages - Array of message objects to display.
 * @param {string} messages[].id - Unique identifier for the message.
 * @param {string} messages[].text - The text content of the message.
 * @param {string} messages[].sender - The sender of the message (e.g., "user" or "assistant").
 */
function MessageList({ messages }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message list when messages change
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}-message`}>
            <div className="message-content">
              <p>{message.text}</p>
            </div>
          </div>
        ))
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
}

export default MessageList;
