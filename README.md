# Express.js Starter Template

A production-ready Express.js starter template built for rapidly bootstrapping scalable Node.js APIs. It follows the MVC (Model-View-Controller) architecture and comes pre-configured with MongoDB, JWT authentication dependencies, centralized error handling, and a clean project structure.

## 🚀 Features

* **MVC Architecture** for maintainable and scalable applications.
* **Express 5** with modern ESM support.
* **MongoDB + Mongoose** integration.
* **JWT Authentication Ready**.
* **Centralized Error Handling** with custom error middleware.
* **Async Error Wrapper** to eliminate repetitive try-catch blocks.
* **Cookie Parsing & CORS** pre-configured.
* **Environment Variable Management** using dotenv.
* **Health Check Endpoint** included.
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
│   │   └── db.js
│   │
│   ├── controllers/
│   │
│   ├── middlewares/
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── utils/
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

## 🔧 Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=5000

MONGO_URL=mongodb://127.0.0.1:27017/express_template

CLIENT_URL=http://localhost:5173

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret
```

---

## 📜 Available Scripts

Run the development server with hot reload:

```bash
npm run dev
```

Run the application in production mode:

```bash
npm start
```

---

## ❤️ Built-in Utilities

### Global Error Handling

Handle application errors consistently using centralized middleware.

### Async Error Wrapper

Avoid repetitive try-catch blocks in controllers.

### Health Check Endpoint

```http
GET /health
```

Response:

```json
{
  "status": "healthy",
  "uptime": 120
}
```

---

## 🛠️ How to Extend

### Add a New Resource

1. Create a model inside `models/`
2. Create controller functions inside `controllers/`
3. Create routes inside `routes/`
4. Register the router in `app.js`

### Authentication

JWT-related dependencies are already included:

* jsonwebtoken
* bcrypt
* cookie-parser

You can quickly build authentication and authorization flows on top of the existing structure.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

If you find this template useful, consider giving the repository a ⭐.

---

## 📄 License

This project is licensed under the MIT License.
