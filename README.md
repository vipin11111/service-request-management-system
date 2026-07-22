# 🚀 Service Request Management System

A full-stack Service Request Management System built using **React, TypeScript, Express.js, MongoDB Atlas, and JWT Authentication**.

This project allows users to register, log in, create and manage service requests, receive AI-assisted request analysis, and enables administrators to manage requests securely.

---

# 📖 Project Overview

The application streamlines service request management by allowing authenticated users to submit IT support requests while administrators can review, assign, and update request statuses.

The system also includes an AI-assisted request analysis feature that automatically suggests:

- Request Summary
- Category
- Priority
- Reason

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Session Persistence (`/api/auth/me`)
- Protected Routes

## Service Requests

- Create Request
- View Requests
- View Request Details
- Cancel Request
- Status History Tracking

## Admin Features

- View All Requests
- Assign Requests
- Update Request Status
- Role-based Authorization (`ADMIN` role guard)

## AI Assistance

- AI Request Analysis
- Category Prediction
- Priority Suggestion
- Request Summary

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Axios
- React Router
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- JWT Authentication
- bcrypt

---

# 📂 Project Structure

```
service-request-management-system
│
├── client
│   ├── src
│   ├── pages
│   ├── components
│   ├── context
│   ├── api
│   └── assets
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── src
│
└── README.md
```

---

# 🏗️ Architecture Diagram

```
+-----------------------------------------------------------------------+
|                             CLIENT (React + Vite)                     |
|                                                                       |
|   +-------------------+    +-------------------+  +---------------+   |
|   |  AuthContext      |    | Axios Interceptor |  | React Router  |   |
|   | (Session & State) |--> |  (Bearer Token)   |->| (Protected    |   |
|   +-------------------+    +-------------------+  |   Routes)     |   |
|                                        |          +---------------+   |
+----------------------------------------|------------------------------+
                                         | HTTP / REST API (via Vite Proxy)
                                         v
+-----------------------------------------------------------------------+
|                          BACKEND (Express + TS)                       |
|                                                                       |
|   +-------------------+    +-------------------+  +---------------+   |
|   | CORS & BodyParser |--> | Auth Middleware   |->| Controllers   |   |
|   | Middleware        |    | (JWT Verification)|  | & Routes      |   |
|   +-------------------+    +-------------------+  +---------------+   |
|                                                           |           |
+-----------------------------------------------------------|-----------+
                                                            |
                                        +-------------------+-------------------+
                                        |                                       |
                                        v                                       v
                             +--------------------+                   +-------------------+
                             |  MongoDB Atlas DB  |                   | AI Engine (Mock)  |
                             |  (Mongoose Schema) |                   | (Rule Analysis)   |
                             +--------------------+                   +-------------------+
```

---

# 🔧 Bug Fixes Implemented

| Issue | Solution |
|-------|----------|
| Passwords stored insecurely | Implemented bcrypt password hashing |
| User role selection during registration | Restricted registration to USER role |
| JWT token mismatch | Unified frontend/backend token handling |
| Session lost after page refresh | Implemented `/api/auth/me` & fixed localStorage token persistence |
| Authentication state inconsistency | Corrected AuthContext token management |
| Ownership vulnerability (IDOR/BOLA) | Added ownership validation for requests |
| AI endpoint mismatch | Fixed API route alignment |
| AI response field mismatch | Updated frontend response mapping |
| Invalid AI priority value | Replaced invalid enum with valid priority |
| CORS configuration issues | Fixed origins, methods, headers, and error middleware ordering |
| Missing request status history | Added status history tracking |
| Loading state issues | Improved UI loading state handling |
| Navbar mobile menu issue | Fixed menu toggle behavior |
| Improved error handling | Added proper try/catch, logging, and error responses |

---

# 🔒 Security Improvements

- JWT Authentication
- Password Hashing using bcrypt
- Role-based Access Control (RBAC)
- Ownership Validation (IDOR/BOLA mitigation)
- Protected API Routes
- Secure Authentication Flow
- Improved CORS Configuration (Restricted Origin & Headers)

---

# ⚙️ Installation

## Clone Repository

```bash
git clone git@github.com:vipin11111/service-request-management-system.git
```

or

```bash
git clone https://github.com/vipin11111/service-request-management-system.git
```

---

## Backend Setup

```bash
cd server
npm install
```

Create `.env` file (refer to `.env.example`):

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_ATLAS_URI
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:3000
```

Start Backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create `.env` file (refer to `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend:

```bash
npm run dev
```

---

Open application in browser:

```
http://localhost:3000
```

---

# 🧪 Testing

- Register User
- Login
- Refresh Browser (verify session persistence)
- Create Request
- AI Request Analysis
- View Request & Status History
- Update Request Status (Admin)
- Logout

---

# 📊 Application Flow

```
User
   │
   ▼
React Frontend
   │
Axios Interceptor (Bearer Token)
   │
Express API (CORS & Auth Middleware)
   │
JWT Authentication / RBAC
   │
MongoDB Atlas
   │
Response & UI Render
   │
Dashboard
```

---

# 📚 What I Learned

This project strengthened my knowledge of:

- Full Stack Development
- React & TypeScript
- Express.js & Node.js
- MongoDB Atlas & Mongoose
- JWT Authentication & Authorization
- REST APIs & Axios Interceptors
- CORS Configuration & Preflight Requests
- Secure Web Application Development (IDOR/BOLA mitigation, bcrypt)
- Error Handling & Debugging

---

# 🚀 Future Improvements

- Email Notifications
- File Upload Support
- Real AI LLM Integration
- Dashboard Analytics
- Dark Mode
- Docker Support
- Unit & Integration Testing
- CI/CD Pipeline

---

# 👨‍💻 Author

**Vipin Zingade**

GitHub: [https://github.com/vipin11111](https://github.com/vipin11111)

---

## ⭐ If you found this project helpful, consider giving it a star!
