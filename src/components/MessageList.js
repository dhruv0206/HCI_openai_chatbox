import React, { useEffect, useRef } from "react";

/**
 * MessageList component displays a list of messages in a chat interface.
 * Updated to show messages or empty state appropriately.
 *
 * @param {Object[]} messages - Array of message objects to display.
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
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <p>Start a conversation!</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender}-message`}
            >
              <div className="message-content">
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </>
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
}

export default MessageList;
