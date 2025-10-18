# 🧠 SmartTask — Full-Stack Task Manager (React + Spring Boot + AWS)

SmartTask is a full-stack web application that helps users manage daily tasks efficiently.  
Built using **React + Spring Boot + PostgreSQL + AWS**, it demonstrates full-stack architecture, secure authentication, and CRUD APIs — perfect for portfolio and freelancing gigs.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React (Vite) + TailwindCSS |
| Backend | Spring Boot 3 + Maven |
| Database | PostgreSQL |
| Deployment | AWS EC2 / S3 |
| Auth | JWT (Spring Security) |

---

## ✨ Core Features
- ✅ User Registration & JWT-based Login
- ✅ Create / Edit / Delete / Mark Tasks
- ✅ Filter & Search Tasks
- ✅ Responsive React UI
- ✅ AWS Deployment (planned)

---

## 🧩 Project Structure

<pre> ```bash fullstack-taskmanager/ ├── backend/ │ ├── src/ │ ├── pom.xml │ └── README.md ├── frontend/ │ ├── src/ │ ├── package.json │ └── README.md ├── docs/ │ ├── architecture.md │ └── api-spec.md └── README.md ``` </pre>

---

## ⚙️ Setup Instructions

### 1️⃣ Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
API runs at: http://localhost:8080

2️⃣ Frontend
```
cd frontend
npm install
npm run dev
```

App runs at: http://localhost:5173

3️⃣ Database

Create PostgreSQL DB:
```
CREATE DATABASE taskmanager_db;
```

Update credentials in application.properties.

🌐 API Preview
| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | User login        |
| GET    | `/api/tasks`         | Get all tasks     |
| POST   | `/api/tasks`         | Create a new task |
| PUT    | `/api/tasks/{id}`    | Update a task     |
| DELETE | `/api/tasks/{id}`    | Delete a task     |


| Day   | Task                                            |
| ----- | ----------------------------------------------- |
| Day 1 | Setup Spring Boot skeleton (Auth + Task models) |
| Day 2 | Setup React project + routing                   |
| Day 3 | Connect frontend ↔ backend (CRUD)               |
| Day 4 | Add JWT login / auth guards                     |
| Day 5 | Polish UI + test locally                        |
| Day 6 | Prepare AWS deployment                          |
| Day 7 | Write blog + demo video                         |


👤 Author

[Devnite]
💼 Full-Stack & GenAI Developer
🌐 Portfolio: coming soon

