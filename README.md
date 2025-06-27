# 📝 Taskify - Task Management Web Application

Taskify is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to manage their daily tasks efficiently. Users can register, log in, and create tasks with different **priorities** and **statuses**, and dynamically update or delete them as needed.

---

##  Features

-  User Registration & Login (JWT Auth via HTTP-only cookies)
-  Add tasks with:
  - Title
  - Description
  - Priority: `Low`, `Medium`, `High`
  - Status: `Yet to Start`, `In Progress`, `Completed`
-  Categorized task display based on status
-  Update task status and priority dynamically
-  Delete any task
-  Protected Routes using Middleware
-  MongoDB data modeling using Mongoose

---

##  Tech Stack

###  Frontend
- [React.js](https://reactjs.org/)
- Axios (API requests)
- React Router DOM (Page routing)
- Tailwind CSS (UI Styling)
- useState, useEffect (State & Lifecycle Management)

###  Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- cookie-parser (Cookie management)
- CORS (Cross-Origin Requests)

###  Database
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)

---

##  Folder Structure
![image](https://github.com/user-attachments/assets/fce9edc7-56b1-43fb-a90a-d692b98dd319)
![image](https://github.com/user-attachments/assets/8a5fbbf0-f48b-4693-be63-a6b9f2d5f233)





---

##  Installation & Running Locally

###  Prerequisites
- Node.js and npm installed
- MongoDB Atlas account
- Git installed






 Challenges Faced  
 
Cookie-based JWT auth setup: Ensured tokens were securely stored as HTTP-only cookies.


Cross-Origin Requests: Properly configured CORS and Axios to handle cookie-based communication between ports 3000 and 1000.


Task Priority Display: Made sure task priority is stored, displayed, and editable from both frontend and backend with Mongoose validation.


User-Specific Tasks: Used MongoDB population to link tasks to individual users.
