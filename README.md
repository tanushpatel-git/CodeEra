# CodeEra - Collaborative Coding Platform

<p align="center">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Stream-635BFF?style=for-the-badge&logo=stream&logoColor=white" alt="Stream">
</p>

<p align="center">
  <a href="https://github.com/anomalyco/opencode/issues">Report Bug</a>
  ·
  <a href="https://github.com/anomalyco/opencode/issues">Request Feature</a>
</p>

---

## Table of Contents

1. [About The Project](#about-the-project)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
6. [API Documentation](#api-documentation)
7. [Architecture Overview](#architecture-overview)
8. [Backend Details](#backend-details)
9. [Frontend Details](#frontend-details)
10. [Screenshots](#screenshots)
11. [Contributing](#contributing)
12. [License](#license)

---

## About The Project

**CodeEra** is a real-time collaborative coding platform that allows developers to solve coding problems together through an integrated video calling feature. It combines a code editor, live video communication, and a problem-solving environment into a single seamless experience.

### Key Highlights

- **Real-time Video Calling** - Powered by Stream SDK for seamless communication
- **Collaborative Code Editor** - Monaco Editor with syntax highlighting
- **Code Execution** - Execute code in multiple languages (Python, JavaScript, Java, C++, etc.)
- **Session Management** - Create, join, and manage coding sessions
- **Problem Library** - Practice coding problems with varying difficulty levels
- **User Authentication** - Secure JWT-based authentication system

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | Database (with Mongoose ODM) |
| **JWT** | Authentication |
| **Bcrypt** | Password hashing |
| **Stream SDK** | Video calling & chat |
| **Swagger** | API documentation |
| **Joi** | Input validation |
| **JDoodle API** | Code execution |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool |
| **Tailwind CSS 4** | Styling |
| **Redux Toolkit** | State management |
| **React Router** | Navigation |
| **Monaco Editor** | Code editor |
| **Stream Video SDK** | Video calling |
| **Axios** | HTTP client |
| **Framer Motion** | Animations |
| **TanStack Query** | Data fetching |

---

## Features

### Authentication
- User registration with email/password
- Secure login with JWT tokens
- Cookie-based session management
- Protected routes

### Session Management
- Create new coding sessions with problem selection
- Join existing sessions as a participant
- Real-time session status updates
- Session history tracking

### Video Calling
- 1-on-1 video calls using Stream
- Real-time chat functionality
- Screen sharing capabilities
- Audio/video controls

### Code Editor
- Monaco Editor integration
- Syntax highlighting for multiple languages
- Code execution via JDoodle API
- Support for Python, JavaScript, Java, C++, C, Ruby, Go, Rust

### Problems
- Curated problem set with difficulty levels (Easy, Medium, Hard)
- Problem descriptions and examples
- Difficulty-based color coding

---

## Project Structure

```
codeEra/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   │   ├── codeExecute.controller.js
│   │   │   ├── getStreamToken.controller.js
│   │   │   ├── session.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/        # Custom middleware
│   │   │   └── jsonWebTokenCheck.middleware.js
│   │   ├── models/            # Mongoose schemas
│   │   │   ├── Session.model.js
│   │   │   └── User.js
│   │   ├── routes/            # API routes
│   │   │   ├── chat.routes.js
│   │   │   ├── session.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── videoCalling.routes.js
│   │   ├── services/          # Business logic
│   │   │   └── userLogin.js
│   │   ├── utility/           # Helper functions
│   │   │   ├── connectDb.js
│   │   │   ├── hashPassword.js
│   │   │   ├── jsonTokenCreate.js
│   │   │   └── stream.js
│   │   ├── validators/        # Input validation
│   │   │   ├── userLogin.Validator.js
│   │   │   └── userSchema.Validator.js
│   │   └── app.js             # Express app setup
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── auth/              # Authentication components
│   │   │   ├── Authcheck.jsx
│   │   │   └── ManageLoginRedirect.jsx
│   │   ├── component/        # Reusable components
│   │   │   ├── ActiveSession.jsx
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── CodeOutput.jsx
│   │   │   ├── CreateSessionModal.jsx
│   │   │   ├── HomeNavbar.jsx
│   │   │   ├── LoginPopUp.jsx
│   │   │   ├── MainNavbar.jsx
│   │   │   ├── ProblemDescription.jsx
│   │   │   ├── RecentSession.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── VideoCallUi.jsx
│   │   │   └── WelcomeSection.jsx
│   │   ├── data/              # Static data
│   │   │   └── problems.js
│   │   ├── hook/             # Custom hooks
│   │   │   ├── difficultyStyle.js
│   │   │   ├── getDifficultyColor.js
│   │   │   ├── useSessions.js
│   │   │   └── useStreamClient.js
│   │   ├── lib/               # Library configurations
│   │   │   ├── axios.js
│   │   │   ├── piston.js
│   │   │   └── stream.js
│   │   ├── pages/             # Page components
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProblemPage.jsx
│   │   │   ├── ProblemsPage.jsx
│   │   │   └── SessionPage.jsx
│   │   ├── redux/             # Redux state management
│   │   │   ├── store.js
│   │   │   └── userDetails/
│   │   │       └── userDetail.js
│   │   ├── service/          # API services
│   │   │   ├── loginService.js
│   │   │   └── sessionService.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── .env                  # Environment variables
│   ├── eslint.config.js
│   ├── package.json
│   └── vite.config.js        # Vite configuration
│
└── README.md
```

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codeEra
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure environment variables**

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=8001

# MongoDB Connection
MONGO_URL=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
HASH_SECRET_KEY=your_hash_secret_key

# Stream SDK Configuration
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

# Frontend URL
FRONT_END_URL=http://localhost:5173

# JDoodle API (Code Execution)
JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret
```

#### Frontend (.env)

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8001
VITE_STREAM_API_KEY=your_stream_api_key
```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:8001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access API Documentation**
   Visit `http://localhost:8001/api-docs` for Swagger documentation

---

## API Documentation

### Base URL
```
http://localhost:8001
```

### Endpoints

#### User Routes (`/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/registration` | Register a new user |
| POST | `/user/login` | User login |
| GET | `/user/logout` | User logout |
| GET | `/user/getUser` | Get current user |

#### Session Routes (`/sessions`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/sessions` | Create a new session |
| GET | `/sessions/active` | Get active sessions |
| GET | `/sessions/my-recent` | Get user's recent sessions |
| GET | `/sessions/:id` | Get session by ID |
| POST | `/sessions/:id/join` | Join a session |
| POST | `/sessions/:id/end` | End a session |

#### Video Calling (`/access`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/access/videoCalling` | Video calling endpoint |

#### Code Execution (`/run`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/run` | Execute code |

---

## Architecture Overview

### Backend Architecture

The backend follows a **MVC (Model-View-Controller)** pattern:

```
Request → Routes → Middleware → Controller → Model/Database
                          ↓
                    Services/Utility
```

**Key Components:**

1. **Routes** - Define API endpoints and map to controllers
2. **Middleware** - Handle authentication (JWT verification)
3. **Controllers** - Process incoming requests and return responses
4. **Models** - Define database schemas (Mongoose)
5. **Services** - Encapsulate business logic
6. **Utility** - Helper functions (password hashing, token creation, etc.)
7. **Validators** - Input validation using Joi

### Frontend Architecture

The frontend follows a **component-based architecture** with Redux for state management:

```
Pages
  ↓
Components (Reusable UI)
  ↓
Custom Hooks (Logic)
  ↓
Services (API calls via Axios)
  ↓
Redux Store (Global State)
```

**Key Patterns:**

1. **React Router** - Client-side routing
2. **Redux Toolkit** - State management
3. **TanStack Query** - Server state management & caching
4. **Context API** - For smaller-scale state needs

---

## Backend Details

### Authentication Flow

```
1. User submits registration/login credentials
2. Server validates input using Joi validators
3. Password is hashed using bcrypt
4. User is created/verified in MongoDB
5. JWT token is generated
6. Token is stored in HTTP-only cookie
7. User is redirected to dashboard
```

### Session Management

```
1. Host creates session with problem & difficulty
2. Server generates unique callId for Stream
3. Session stored in MongoDB
4. Stream video call created
5. Chat channel created
6. Participant joins via session ID
7. Session status tracked (active/completed)
```

### Code Execution

```
1. User writes code in Monaco Editor
2. Code sent to backend /run endpoint
3. Backend forwards to JDoodle API
4. Output returned to frontend
5. Results displayed in CodeOutput component
```

---

## Frontend Details

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with login/register |
| Problems | `/problems` | List of coding problems |
| Problem | `/problem/:id` | Individual problem details |
| Session | `/session/:id` | Collaborative coding room |
| Dashboard | `/dashboard` | User dashboard with sessions |

### State Management

- **Redux** - User authentication state, global UI state
- **TanStack Query** - API data fetching, caching, synchronization
- **React Context** - Theme and local UI state

### Key Libraries

- **Monaco Editor** - VS Code's code editor
- **Stream Video SDK** - Real-time video calling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animations and transitions

---

## Screenshots

> Add your project screenshots here

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgments

- [Stream](https://getstream.io/) - Video calling and chat SDK
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [JDoodle](https://www.jdoodle.com/) - Code execution API
- [MongoDB](https://www.mongodb.com/) - Database
- [React](https://react.dev/) - UI library

---

<p align="center">Made with ❤️ by Tanush Patel</p>
