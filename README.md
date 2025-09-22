# Bootcamp Management System - Full Stack CRUD Application

A complete full-stack web application for managing bootcamps and courses with user authentication.

## 🚀 Live Demo

- **Frontend**: [https://crud-operations-qp2e62xhs-sai-nikhils-projects-adb845a3.vercel.app](https://crud-operations-qp2e62xhs-sai-nikhils-projects-adb845a3.vercel.app)
- **Backend API**: [https://bootcamp-backend-i157736i1-sai-nikhils-projects-adb845a3.vercel.app](https://bootcamp-backend-i157736i1-sai-nikhils-projects-adb845a3.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React** - UI Library
- **Vite** - Build Tool
- **React Router** - Routing
- **Context API** - State Management
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Multer** - File Upload

## ✨ Features

- 🔐 **User Authentication** (Register/Login/Logout)
- 👤 **User Roles** (Admin/User)
- 🏫 **Bootcamp Management** (CRUD Operations)
- 📚 **Course Management** (CRUD Operations)
- 🔄 **Real-time Updates**
- 📱 **Responsive Design**
- 🛡️ **Protected Routes**
- 📸 **Image Upload**

## 🏗️ Project Structure

```
├── bootcamp_backend/          # Node.js/Express Backend
│   ├── Config/               # Database & App Configuration
│   ├── controllers/          # Route Controllers
│   ├── middlewares/          # Custom Middlewares
│   ├── Models/              # Mongoose Models
│   ├── Routes/              # API Routes
│   └── server.js            # Entry Point
├── crud_operations/          # React Frontend
│   ├── src/
│   │   ├── components/      # React Components
│   │   ├── context/         # Context API
│   │   └── routing/         # Route Configuration
│   └── public/              # Static Assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Git

### Backend Setup
```bash
cd bootcamp_backend
npm install
npm start
```

### Frontend Setup
```bash
cd crud_operations
npm install
npm run dev
```

## 📋 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/logout` - Logout user

### Bootcamps
- `GET /api/v1/bootcamps` - Get all bootcamps
- `POST /api/v1/bootcamps` - Create bootcamp
- `GET /api/v1/bootcamps/:id` - Get single bootcamp
- `PUT /api/v1/bootcamps/:id` - Update bootcamp
- `DELETE /api/v1/bootcamps/:id` - Delete bootcamp

### Courses
- `GET /api/v1/bootcamps/:bootcampId/courses` - Get courses for bootcamp
- `POST /api/v1/bootcamps/:bootcampId/courses` - Add course to bootcamp

## 🔧 Environment Variables

Create `.env` files in both frontend and backend:

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 👨‍💻 Author

**Sai Nikhil**
- GitHub: [@SaiNikhil862](https://github.com/SaiNikhil862)
- Email: sainikhilgoud103@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Thanks to all the open-source libraries used in this project
- Special thanks to the React and Node.js communities

---

⭐ **If you found this project helpful, please give it a star!** ⭐