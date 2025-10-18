# 🏗️ SmartTask Architecture & Design

## 1️⃣ Overview
SmartTask is a MERA (Modern Enterprise React + API) stack app — combining Spring Boot backend with React frontend and PostgreSQL storage.

---

## 2️⃣ Architecture Diagram

+-------------------+ +--------------------+ +----------------+
| React Frontend | <---> | Spring Boot API | <---> | PostgreSQL DB |
| (Axios Requests) | | (Controller/Repo) | | (task data) |
+-------------------+ +--------------------+ +----------------+


---

## 3️⃣ Modules

### Backend
- **Controller:** Handles REST endpoints  
- **Service:** Business logic  
- **Repository:** JPA interface for DB  
- **Model:** Entities → `User`, `Task`  
- **Security:** JWT Auth, password hashing  

### Frontend
- **Pages:** Login, Dashboard, Tasks  
- **Components:** TaskCard, Navbar, Filters  
- **State:** React Context / Redux (optional)  
- **API:** Axios service layer  

---

## 4️⃣ Database Design

**Tables**

**User**
| Field | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique ID |
| username | VARCHAR(50) | Login name |
| password | VARCHAR(255) | Hashed password |

**Task**
| Field | Type | Description |
|--------|------|-------------|
| id | SERIAL PK | Unique ID |
| title | VARCHAR(100) | Task title |
| description | TEXT | Details |
| status | BOOLEAN | Completed? |
| user_id | FK(User.id) | Owner |

---

## 5️⃣ API Flow

1. User registers → JWT token generated  
2. Login → token validated on each request  
3. CRUD operations for `/api/tasks` using token  
4. React frontend uses Axios with Auth header  

---

## 6️⃣ Future Enhancements
- ✅ Deploy to AWS EC2 + S3  
- ✅ Add pagination + sorting  
- ✅ Add email notifications  
- ✅ Convert to PWA  

---

## 7️⃣ References
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
