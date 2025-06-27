# 📝 Taskify - Task Management Web Application

Taskify is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to manage their daily tasks efficiently. Users can register, log in, and create tasks with different **priorities** and **statuses**, and dynamically update or delete them as needed.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT Auth via HTTP-only cookies)
- 🧠 Add tasks with:
  - Title
  - Description
  - Priority: `Low`, `Medium`, `High`
  - Status: `Yet to Start`, `In Progress`, `Completed`
- 🧮 Categorized task display based on status
- 🔁 Update task status and priority dynamically
- 🗑 Delete any task
- ✅ Protected Routes using Middleware
- 📦 MongoDB data modeling using Mongoose

---

## 🛠️ Tech Stack

### 🔹 Frontend
- [React.js](https://reactjs.org/)
- Axios (API requests)
- React Router DOM (Page routing)
- Tailwind CSS (UI Styling)
- useState, useEffect (State & Lifecycle Management)

### 🔹 Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- cookie-parser (Cookie management)
- CORS (Cross-Origin Requests)

### 🔹 Database
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)

---

## 📁 Folder Structure

![image](https://github.com/user-attachments/assets/bba87af0-78f1-4f37-9e4d-72371c3f8086)


---

## 📦 Installation & Running Locally

### ⚙️ Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Git installed

### 🔄 Steps

#### 1. Clone the repository:
```bash
git clone https://github.com/your-username/taskify.git
cd taskify

2. Backend Setup:
bash
CopyEdit
cd server
npm install

Create .env file:


env
CopyEdit
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the backend server:


bash
CopyEdit
nodemon app.js

3. Frontend Setup:
bash
CopyEdit
cd client
npm install
npm start

Frontend runs at: http://localhost:3000
 Backend runs at: http://localhost:1000

🧪 API Endpoints
Method
Endpoint
Description
POST
/api/v1/users/register
Register a new user
POST
/api/v1/users/login
Login user and set JWT cookie
GET
/api/v1/users/userDetails
Fetch current user and tasks
GET
/logout
Logout user and clear cookie
POST
/api/v1/tasks/addTask
Add a new task
PUT
/api/v1/tasks/editTask/:id
Edit a task (priority/status)
DELETE
/api/v1/tasks/deleteTask/:id
Delete a task


🧠 Challenges Faced
Cookie-based JWT auth setup: Ensured tokens were securely stored as HTTP-only cookies.


Cross-Origin Requests: Properly configured CORS and Axios to handle cookie-based communication between ports 3000 and 1000.


Task Priority Display: Made sure task priority is stored, displayed, and editable from both frontend and backend with Mongoose validation.


User-Specific Tasks: Used MongoDB population to link tasks to individual users.
