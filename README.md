# Service Request Management System

A production-ready full-stack **Service Request Management System** built with **React 18, TypeScript, Express.js, Node.js, MongoDB Atlas, and JWT Authentication**.

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/vipin11111/service-request-management-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

---

## Live Demo

- **Frontend (Vercel)**:  
  [https://service-request-management-system.vercel.app](https://service-request-management-system.vercel.app)

- **Backend API (Render)**:  
  [https://service-request-management-backend.onrender.com/api](https://service-request-management-backend.onrender.com/api)

- **GitHub Repository**:  
  [https://github.com/vipin11111/service-request-management-system](https://github.com/vipin11111/service-request-management-system)

---

## Features

### 🔐 Authentication & Security
- **User Registration & Login**: Secure authentication with salted `bcryptjs` password hashing.
- **Stateless JWT Authorization**: Bearer token authentication with configurable expiration.
- **Session Persistence**: Automatic session restoration via `GET /api/auth/me` on page refresh.
- **Role-based Access Control**: Strict access boundaries between `USER` and `ADMIN` roles.

### 🎫 Service Request Management
- **Ticket Submission**: Multi-field form with optional AI recommendations auto-fill.
- **Interactive Dashboards**: Live metrics tracking total, open, in-progress, resolved, and cancelled tickets.
- **Ticket Details & Audit Log**: Real-time status history timeline with change notes and timestamps.
- **Ticket Cancellation & Deletion**: Users and Admins can cancel or delete tickets with immediate UI updates.
- **Full MongoDB CRUD Operations**: Complete Create, Read, Update (Status & Assignee), and Delete support.

### 🛡️ Admin Portal
- **Global Requests Oversight**: Unified view of all tickets submitted across the organization.
- **Agent Assignment**: Assign support tickets to representatives.
- **Lifecycle Management**: Transition ticket statuses through resolution.

### 🤖 AI Request Analysis
- **Automated Text Processing**: Analyzes title and description content.
- **Category & Priority Inference**: Predicts appropriate category (`SOFTWARE`, `HARDWARE`, `NETWORK`, `ACCESS`, `OTHER`) and priority (`LOW`, `MEDIUM`, `HIGH`, `URGENT`) with reasoning.

---

## Technologies Used

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, React Router DOM v6, Axios, Lucide React Icons
- **Backend**: Node.js, Express.js, TypeScript, Mongoose ODM, JSON Web Token (`jsonwebtoken`), `bcryptjs`, CORS, `dotenv`
- **Database**: MongoDB Atlas (Cloud Cluster)
- **Deployment**: Vercel (Frontend SPA), Render (Backend Node.js Web Service)

---

## Installation & Local Setup

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)
- MongoDB Atlas cluster connection string (or local MongoDB daemon)

### 1. Clone Repository
```bash
git clone https://github.com/vipin11111/service-request-management-system.git
cd service-request-management-system
```

### 2. Install Dependencies
```bash
# Install workspace dependencies for root, client, and server
npm install
```

### 3. Environment Setup
Create `.env` file inside the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/service-request-db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:3000
AI_PROVIDER=mock
AI_SERVICE_TOKEN=mock_secret
```

Create `.env` file inside the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database (Optional)
Populate initial demo users (`user@example.com` / `admin@example.com` with password `Password123!`):
```bash
npm run seed
```

### 5. Run Local Development Server
```bash
npm run dev
```
- Client runs on: `http://localhost:3000` (or `http://localhost:5173`)
- Server runs on: `http://localhost:5000`

---

## Environment Variables

| Variable | Scope | Description | Default |
| :--- | :--- | :--- | :--- |
| `PORT` | Server | HTTP Port for Express app | `5000` |
| `MONGODB_URI` | Server | MongoDB Atlas connection string | Required |
| `JWT_SECRET` | Server | Secret string used to sign JWT tokens | Required |
| `JWT_EXPIRES_IN` | Server | Expiration window for JWT tokens | `1d` |
| `CLIENT_ORIGIN` | Server | Allowed CORS origin for frontend | `http://localhost:3000` |
| `AI_PROVIDER` | Server | AI Engine Provider mode (`mock` or `openai`) | `mock` |
| `AI_SERVICE_TOKEN` | Server | Token for AI provider | `mock_secret` |
| `VITE_API_URL` | Client | Backend API endpoint URL | `/api` |

---

## Deployment

### Deploy Backend to Render
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository: `vipin11111/service-request-management-system`.
3. Set **Root Directory**: `server`
4. Set **Build Command**: `npm install && npm run build`
5. Set **Start Command**: `node dist/index.js`
6. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_ORIGIN=https://YOUR-VERCEL-APP.vercel.app`).

### Deploy Frontend to Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Set **Root Directory**: `client` (or use root with included `vercel.json`).
3. Set **Framework Preset**: `Vite`
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Add Environment Variable: `VITE_API_URL=https://YOUR-RENDER-APP.onrender.com/api`

---

## API Endpoints

### 🔐 Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Protected | Fetch current logged-in user profile |

### 🎫 Service Request Routes (`/api/requests`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/requests` | Protected | Get service requests (Admin gets all, User gets own) |
| `POST` | `/api/requests` | Protected | Create a new service request |
| `GET` | `/api/requests/:id` | Protected | Fetch detailed service request by ID |
| `PATCH` | `/api/requests/:id/status` | Protected | Update ticket status & log history |
| `PUT` | `/api/requests/:id/assign` | Protected | Assign ticket to an agent/admin |
| `POST` | `/api/requests/:id/cancel` | Protected | Cancel a service request |
| `DELETE` | `/api/requests/:id` | Protected | Delete a service request |

### 🤖 AI Routes (`/api/ai`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/analyze` | Public / Auth | Analyze request title & description for suggestions |
| `GET` | `/api/health` | Public | Server health check endpoint |

---

## Bug Fixes Completed

- **MongoDB Atlas Integration**: Verified connection handling and graceful error reporting in `db.ts`. Fixed Mongoose `ObjectId` conversion issues in `statusHistory` logging.
- **Authentication & JWT Session Persistence**: Fixed session restoration on page reload (`/auth/me`). Fixed authorization header extraction in `requireAuth` middleware.
- **Missing Delete Request Endpoint**: Implemented `deleteRequest` controller in `requestController.ts` and registered `DELETE /api/requests/:id` in `requestRoutes.ts`. Added delete UI actions in both Admin and User Dashboards.
- **HTTP Method Mismatch in Admin Dashboard**: Fixed status update call from `api.put` to `api.patch('/requests/:id/status')` to align frontend with backend route definition.
- **Dynamic Admin Dashboard Metrics**: Replaced static hardcoded numbers (`total: 35, open: 18...`) with real-time dynamic state calculations based on fetched MongoDB requests.
- **User Dashboard UI Cleanup & Auto-Refresh**: Removed leftover debug column header `"Created By (Leak)"`. Added automatic list re-fetching after ticket cancellation or deletion.
- **Route Protection**: Secured single ticket detail endpoint (`GET /api/requests/:id`) with `requireAuth` middleware to prevent unauthorized access.
- **CORS Configuration**: Configured Express CORS options to dynamically support `process.env.CLIENT_ORIGIN` and any Vercel domain (`*.vercel.app`).
- **SPA Refresh Routing**: Added `vercel.json` rewrite rules to redirect client-side route reloads to `index.html`.

---

## Folder Structure

```
service-request-management-system/
├── client/                      # React + Vite Frontend
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── api/                 # Axios instance with auth interceptors
│   │   ├── components/          # Reusable Navbar and UI components
│   │   ├── context/             # AuthContext provider and hook
│   │   ├── pages/               # Dashboards, Auth pages, Request forms
│   │   ├── types/               # TypeScript interfaces
│   │   ├── main.tsx             # Entrypoint & Router configuration
│   │   └── index.css            # Tailwind CSS imports
│   ├── package.json             # Frontend dependencies
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── tsconfig.json            # Client TypeScript config
│   ├── vercel.json              # Vercel SPA configuration
│   └── vite.config.ts           # Vite build & proxy setup
│
├── server/                      # Express + Node Backend
│   ├── src/
│   │   ├── config/              # MongoDB connection config (`db.ts`)
│   │   ├── controllers/         # Auth, Request, and AI controllers
│   │   ├── middleware/          # JWT Auth & Admin authorization middlewares
│   │   ├── models/              # Mongoose schemas (`User.ts`, `ServiceRequest.ts`)
│   │   ├── routes/              # Auth, Request, and AI API endpoints
│   │   ├── scripts/             # Database seed script (`seed.ts`)
│   │   └── index.ts             # Express app entrypoint & CORS setup
│   ├── package.json             # Backend dependencies
│   └── tsconfig.json            # Server TypeScript config
│
├── .gitignore                   # Excludes node_modules, dist, .env, logs
├── package.json                 # Root npm workspace config
├── render.yaml                  # Render deployment blueprint specification
├── vercel.json                  # Root Vercel deployment configuration
└── README.md                    # System documentation
```

---

## Future Improvements

- **Real-Time Updates**: Integrate WebSockets (`socket.io`) for live ticket status notifications.
- **File Attachments**: Support uploading screenshots and diagnostic logs (AWS S3 or Cloudinary).
- **Advanced AI Capabilities**: Connect OpenAI GPT-4 API for automated ticket resolution suggestions and automated responses.
- **Email Notifications**: Send email confirmations to users upon ticket status updates via Nodemailer/SendGrid.

---

## Author

**Vipin Zingade**  
GitHub: [https://github.com/vipin11111](https://github.com/vipin11111)
