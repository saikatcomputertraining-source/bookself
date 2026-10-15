# 📚 Bookshelf Manager Application

A full-stack web application designed to help users organize, track, and manage their personal reading collection effortlessly. Built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features

- **Add Books**: Easily add books to your shelf with title and author details.
- **Reading Status Tracking**: Toggle between `read` and `unread` status with a single click.
- **Delete Books**: Remove books from your collection instantly.
- **Live Notifications**: Integrated toast notifications (via `react-toastify`) for real-time operation feedback.
- **Modern UI**: Clean, responsive layout crafted with Tailwind CSS v4.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Bundler & Tooling**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Notifications**: [React-Toastify](https://fkhadra.github.io/react-toastify/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database ODM**: [Mongoose](https://mongoosejs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Middleware**: [CORS](https://github.com/expressjs/cors)
- **Dev Utility**: [Nodemon](https://nodemon.io/)

---

## 📁 Project Structure

```text
bookshelf-manager-02/
├── client/                     # Frontend client (Vite + React)
│   ├── src/
│   │   ├── assets/             # Static assets (images, icons)
│   │   ├── components/         # Reusable React components (e.g. Book.jsx)
│   │   ├── pages/              # Application pages (e.g. Home.jsx)
│   │   ├── main.jsx            # React root mount point
│   │   ├── router.jsx          # Route configurations
│   │   └── index.css           # Global stylesheet & Tailwind directives
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend API server (Express + Mongoose)
│   ├── index.js                # Server entry point, DB connection & API routes
│   └── package.json
├── .gitignore
└── readme.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.x or later recommended)
- **npm** (comes with Node.js)
- **MongoDB Atlas** or MongoDB local instance

---

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd bookshelf-manager-02
```

#### 2. Setup and Run Backend Server
Navigate to the `server` directory, install dependencies, and start the development server:

```bash
cd server
npm install
npm run dev
```

> **Note**: The backend server runs on `http://localhost:5000` by default and connects to MongoDB Atlas (`bookShelf` database) or custom URI via `MONGODB_URI` environment variable.

#### 3. Setup and Run Frontend Client
In a new terminal window, navigate to the `client` directory, install dependencies, and launch the Vite development server:

```bash
cd client
npm install
npm run dev
```

> The client will typically start at `http://localhost:5173`. Open this URL in your web browser.

---

## 📡 API Reference

Base URL: `http://localhost:5000`

### 1. Get All Books
- **Endpoint**: `GET /all-books`
- **Description**: Retrieves all books saved in the database.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "660c1d7e...",
        "title": "Atomic Habits",
        "author": "James Clear",
        "status": "unread",
        "__v": 0
      }
    ]
  }
  ```

### 2. Add a Book
- **Endpoint**: `POST /add-book`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "Clean Code",
    "author": "Robert C. Martin"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "660c1d7e...",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "status": "unread"
    }
  }
  ```

### 3. Update Book Status
- **Endpoint**: `PATCH /books/:id/status`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "status": "read"
  }
  ```
  *(Status must be either `"read"` or `"unread"`)*
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "660c1d7e...",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "status": "read"
    }
  }
  ```

### 4. Delete a Book
- **Endpoint**: `DELETE /books/:id`
- **Description**: Deletes a book by its MongoDB ObjectId.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "660c1d7e...",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "status": "read"
    }
  }
  ```

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

