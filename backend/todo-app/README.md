# 📝 Todo App - Full Stack CRUD Application

<div align="center">

![Todo App](https://img.shields.io/badge/Todo-App-blueviolet?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A beautiful, fully responsive Todo application with a powerful REST API backend built with Node.js, Express, MongoDB Atlas, and a stunning vanilla JavaScript frontend.

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 🌟 Features

### Backend (REST API)
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete todos
- 🔍 **Advanced Filtering** - Filter by completion status and priority
- 📊 **Statistics Endpoint** - Get todo analytics and insights
- ✨ **Input Validation** - Comprehensive validation with detailed error messages
- 🛡️ **Error Handling** - Global error handling middleware
- 🗄️ **MongoDB Atlas** - Cloud database integration
- 🔐 **CORS Enabled** - Secure cross-origin resource sharing
- 🎯 **Priority Levels** - Low, Medium, High priority support
- 📅 **Due Date Management** - Track task deadlines
- 🚀 **RESTful Design** - Industry-standard API architecture

### Frontend (UI)
- 🎨 **Beautiful Design** - Modern, gradient-based UI with smooth animations
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Real-time Updates** - Instant UI updates after each action
- 🎯 **Smart Filtering** - Filter tasks by All, Active, or Completed
- 📊 **Live Statistics** - Real-time task counters and completion rate
- 🔄 **Multiple Sort Options** - Sort by newest, oldest, or priority
- ✏️ **Inline Editing** - Edit tasks without page refresh
- 🎭 **Priority Badges** - Visual priority indicators with emojis
- ⏰ **Due Date Tracking** - Visual overdue indicators
- 🔔 **Toast Notifications** - Beautiful success/error notifications
- ⌨️ **Keyboard Shortcuts** - Productivity shortcuts (Ctrl+K, Escape)
- 🎪 **Smooth Animations** - Delightful micro-interactions
- 🌈 **Character Counters** - Real-time character count for inputs
- 🎨 **Custom Scrollbars** - Styled scrollbars for better UX

---

## 📸 Demo

### 🌐 Live Application

**Live URL:** [https://todo-7yx1.onrender.com/](https://todo-7yx1.onrender.com/)


---

### 🧪 Try the Live API

#### Get All Todos
```bash
GET https://todo-7yx1.onrender.com/api/todos

---

## 🏗️ Project Structure

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── models/
│   │   │   └── Todo.js               # Todo schema
│   │   ├── routes/
│   │   │   └── todos.js              # API routes
│   │   ├── middleware/
│   │   │   ├── errorHandler.js      # Error handling
│   │   │   └── validateTodo.js      # Input validation
│   │   └── server.js                 # Express app
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Dependencies
│   └── README.md                     # Backend documentation
├── frontend/
│   ├── css/
│   │   └── style.css                 # Styles
│   ├── js/
│   │   └── app.js                    # Main application logic
│   ├── index.html                    # Main HTML file
│   └── README.md                     # Frontend documentation
└── README.md                         # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB Atlas** account (free tier available)
- **Git** (for cloning the repository)
- Modern web browser

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/HeyVikas5/todo-app.git
cd todo-app
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your MongoDB Atlas URI
# nano .env  (or use any text editor)
```

**Set up your `.env` file:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Start the backend server:**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Server will run on: **http://localhost:5000**

#### 3. Frontend Setup

```bash
# Open a new terminal
cd frontend

# Option 1: Use Live Server (VS Code Extension)
# - Install "Live Server" extension in VS Code
# - Right-click on index.html and select "Open with Live Server"

# Option 2: Use Python HTTP Server
python -m http.server 3000

# Option 3: Use Node.js HTTP Server
npx http-server -p 3000

# Option 4: Use PHP Server
php -S localhost:3000
```

Frontend will run on: **http://localhost:3000**

#### 4. Configure API Connection

Update the `API_BASE_URL` in `frontend/js/app.js` if needed:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Todos
```http
GET /api/todos
```

**Query Parameters:**
- `completed` (optional): `true` | `false`
- `priority` (optional): `low` | `medium` | `high`
- `sort` (optional): `oldest` | `priority` | `newest` (default)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "673a5b2c8f9e1234567890ab",
      "title": "Complete project",
      "description": "Finish the todo app",
      "completed": false,
      "priority": "high",
      "dueDate": "2025-12-31T00:00:00.000Z",
      "createdAt": "2025-11-17T19:36:15.000Z",
      "updatedAt": "2025-11-17T19:36:15.000Z"
    }
  ]
}
```

#### 2. Get Single Todo
```http
GET /api/todos/:id
```

#### 3. Create Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "priority": "medium",
  "dueDate": "2025-12-31"
}
```

