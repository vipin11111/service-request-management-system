# 🚀 Service Request Management System

A production-ready full-stack **Service Request Management System** built with **React 18, TypeScript, Express.js, MongoDB Atlas, and JWT Authentication**.

This enterprise-grade application enables users to register, authenticate, create, and track IT support tickets with AI-assisted categorisation and priority assessment, while granting administrators complete oversight to manage, assign, and update service ticket lifecycles.

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
- **Development Tooling**: `ts-node-dev`

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
├── .gitignore                     # Git ignore definitions
└── README.md                      # Complete system documentation
```

---

# ⚙️ Installation & Environment Setup

## 1. Clone Repository

```bash
git clone git@github.com:vipin11111/service-request-management-system.git
cd service-request-management-system
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` inside `server/` (see `server/.env.example`):

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

Seed Database (Optional):
```bash
npm run seed
```

Start Development Server:
```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env` inside `client/` (see `client/.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend App:
```bash
npm run dev
```

Open application at: **`http://localhost:3000`**

---

# 📐 Project Architecture Diagram

```
+-----------------------------------------------------------------------+
|                           BROWSER / CLIENT                            |
|  +---------------------+   +---------------------+  +--------------+  |
|  |   React Components  |   |   AuthContext       |  | Axios Client |  |
|  +----------+----------+   +----------+----------+  +-------+------+  |
+-------------|-------------------------|---------------------|---------+
              |                         |                     |
              | Interceptor / Bearer    | JWT Session         | Proxy (/api)
              v                         v                     v
+-----------------------------------------------------------------------+
|                          EXPRESS BACKEND                              |
|  +-----------------------------------------------------------------+  |
|  | CORS Middleware (Origin: http://localhost:3000, Methods: ALL)   |  |
|  +--------------------------------+--------------------------------+  |
|                                   |                                   |
|  +--------------------------------v--------------------------------+  |
|  |                      Router / Controllers                       |  |
|  |  /api/auth  |  /api/requests  |  /api/ai  |  /api/auth/me       |  |
|  +--------------------------------+--------------------------------+  |
|                                   |                                   |
|  +--------------------------------v--------------------------------+  |
|  | JWT Middleware (Bearer Token Verification & req.user Injection) |  |
|  +--------------------------------+--------------------------------+  |
+-----------------------------------|-----------------------------------+
                                    | Mongoose ODM
                                    v
+-----------------------------------------------------------------------+
|                            DATABASE                                   |
|                      MongoDB Atlas Cluster                            |
|             (Collections: users, servicerequests)                     |
+-----------------------------------------------------------------------+
```

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

# 🔒 Security Improvements

- **Stateless JWT Authentication**: Secure signing and verification.
- **Salted Password Hashing**: `bcryptjs` hashing prevents rainbow table attacks.
- **Role-Based Access Control (RBAC)**: Middleware enforcement for Admin routes (`isAdmin`).
- **Object-Level Authorization (BOLA Prevention)**: Users can only view and modify their own tickets.
- **Environment Isolation**: No hardcoded secrets or database URIs in source code.
- **Protected Cross-Origin Resource Sharing**: Strict origin verification and header rules.

---

# 🧪 Testing & Verification Checklist

- [x] Register new user account.
- [x] Login with valid credentials and verify JWT return.
- [x] Refresh browser (`F5`) and confirm session retention via `/api/auth/me`.
- [x] Create a service request with AI suggestion auto-fill.
- [x] View ticket details and status history timeline.
- [x] Cancel user ticket and verify status update.
- [x] Login as Admin and view all organizational tickets.
- [x] Logout and verify token destruction in `localStorage`.

---

# 🚀 Future Improvements

- [ ] **Real AI Engine**: Integrate OpenAI GPT API or Google Gemini API.
- [ ] **Email & Push Notifications**: Send email updates on ticket status changes.
- [ ] **File Attachments**: Support screenshot uploads to AWS S3 / Cloudinary.
- [ ] **Analytics Dashboard**: Graphical reports on ticket resolution times.
- [ ] **Dockerization**: Containerize frontend, backend, and MongoDB with `docker-compose`.
- [ ] **CI/CD Pipeline**: Automated GitHub Actions workflow for linting and testing.

---

# 👨‍💻 Author

**Vipin Zingade**
- GitHub: [https://github.com/vipin11111](https://github.com/vipin11111)

---

## ⭐ Star the Repository
If you found this project helpful, please consider giving it a star on GitHub!
