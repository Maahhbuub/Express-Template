# Express.js Starter Template

A production-ready Express.js starter template for rapidly bootstrapping scalable Node.js REST APIs. Built with a clean **3-layer architecture** (Controller → Service → Repository), MongoDB, JWT authentication, centralized error handling, and modern ESM support.

## 🚀 Features

* **Layered Architecture** — Controller → Service → Repository for clean separation of concerns.
* **Express 5** with modern ESM (`import`/`export`) support.
* **MongoDB + Mongoose** integration.
* **JWT Authentication** — access token + refresh token flow out of the box.
* **Centralized Error Handling** with custom error middleware.
* **Async Error Wrapper** to eliminate repetitive try-catch blocks.
* **Request Validation** using Joi schemas with a validation middleware.
* **Cookie Parsing & CORS** pre-configured.
* **Environment Variable Management** using dotenv.
* **Health Check Endpoint** at `/api/health`.
* **Clean Folder Structure** for rapid project setup.

---

## ⚡ Quick Start

Create a new project using this template:

```bash
npx degit Maahhbuub/express-starter my-app
```

Navigate to the project:

```bash
cd my-app
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
copy .env.example .env
```

Start the development server:

```bash
npm run dev
```

---

## 📁 Project Structure

```text
.
├── src/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   │
│   ├── controllers/
│   │   └── auth.controller.js  # HTTP layer — parses req, sends res
│   │
│   ├── services/
│   │   └── auth.service.js     # Business logic — hashing, tokens, rules
│   │
│   ├── repositories/
│   │   └── user.repository.js  # Data layer — all Mongoose queries
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js      # JWT protect guard
│   │   ├── error.middleware.js     # Global error & invalid route handlers
│   │   └── validation.middleware.js
│   │
│   ├── models/
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   └── auth.routes.js
│   │
│   ├── utils/
│   │   ├── appError.js
│   │   ├── catchAsync.js
│   │   ├── generateTokens.js
│   │   └── tokenCookies.js
│   │
│   ├── validations/
│   │   └── user.validation.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🏗️ Architecture

This template follows a strict 3-layer architecture to keep each concern isolated and testable:

| Layer | Location | Responsibility |
|---|---|---|
| **Controller** | `src/controllers/` | Parse HTTP request, call service, shape response |
| **Service** | `src/services/` | Business logic — validation, hashing, token management |
| **Repository** | `src/repositories/` | Database access — all Mongoose queries live here |

### Adding a New Resource

1. Create a Mongoose model in `src/models/`
2. Create a repository in `src/repositories/` with all DB queries
3. Create a service in `src/services/` with business logic
4. Create a controller in `src/controllers/` to handle HTTP
5. Create routes in `src/routes/` and register in `app.js`

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
PORT=5000

MONGO_URL=mongodb://127.0.0.1:27017/express_template
CLIENT_URL=http://localhost:5173
NODE_ENV=development

ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d
```

---

## 🔐 Auth API Endpoints

All auth routes are prefixed with `/api/auth`.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | No | Register a new user |
| `POST` | `/api/auth/login` | No | Login and receive tokens |
| `POST` | `/api/auth/refresh-token` | No | Refresh the access token |
| `POST` | `/api/auth/logout` | Yes | Logout and clear session |
| `GET` | `/api/auth/me` | Yes | Get current user info |

### Authentication Flow

- On login/register, an **access token** is returned in the response body and a **refresh token** is set as an `httpOnly` cookie.
- Include the access token as `Authorization: Bearer <token>` on protected routes.
- When the access token expires, call `POST /api/auth/refresh-token` to obtain a new one.

---

## ❤️ Built-in Utilities

### `catchAsync`
Wraps async route handlers to automatically forward errors to the global error middleware — no try-catch needed.

### `AppError`
Custom error class that carries an HTTP `statusCode` for consistent error responses.

### `generateTokens`
Generates signed JWT access and refresh tokens from a user ID.

### Health Check

```http
GET /api/health
```

Response:

```json
{
  "status": "healthy",
  "uptime": 120
}
```

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Starts server with hot reload |
| Production | `npm start` | Runs the server in production mode |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you find this template useful, consider giving the repository a ⭐.

---

## 📄 License

This project is licensed under the MIT License.
