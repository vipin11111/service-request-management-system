# 🚀 Service Request Management System

A production-ready full-stack **Service Request Management System** built with **React 18, TypeScript, Express.js, MongoDB Atlas, and JWT Authentication**.

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/vipin11111/service-request-management-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

---

## 🌐 Live URLs & Links

- **GitHub Repository**: [https://github.com/vipin11111/service-request-management-system](https://github.com/vipin11111/service-request-management-system)
- **Frontend App (Vercel)**: `https://service-request-management-system.vercel.app` (Or connected Vercel project domain)
- **Backend API (Render)**: `https://service-request-management-backend.onrender.com/api`

---

# 📖 Project Overview

The **Service Request Management System (SRMS)** streamlines internal IT operations. Employees can submit service tickets for software issues, hardware failures, network access, or administrative support. An intelligent AI-assisted analyzer automatically scans request titles and descriptions to suggest:

- **Automated Issue Summary**: Summarises key issues cleanly.
- **Suggested Category**: `SOFTWARE`, `HARDWARE`, `NETWORK`, `ACCESS`, or `OTHER`.
- **Suggested Priority**: `LOW`, `MEDIUM`, `HIGH`, or `URGENT`.
- **Justification / Reason**: Explains why the suggested priority was chosen.

Administrators receive a dedicated control panel to view all tickets, assign agents, transition statuses (`OPEN` -> `IN_PROGRESS` -> `RESOLVED` / `CANCELLED`), and monitor team velocity.

---

# ✨ Features

## 🔐 Authentication & Session Security
- **User Registration & Login**: Secure credential-based access.
- **JWT Token Authentication**: Stateless token generation with expiration.
- **Password Security**: Salted password hashing with `bcryptjs`.
- **Session Persistence**: Automatic session restoration via `/api/auth/me` on browser refresh.
- **Protected Routes**: Client-side and server-side route protection based on authentication status and user roles (`USER` vs `ADMIN`).

## 🎫 Service Request Management
- **Ticket Creation**: Multi-field submission with optional AI recommendations.
- **Dashboard Overview**: Metrics tracking total, open, in-progress, and resolved tickets.
- **Ticket Lifecycle**: Ability for users to review request details or cancel pending tickets.
- **Status Audit Trail**: Real-time history tracking who changed status and when.

## 🛡️ Admin Features
- **Global Ticket Oversight**: Administrative view of all user tickets across the organization.
- **Agent Assignment**: Assign tickets to support staff.
- **Status Progression**: Transition tickets through resolution lifecycle.
- **User Management**: View and audit registered system users.

## 🤖 AI Assistance Integration
- **Automated Text Analysis**: Analyzes text patterns to infer ticket attributes.
- **Category & Priority Engine**: Intelligent categorization based on severity keywords.
- **Smart Pre-filling**: Auto-populates request form fields to decrease resolution times.

---

# 🛠 Tech Stack

## Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **HTTP Client**: Axios (with Bearer token interceptors & credentials support)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB Atlas (via Mongoose ORM)
- **Security**: JWT (`jsonwebtoken`), `bcryptjs`, CORS middleware

---

# 📂 Project Structure

```
service-request-management-system
│
├── client                         # Frontend React + Vite Application
│   ├── src
│   │   ├── api                    # Axios configuration & interceptors
│   │   ├── components             # Reusable UI components (Navbar, etc.)
│   │   ├── context                # AuthContext for session management
│   │   ├── pages                  # Dashboard, Login, Register, Request Details
│   │   ├── types                  # Shared TypeScript interfaces
│   │   ├── index.css              # Tailwind CSS styles
│   │   └── main.tsx               # Main React entrypoint & router
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json                # Vercel SPA routing configuration
│   └── vite.config.ts             # Vite server proxy config
│
├── server                         # Backend Express + TypeScript Server
│   ├── src
│   │   ├── config                 # Database connection config
│   │   ├── controllers            # Auth, Request & AI controllers
│   │   ├── middleware             # JWT Auth & Role Authorization
│   │   ├── models                 # Mongoose schemas (User, ServiceRequest)
│   │   ├── routes                 # Auth, Requests, AI API routes
│   │   ├── scripts                # Database seeding script
│   │   └── index.ts               # Express application entrypoint
│   ├── package.json
│   └── tsconfig.json
│
├── render.yaml                    # Render Cloud Backend Deployment Config
├── .gitignore                     # Git ignore definitions
└── README.md                      # Complete system documentation
```

---

# 🌐 Production Cloud Deployment Guide

### 1. Deploy Backend on Render
1. Go to [Render Dashboard](https://dashboard.render.com/) -> **New Web Service**.
2. Connect your GitHub repository `vipin11111/service-request-management-system`.
3. Set **Root Directory**: `server`
4. Set **Build Command**: `npm install && npm run build`
5. Set **Start Command**: `npm start`
6. Add Environment Variables:
   - `PORT`: `5000`
   - `MONGODB_URI`: `mongodb+srv://<user>:<password>@cluster0.zodxsio.mongodb.net/service-request-db?retryWrites=true&w=majority`
   - `JWT_SECRET`: `your_secure_jwt_secret_key`
   - `JWT_EXPIRES_IN`: `1d`
   - `CLIENT_ORIGIN`: `https://service-request-management-system.vercel.app`
7. Click **Create Web Service**. Render will build and deploy the backend API.

---

### 2. Deploy Frontend on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new) -> **Import Project**.
2. Select repository `vipin11111/service-request-management-system`.
3. Set **Root Directory**: `client`
4. Set **Framework Preset**: `Vite`
5. Add Environment Variable:
   - `VITE_API_URL`: `https://service-request-management-backend.onrender.com/api`
6. Click **Deploy**. Vercel will build and serve the single-page application.

---

# ⚙️ Local Development Setup

## 1. Backend

```bash
cd server
npm install
```

Create `.env` inside `server/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/service-request-db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:3000
AI_PROVIDER=mock
AI_SERVICE_TOKEN=mock_secret
DB_SEED_MODE=active
```

Start Server:
```bash
npm run dev
```

---

## 2. Frontend

```bash
cd client
npm install
```

Create `.env` inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start App:
```bash
npm run dev
```

Open: **`http://localhost:3000`**

---

# 🔧 Bug Fixes Implemented

| Category | Issue Description | Solution Implemented |
|----------|-------------------|----------------------|
| **Security** | Plaintext password vulnerability | Implemented salted `bcrypt` password hashing (rounds = 10) |
| **Security** | Self-assigned Admin registration | Restricted public registration strictly to `USER` role |
| **Security** | BOLA / IDOR vulnerability on requests | Enforced ownership check (`req.user.id === request.createdBy`) |
| **Auth** | Session lost on page refresh (`F5`) | Added `/api/auth/me` endpoint & restored session via token |
| **Auth** | localStorage token & header mismatch | Standardised Bearer token header in Axios request interceptor |
| **CORS** | Browser "CORS request did not succeed" | Allowed dynamic origins (`3000`, `5173`), preflight `OPTIONS`, & methods |
| **AI** | Endpoint path mismatch | Fixed AI route path to `/api/ai/analyze` |
| **AI** | Response payload field mismatch | Aligned frontend state mapping with AI response keys |
| **AI** | Priority enum invalid value | Mapped AI output to valid priority enum (`LOW`, `MEDIUM`, `HIGH`, `URGENT`) |
| **Database** | Missing request status history | Added schema array tracking status changes, timestamps, and user ID |
| **Frontend** | Navbar mobile menu toggle failure | Corrected React state toggle logic in Navbar component |
| **Frontend** | UI loading state issues | Added spinner states to prevent double submissions during async calls |
| **Error Handling** | Silent failures in server controllers | Wrapped all controllers in `try/catch` and logged with `console.error(err)` |

---

# 👨‍💻 Author

**Vipin Zingade**
- GitHub: [https://github.com/vipin11111](https://github.com/vipin11111)

---

## ⭐ Star the Repository
If you found this project helpful, please consider giving it a star on GitHub!
