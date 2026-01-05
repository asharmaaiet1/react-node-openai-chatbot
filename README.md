# My Chatbot

A full-stack chatbot application built with React and Node.js/Express, powered by OpenAI's LLM API.

## Project Overview

This project is a modern web-based chatbot that combines:

- **Frontend**: React-based user interface with styled components and theme switching
- **Backend**: Express.js server handling REST and streaming API requests
- **AI Integration**: OpenAI integration for intelligent, real-time responses
- **Real-time Streaming**: Server-sent events for streaming chat responses
- **Conversation History**: Support for multi-turn conversations with context

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher, comes with Node.js)
- **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

## Installation

1. **Clone or navigate to the project directory:**

   ```bash
   cd my-chatbot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `./server` directory and add your configuration:
   ```
   PORT=9090
   OPENAI_API_KEY=your_api_key_here
   MODEL=gpt-4o-mini
   ```
   - `PORT`: Server port (default: 9090)
   - `OPENAI_API_KEY`: Your OpenAI API key (required)
   - `MODEL`: OpenAI model to use (e.g., gpt-4o-mini, gpt-4, gpt-3.5-turbo)

## Running the Application

The application runs in two parts: frontend and backend. You have two options:

### Option 1: Run Frontend Only (Development)

The frontend will proxy API requests to the backend at `http://localhost:9090`.

```bash
npm start
```

The React app will open in your browser at `http://localhost:3000`
Open two separate terminals:

**Terminal 1 - Start the backend server:**

```bash
node server/src/index.js
```

Backend will start on `http://localhost:9090`

**Terminal 2 - Start the frontend:**

```bash
npm start
```

Ftart

```

The frontend will open at `http://localhost:3000`

## Project Structure

```

my-chatbot/
├── public/ # Static files
│ ├── index.html # HTML entry point
│ ├── manifest.json # PWA manifest
│ └── robots.txt
├── server/ # Backend - Express.js
│ └── src/
│ ├── index.js # Server entry point
│ ├── routes/
│ │ └── chat.js # Chat endpoints & streaming
│ ├── services/
│ │ └── llm.js # OpenAI service integration
│ └── .env # Environment configuration
├── src/ # Frontend - React
│ ├── App.js # Main React component
│ ├── App.css # Styling
│ ├── index.js # React entry point
│ ├── api/
│ │ └── index.js # API client utilities
│ ├── components/
│ │ └── styles.js # Styled components
│ ├── context/
│ │ └── ThemeContext.js # Theme management
│ └── setupTests.js
├── package.json # Dependencies and npm scripts
└── README.md # This file

````

## API Endpoints

### REST Endpoint

**POST** `/api/chat`
- Send a message and get a response
- Request body:
  ```json
  {
    "message": "Hello!",
    "history": []
  }
````

- Response:
  ```json
  {
    "reply": "Hi! How can I help you?"
  }
  ```

### Streaming Endpoint

**GET** `/api/chat/stream`

- Get real-time streaming responses using Server-Sent Events (SSE)
- Query parameters:
  - `message`: The user message (required)
  - `history`: JSON-encoded message history (optional)
- Returns: Text stream with real-time response data

## Features

- ✅ **Real-time Chat**: Interactive chat interface with responsive design
- ✅ **Streaming Responses**: Server-sent events for real-time message streaming
- ✅ **Conversation Context**: Maintains message history for multi-turn conversations
- ✅ **Dark/Light Theme**: Toggle between dark and light themes
- ✅ **OpenAI Integration**: Uses the latest OpenAI API for intelligent responses
- ✅ **CORS Enabled**: Backend configured for cross-origin requests
- ✅ **Error Handling**: Comprehensive error handling on both frontend and backend

## Technology Stack

- **Frontend**: React 19, Styled Components, Axios
- **Backend**: Express.js 5
- **AI**: OpenAI API
- **Testing**: React Testing Library, Jest
- **Utilities**: dotenv for environment variables, CORS for cross-origin requests

## Available Scripts

### Frontend Scripts

- `npm start` - Start React development server (port 3000)
- `npm build` - Build the React app for production
- `npm test` - Run tests

### Backend Scripts

- `node server/src/index.js` - Start the Express backend server (port 9090)

## Troubleshooting

| Issue                    | Solution                                                                         |
| ------------------------ | -------------------------------------------------------------------------------- |
| Port 3000 already in use | Kill process with `lsof -i :3000` (macOS/Linux) or `netstat -ano` (Windows)      |
| Port 9090 already in use | Modify `PORT` in `.env` file in server directory                                 |
| API Key not working      | Verify your OpenAI API key is correctly set in `server/.env`                     |
| CORS errors              | Ensure backend is running on port 9090 and proxy in `package.json` is configured |
| Streaming not working    | Verify SSE is supported in your browser; check network tab for stream endpoint   |

## Development

For full-stack development, run both servers simultaneously in separate terminals:

- Terminal 1: Backend - `node server/src/index.js`
- Terminal 2: Frontend - `npm start`

## License

This project is private. All rights reserved.
