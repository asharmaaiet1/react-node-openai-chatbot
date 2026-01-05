# My Chatbot

A full-stack chatbot application built with React and Node.js/Express, powered by OpenAI's LLM API.

## Project Overview

This project is a modern web-based chatbot that combines:

- **Frontend**: React-based user interface with styled components
- **Backend**: Express.js server handling API requests
- **AI Integration**: OpenAI integration for intelligent responses

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
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
   Create a `.env` file in ./server and add your OpenAI API key:
   ```
   PORT=9090
   OPENAI_API_KEY=your_api_key_here
   MODEL=gpt-4o-mini
   ```

## Running the Application

The application runs in two parts: frontend and backend. You have two options:

### Option 1: Run Frontend Only (Development)

The frontend will proxy API requests to the backend at `http://localhost:9090`.

```bash
npm start
```

The React app will open in your browser at `http://localhost:3000`

### Option 2: Run Both Frontend and Backend (Recommended)

In one terminal, start the backend server:

```bash
node server.js
```

The backend will start on `http://localhost:9090`

In another terminal, start the frontend:

```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Project Structure

```
my-chatbot/
├── public/                 # Static files
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── server/                 # Backend code
│   └── src/
│       ├── index.js        # Server entry point (alternative)
│       ├── routes/
│       │   └── chat.js     # Chat endpoints
│       ├── services/
│       │   └── llm.js      # LLM service integration
│       ├──.env             # Environment file for Node
├── src/                    # Frontend React code
│   ├── App.js              # Main React component
│   ├── App.css
│   ├── index.js            # React entry point
│   ├── api/
│   │   └── index.js        # API client utilities
│   └── ...
├── server.js               # Express server entry point
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Available Scripts

- `npm start` - Start the React development server (port 3000)
- `npm build` - Build the React app for production
- `npm test` - Run tests
- `node server.js` - Start the Express backend server (port 9090)

## API Endpoints

The backend provides chat functionality:

- **POST** `/api/chat` - Send a message to the chatbot and get a response

## Technology Stack

- **Frontend**: React 19, Styled Components, Axios
- **Backend**: Express.js 5
- **AI**: OpenAI API
- **Testing**: React Testing Library, Jest
- **Utilities**: dotenv for environment variables, CORS for cross-origin requests

## Troubleshooting

- **Port 3000 already in use**: Change the port in development or kill the process using `lsof -i :3000` (macOS/Linux) or `netstat -ano` (Windows)
- **Port 9090 already in use**: Modify `SERVER_PORT` in `server.js`
- **API Key not working**: Verify your OpenAI API key is correctly set in the `.env` file
- **CORS errors**: Ensure the backend is running and the proxy in `package.json` is set correctly

## Development

For full-stack development, run both servers simultaneously in separate terminals for a seamless development experience.

## License

This project is private. All rights reserved.
