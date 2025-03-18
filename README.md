# Hello World API

This project is a **Hello World API** application built using React. It provides a simple interface for interacting with an AI-powered backend. The application is hosted on **Vercel** and can be accessed at [https://hello-world-api-omega.vercel.app/](https://hello-world-api-omega.vercel.app/).

## Features

- Interactive chat interface.
- Powered by an AI API for generating responses.
- Responsive design for various devices.
- Hosted on Vercel for fast and reliable deployment.

## File Responsibilities

### API Directory

- **api/groq.js**: Handles API requests and integrates with the Groq API to interact with a generative AI model. It uses the **LLaMA (Large Language Model Meta AI)** model, specifically the `llama-3.3-70b-versatile` variant, which is developed by **Meta**.

### Components Directory

- **Header.js**: Displays the application title and subtitle.
- **ChatBox.js**: Provides an input field for users to type and send messages.
- **MessageList.js**: Displays the list of chat messages and auto-scrolls to the latest message.

### App.js

- The main React component that integrates the chat interface and manages the application state.

### App.css

- Contains styles for the application, including layout and design for the chat interface.

## Hosting

The application is hosted on **Vercel** and is accessible at [https://hello-world-api-omega.vercel.app/](https://hello-world-api-omega.vercel.app/).

## GitHub Repository

The source code for this project is available on GitHub: [https://github.com/dhruv0206/HCI_openai_chatbox](https://github.com/dhruv0206/HCI_openai_chatbox)

## Getting Started

To run the project locally:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Install Vercel CLI globally using `npm install -g vercel`.
4. Start the development server with `npm start`.
5. For testing the app as deployed, use the Vercel CLI:
   - Run `vercel dev` to emulate the production environment locally.
6. Open [http://localhost:3000](http://localhost:3000) in your browser.
