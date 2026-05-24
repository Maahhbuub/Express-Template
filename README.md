# Express.js Project Template

A structured, production-ready Express.js project template designed to bootstrap new Node.js APIs quickly. It follows the MVC (Model-View-Controller) architecture and comes pre-configured with essential utilities like centralized error handling, async wrappers, and database connection setup.

## 🚀 Features

- **MVC Architecture**: Clear separation of concerns for scalable applications.
- **Centralized Error Handling**: Built-in custom `AppError` class and global `errorHandler` middleware.
- **Async Error Catching**: `catchAsync` wrapper to eliminate repetitive `try-catch` blocks in controllers.
- **Modular Routing**: Separated route definitions for cleaner code organization.
- **Database Ready**: Structure ready for database connectivity (`lib/db.js`).

## 📁 Project Structure

```text
├── app.js                   # Application entry point & Express app setup
├── config/                  # Environment variables and configuration files
├── controllers/             # Route handlers/business logic (e.g., users.js)
├── helper/                  # Reusable helper functions
├── lib/                     # Third-party integrations & setups (e.g., db.js)
├── middlewares/             # Custom Express middlewares (e.g., errorHandler.js)
├── models/                  # Database models/schemas (e.g., users.js)
├── routes/                  # API route declarations (e.g., users.js)
└── utils/                   # General utility classes and functions
    ├── appError.js          # Custom error class for operational errors
    └── catchAsync.js        # Wrapper for async functions to catch errors automatically
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm or yarn

### Installation

1. Copy this template folder for your new project.
2. Initialize your project and install the required dependencies (like `express`, `mongoose`/`pg`, etc.):
   ```bash
   npm init -y
   npm install express
   npm install dotenv
   npm install mongoose # or prisma for PostgreSQL
   # Install any other dependencies your specific project needs
   ```

### Running the Application

To start the server, open your terminal in the root directory and run:
```bash
node app.js
```
*(Tip: It is highly recommended to install `nodemon` for development and add a start script in your `package.json`.)*

## 💡 How to Use This Template

1. **Creating a New Resource**: 
   - Add a model in the `models/` folder.
   - Add business logic in the `controllers/` folder (wrapped in `catchAsync`).
   - Define endpoints in the `routes/` folder and link them to your controller functions.
   - Mount your new router inside `app.js`.
2. **Throwing Exceptions**: 
   Simply use `return next(new AppError('Item not found', 404));` from any controller, and the global error handler will take care of the rest.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).