# Auth App

A simple authentication system built with React, Vite, and Express. This application provides user registration, email verification, login, password reset functionality, and a secure dashboard. It leverages modern technologies like Zustand for state management, Framer Motion for animations, and Nodemailer for email services.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running the Application](#running-the-application)
        - [Development](#development)
        - [Production](#production)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Registration:** Create a new account with email verification.
- **Email Verification:** Verify your email address using a 6-digit code.
- **User Login:** Secure login with JWT-based authentication.
- **Password Reset:** Request and reset passwords securely.
- **Protected Dashboard:** Access user-specific information once authenticated.
- **Responsive Design:** Mobile-friendly and aesthetically pleasing UI.
- **State Management:** Efficient state handling with Zustand.
- **Animations:** Smooth UI transitions using Framer Motion.
- **Email Services:** Automated emails for verification and password resets.

## Technologies Used

### Frontend
- **React:** JavaScript library for building user interfaces.
- **Vite:** Fast frontend build tool.
- **Zustand:** Lightweight state management.
- **Framer Motion:** Animation library for React.
- **Tailwind CSS:** Utility-first CSS framework.
- **React Router DOM:** Routing library for React.
- **Axios:** Promise-based HTTP client.
- **React Hot Toast:** Notification library.

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express:** Fast, unopinionated, minimalist web framework.
- **MongoDB:** NoSQL database.
- **Mongoose:** MongoDB object modeling tool.
- **Nodemailer:** Module for sending emails.
- **JSON Web Tokens (JWT):** For secure authentication.
- **bcryptjs:** Password hashing.
- **dotenv:** Environment variable management.
- **Cors:** Middleware for enabling CORS.
- **cookie-parser:** Middleware for parsing cookies.

## Project Structure
```
project1/
├── client/                  # Frontend Code
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components
│   ├── store/               # Zustand stores
│   ├── utils/               # Utility functions
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                  # Backend Code
│   ├── controllers/
│   │   └── authController.js
│   ├── db/
│   │   └── connectdb.js
│   ├── mail/
│   │   ├── email.js
│   │   ├── emailtemplate.js
│   │   └── mail.js
│   ├── middleware/
│   │   └── verifyToken.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   └── routes.js
│   ├── utils/
│   │   └── generateTokenAndsetCookie.js
│   └── index.js
├── .gitignore
├── package.json             # Root package.json
└── README.md                # This file
```

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14 or later)
- **npm** (v6 or later) or **Yarn**
- **MongoDB** (Ensure you have access to a MongoDB instance)

### Installation

#### Clone the Repository
```sh
git clone https://github.com/Abhijeet14d/SecureLogin
cd SecureLogin
```

#### Install Root Dependencies
The root package.json primarily manages the backend. Install dependencies:
```sh
npm install
```

#### Install Client Dependencies
Navigate to the client directory and install frontend dependencies:
```sh
cd client
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
# Server Configuration
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_specific_password
```

### Running the Application

#### Development

##### Start the Backend Server
From the root directory:
```sh
npm run dev
```

##### Start the Frontend Development Server
In a new terminal window, navigate to the client directory:
```sh
cd client
npm run dev
```

#### Production

##### Build the Frontend
From the root directory:
```sh
npm run build
```

##### Start the Backend Server
```sh
npm start
```

## API Endpoints
All API endpoints are prefixed with `/api/auth`.

### POST /signup
Register a new user.
```json
{
    "email": "user@example.com",
    "password": "yourpassword",
    "name": "John Doe"
}
```

### POST /login
Authenticate a user.
```json
{
    "email": "user@example.com",
    "password": "yourpassword"
}
```

### POST /logout
Logout the authenticated user.

### POST /verifyEmail
Verify user's email with a 6-digit code.
```json
{
    "code": "123456"
}
```

### GET /checkAuth
Check if the user is authenticated.

### POST /forgotPassword
Request a password reset link.
```json
{
    "email": "user@example.com"
}
```

### POST /resetPassword/:token
Reset the user's password using a token.
```json
{
    "password": "newpassword"
}
```

## Contributing
Contributions are welcome! Follow these steps to contribute:

1. **Fork the Repository**

2. **Create a Feature Branch**
```sh
git checkout -b feature/YourFeatureName
```

3. **Commit Your Changes**
```sh
git commit -m "Add some feature"
```

4. **Push to the Branch**
```sh
git push origin feature/YourFeatureName
```

5. **Open a Pull Request**