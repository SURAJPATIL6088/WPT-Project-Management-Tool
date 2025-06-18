# 📁 ASTRA – A Smart MERN-based Project Management Tool 🚀

**ASTRA** is a robust and user-friendly full-stack web application designed to simplify project and task management. Built using the powerful **MERN stack**, it enables users to create, assign, and track projects and tasks effortlessly.

> This project was developed as part of the **WPT module** during my C-DAC course.

---

## 🖥️ Features

✅ Create and manage multiple projects  
✅ Add tasks to projects with status tracking  
✅ Secure JWT-based user authentication  
✅ Role-based dashboard for Admins and Contributors  
✅ Real-time progress updates and status indicators  
✅ Fully responsive design with a clean and modern UI  

---

## 🛠 Technologies Used

### 🔹 Frontend
- React.js
- TailwindCSS
- Axios

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Database
- MySQL

### 🔹 Authentication
- JWT-based login and protected routes

---

## ✨ Project Highlights

- 🔐 **JWT Auth**: Built secure authentication and authorization flow
- 🧠 **REST APIs**: Created scalable APIs for project and task operations
- 📊 **Dynamic Dashboards**: Real-time status display of projects and tasks
- 🧩 **Reusable Components**: Designed modular React components for maintainability
- 📱 **Responsive UI**: Optimized for both desktop and mobile experiences

---

### API Endpoints : 

1. ```/api/auth```
    - POST : ```/api/auth/register```
    - POST : ```/api/auth/login```  

2. ```/api/users```
    - GET : ```/api/users/all-users```  

3. ```/api/projects```
    - GET : ```/api/projects/``` 
    - POST : ```/api/projects/``` 
    - PUT : ```/api/projects/:id``` 
    - DELETE : ```/api/projects/:id``` 
    - GET : ```/api/projects/:id``` 
    - GET : ```/api/projects/user/assigned``` 
