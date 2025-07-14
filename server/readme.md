# 📘 Personal Notes & Bookmark Manager – Backend

A RESTful API built with **Node.js**, **Express**, and **MongoDB** to manage user authentication, personal notes, and bookmarks (with tags, search, filters, favorites, and metadata support).

---

## 🚀 Features

- ✅ JWT-based user authentication (cookies)
- ✅ Notes CRUD with tag filtering and search
- ✅ Bookmarks CRUD with URL validation, tag filters, and search
- ✅ Favorite notes & bookmarks
- ✅ Auto-fetch metadata from bookmark URLs (optional)
- ✅ Zod-based request validation
- ✅ Proper HTTP status codes and centralized error handling

---

## 🧱 Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Zod** (validation)
- **jsonwebtoken**, **cookie-parser**, **dotenv**
- **CORS** enabled for frontend-backend communication

---

## 📁 Folder Structure

```
📦 backend
├── controllers/       # Route handlers
├── routes/            # Express routers
├── models/            # Mongoose schemas
├── middlewares/       # Auth & error handling middleware
├── schemas/           # Zod validation schemas
├── utils/             # Helpers (tokens, hashing, responses)
├── app.ts             # Express app setup
├── index.ts           # Server entry point
└── .env               # Environment config
```

---

## 🔧 Setup Instructions

### 1. **Clone the Repository**

```bash
git clone https://github.com/suvasis-patra/noteapp
cd noteapp
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Environment Variables**

Create a `.env` file:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/bookmark_manager
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

> ✅ Make sure MongoDB is running locally or provide a cloud URI.

---

## 🏁 Start the Server

```bash
npm run dev   # For development
```

---

## 🌐 API Endpoints

### 🔐 Auth

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| POST   | `/api/v1/users/register` | Register new user |
| POST   | `/api/v1/users/login`    | Login user        |
| GET    | `/api/v1/users/me`       | Get current user  |
| POST   | `/api/v1/users/logout`   | Logout user       |

### 📓 Notes

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| GET    | `/api/v1/notes`     | Get all notes (filter by q, tags) |
| POST   | `/api/v1/notes`     | Create a new note                 |
| GET    | `/api/v1/notes/:id` | Get a note by ID                  |
| PUT    | `/api/v1/notes/:id` | Update a note                     |
| DELETE | `/api/v1/notes/:id` | Delete a note                     |

### 🔖 Bookmarks

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/api/v1/bookmarks`     | Get all bookmarks (filterable) |
| POST   | `/api/v1/bookmarks`     | Add a new bookmark             |
| GET    | `/api/v1/bookmarks/:id` | Get bookmark by ID             |
| PUT    | `/api/v1/bookmarks/:id` | Update a bookmark              |
| DELETE | `/api/v1/bookmarks/:id` | Delete a bookmark              |

> All `/notes` and `/bookmarks` endpoints require login (JWT cookie).

---

## 🔒 Auth & Cookie Notes

- Cookies are sent using `withCredentials: true` from frontend.
- CORS is configured to allow credentials and requests from the frontend origin.

---

## 📄 License

MIT License – free for personal or commercial use.

---

## 🗓 Last Updated

July 14, 2025
