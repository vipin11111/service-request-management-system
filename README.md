# Service Request Management System

A production-ready full-stack **Service Request Management System** built with **React 18, TypeScript, Express.js, Node.js, MongoDB Atlas, and JWT Authentication**.

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/vipin11111/service-request-management-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

---

## 🌐 Live Demo & Repository Links

- **Frontend App (Vercel)**: [https://service-request-management-system.vercel.app](https://service-request-management-system.vercel.app)
- **Backend API (Render)**: [https://service-request-management-backend.onrender.com/api](https://service-request-management-backend.onrender.com/api)
- **GitHub Repository**: [https://github.com/vipin11111/service-request-management-system](https://github.com/vipin11111/service-request-management-system)

---

## 📖 Project Overview

The **Service Request Management System (SRMS)** streamlines organizational IT support. Employees can submit service tickets for software issues, hardware repairs, network connectivity, or access management. An integrated AI assistant analyzes ticket text to auto-suggest summaries, categories, priorities, and justifications.

Administrators receive a dedicated control panel to oversee all tickets, assign support staff, transition ticket statuses (`OPEN` -> `IN_PROGRESS` -> `RESOLVED` / `CANCELLED`), and review audit histories.

---

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login**: Secure authentication with salted `bcryptjs` password hashing.
- **Stateless JWT Authorization**: Bearer token authentication with configurable expiration.
- **Session Persistence**: Automatic session restoration via `GET /api/auth/me` on page refresh (`F5`).
- **Protected & Admin Routes**: Role-based access control (`USER` vs `ADMIN`) on client and server.

### 🎫 Service Request Management
- **Ticket Submission**: Multi-field form with optional AI recommendations auto-fill.
- **Interactive Dashboards**: Metrics tracking total, open, in-progress, and resolved requests.
- **Ticket Details & Audit Log**: Real-time status change tracking with timestamps and user references.
- **Ticket Cancellation**: Users can safely cancel pending requests.

### 🛡️ Admin Portal
- **Global Requests Oversight**: Unified view of all tickets submitted across the organization.
- **Agent Assignment**: Assign tickets to support representatives.
- **Lifecycle Management**: Transition ticket status through to resolution.

### 🤖 AI Request Analysis
- **Automated Text Processing**: Scans title and description for severity keywords.
- **Category & Priority Inference**: Predicts appropriate category (`SOFTWARE`, `HARDWARE`, `NETWORK`, `ACCESS`, `OTHER`) and priority (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
- **Smart Summary**: Generates concise issue summaries.

---

## 🛠 Technologies Used

### Frontend
- **React 18** & **TypeScript**
- **Vite** (Fast dev server and build tool)
- **Axios** (Configured with request interceptors & credentials)
- **React Router v6** (Client-side routing)
- **Tailwind CSS** (Modern styling)
- **Lucide React** (Icons)

### Backend
- **Node.js** & **Express.js**
- **TypeScript**
- **MongoDB Atlas** & **Mongoose ORM**
- **JSON Web Tokens (`jsonwebtoken`)**
- **bcryptjs** (Password hashing)
- **cors** (Cross-Origin Resource Sharing middleware)

---

## 📂 Folder Structure

```
service-request-management-system
│
├── client                         # Frontend Application (React + Vite)
│   ├── src
│   │   ├── api/                   # Axios client instance with Bearer interceptors
│   │   ├── components/            # Reusable UI components (Navbar, etc.)
│   │   ├── context/               # AuthContext for session management
│   │   ├── pages/                 # Dashboard, Login, Register, Request Details
│   │   ├── types/                 # Shared TypeScript interface definitions
│   │   ├── index.css              # Tailwind CSS imports & global styles
│   │   └── main.tsx               # React application entrypoint & Router
│   ├── package.json
│   ├── tsconfig.json
│   ├── vercel.json                # Vercel SPA rewrite configuration
│   └── vite.config.ts             # Vite proxy configuration
│
├── server                         # Backend Application (Express + TypeScript)
│   ├── src
│   │   ├── config/                # Database connection handler
│   │   ├── controllers/           # Auth, Request, and AI business logic
│   │   ├── middleware/            # JWT verification & Admin authorization
│   │   ├── models/                # Mongoose schemas (User, ServiceRequest)
│   │   ├── routes/                # Express API endpoints
│   │   ├── scripts/               # Database seeding script
│   │   └── index.ts               # Express server entrypoint
│   ├── package.json
│   └── tsconfig.json
│
├── render.yaml                    # Render Cloud backend configuration
├── .gitignore                     # Git exclusion rules
└── README.md                      # System documentation
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Auth Required | Access Level |
|--------|----------|-------------|---------------|--------------|
| `POST` | `/api/auth/register` | Register a new user account | No | Public |
| `POST` | `/api/auth/login` | Authenticate user & receive JWT token | No | Public |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile | Yes | Authenticated |
| `GET` | `/api/requests` | Fetch requests (user's own or all for Admin) | Yes | Authenticated |
| `POST` | `/api/requests` | Create a new service request | Yes | Authenticated |
| `GET` | `/api/requests/:id` | Fetch request details by ID | Yes | Owner / Admin |
| `PATCH` | `/api/requests/:id/status` | Update request status | Yes | Admin |
| `PATCH` | `/api/requests/:id/assign` | Assign request to support agent | Yes | Admin |
| `POST` | `/api/requests/:id/cancel` | Cancel a service request | Yes | Owner / Admin |
| `POST` | `/api/ai/analyze` | AI analysis for category & priority | Yes | Authenticated |
| `GET` | `/api/health` | Health check endpoint | No | Public |

---

## 💻 Local Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/vipin11111/service-request-management-system.git
cd service-request-management-system
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` in `server/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.zodxsio.mongodb.net/service-request-db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:3000
AI_PROVIDER=mock
AI_SERVICE_TOKEN=mock_secret
DB_SEED_MODE=active
```

Seed Database (Optional):
```bash
npm run seed
```

Start Backend:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env` in `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend:
```bash
npm run dev
```

Open: **`http://localhost:3000`**

---

## 🚀 Deployment Guide

### Deploying Backend to Render
1. Connect GitHub repository to [Render Dashboard](https://dashboard.render.com/).
2. Create **Web Service** with **Root Directory**: `server`.
3. Set **Build Command**: `npm install && npm run build`
4. Set **Start Command**: `npm start`
5. Configure Environment Variables (`PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`).

### Deploying Frontend to Vercel
1. Import repository to [Vercel Dashboard](https://vercel.com/).
2. Set **Root Directory**: `client` and Framework Preset: `Vite`.
3. Set Environment Variable `VITE_API_URL` = `https://service-request-management-backend.onrender.com/api`.
4. Deploy project. `client/vercel.json` will automatically handle SPA client-side routes.

---

## 🔧 Bug Fixes Completed

| Area | Issue Description | Solution Implemented |
|------|-------------------|----------------------|
| **Database** | Connection failures & timeout errors | Optimized Mongoose connection options and environment URI loading |
| **Security** | Plaintext password vulnerability | Implemented salted `bcryptjs` password hashing (rounds = 10) |
| **Security** | Registration role escalation vulnerability | Enforced public registration strictly to `USER` role |
| **Security** | BOLA / IDOR vulnerability on tickets | Verified ownership (`req.user.id === request.createdBy`) before returning request data |
| **Authentication** | Session lost after browser refresh (`F5`) | Added `GET /api/auth/me` endpoint and session restoration in `AuthContext` |
| **Authentication** | Token mismatch in HTTP headers | Configured Axios request interceptor to automatically attach `Bearer ${token}` |
| **CORS** | Browser CORS rejection on POST requests | Expanded CORS options to support dynamic origins, methods (`GET, POST, PUT, PATCH, DELETE, OPTIONS`), and headers |
| **AI Integration** | Route and field mismatch | Fixed endpoint path to `/api/ai/analyze` and aligned response property mapping |
| **AI Integration** | Invalid priority enum value | Mapped AI response values to valid schema enums (`LOW`, `MEDIUM`, `HIGH`, `URGENT`) |
| **Error Handling** | Server crash on uncaught controller errors | Wrapped all controller functions in `try/catch` with explicit `console.error(err)` logging |
| **Routing** | Page refresh 404 error on Vercel | Created `client/vercel.json` with SPA rewrite rules to `index.html` |

---

## 🚀 Future Improvements

- [ ] Integrate OpenAI GPT / Google Gemini API for real-time generative AI ticket suggestions.
- [ ] Implement file attachment uploads (AWS S3 / Cloudinary) for screenshots.
- [ ] Add real-time notifications via WebSockets / Socket.io.
- [ ] Containerize application with Docker & Docker Compose.
- [ ] Setup GitHub Actions CI/CD workflow for continuous testing.

---

## 👨‍💻 Author

**Vipin Zingade**
- GitHub: [https://github.com/vipin11111](https://github.com/vipin11111)

---

## ⭐ Star the Repository
If you found this project helpful, please consider giving it a star on GitHub!