#### 4. Update Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated Task",
  "completed": true
}
```

#### 5. Delete Todo
```http
DELETE /api/todos/:id
```

#### 6. Get Statistics
```http
GET /api/todos/stats/summary
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "completed": 6,
    "active": 4,
    "completionRate": "60.00"
  }
}
```

For complete API documentation, see [backend/README.md](backend/README.md)

---

## 🗄️ MongoDB Atlas Setup

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" (M0) tier
   - Select your preferred region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password
   - Grant "Read and Write to any database" role

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP address

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and database name
   - Add to your `.env` file

**Example Connection String:**
```
mongodb+srv://vikas:mypassword123@cluster0.abc123.mongodb.net/todo-app?retryWrites=true&w=majority
```

---

## 🎨 Frontend Features

### Keyboard Shortcuts
- **Ctrl/Cmd + K** - Focus on task title input
- **Escape** - Cancel editing mode

### Filters
- **All** - Show all tasks
- **Active** - Show incomplete tasks
- **Completed** - Show completed tasks

### Sort Options
- **Newest First** - Recently created tasks first (default)
- **Oldest First** - Oldest tasks first
- **Priority** - High priority tasks first

### Priority Levels
- 🔴 **High** - Urgent tasks
- 🟡 **Medium** - Normal priority (default)
- 🟢 **Low** - Low priority tasks

---

## 🚀 Deployment

### Backend Deployment

#### Deploy to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
6. Add Environment Variables:
   - `MONGODB_URI`
   - `PORT`
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your frontend URL)
7. Click "Create Web Service"

#### Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Railway will auto-detect and deploy

#### Deploy to Cyclic

1. Go to [Cyclic](https://www.cyclic.sh/)
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy automatically

### Frontend Deployment

#### Deploy to Vercel

```bash
cd frontend
npx vercel
```

#### Deploy to Netlify

1. Drag and drop `frontend` folder to [Netlify](https://www.netlify.com/)
2. Or use Netlify CLI:
```bash
cd frontend
npx netlify deploy
```

#### Deploy to GitHub Pages

```bash
cd frontend
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/HeyVikas5/todo-app.git
git push -u origin gh-pages
```

**Important:** Update `API_BASE_URL` in `app.js` to your deployed backend URL!

---

## 🧪 Testing

### Test Backend API

**Using cURL:**
```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","priority":"high"}'

# Update a todo
curl -X PUT http://localhost:5000/api/todos/YOUR_TODO_ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a todo
curl -X DELETE http://localhost:5000/api/todos/YOUR_TODO_ID
```

**Using Postman:**
1. Import the API endpoints
2. Set `Content-Type: application/json` header
3. Test each endpoint

### Test Frontend
1. Open browser developer console (F12)
2. Check for any JavaScript errors
3. Test all CRUD operations
4. Test on different screen sizes
5. Test all filter and sort options

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Validation**: express-validator
- **Middleware**: CORS, Error Handler

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styles with CSS Grid/Flexbox
- **JavaScript (ES6+)** - Vanilla JS (no frameworks)
- **Font Awesome** - Icons
- **Google Fonts** - Poppins font family

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)
- ⚠️ IE11 (not supported)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (app.js)
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Cannot connect to MongoDB**
- Check your MongoDB Atlas connection string
- Ensure IP whitelist includes your IP or 0.0.0.0/0
- Verify username and password are correct
- Check if cluster is active

**2. CORS Error**
- Ensure `FRONTEND_URL` is set correctly in backend `.env`
- Check if CORS middleware is configured properly
- Verify frontend is making requests to correct backend URL

**3. Frontend not loading data**
- Check if backend server is running
- Verify `API_BASE_URL` in `app.js` matches your backend URL
- Open browser console for error messages
- Check network tab in developer tools

**4. Port already in use**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

