# 📝 To-Do API Backend

A robust RESTful API for managing to-do items built with Node.js, Express, and MongoDB Atlas.

## 🚀 Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 🔍 Filter todos by completion status and priority
- 📊 Get todo statistics
- ✨ Input validation with detailed error messages
- 🛡️ Comprehensive error handling
- 🗄️ MongoDB Atlas integration
- 📱 CORS enabled for frontend integration
- 🎯 Priority levels (low, medium, high)
- 📅 Due date support

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Update the `.env` file with your MongoDB Atlas connection string

4. **MongoDB Atlas Setup**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account or sign in
   - Create a new cluster (free tier M0)
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and database name in your `.env` file

## 🏃 Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

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
- `completed` (optional): `true` or `false`
- `priority` (optional): `low`, `medium`, or `high`
- `sort` (optional): `oldest`, `priority`, or default (newest)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65abc123...",
      "title": "Complete project",
      "description": "Finish the todo app",
      "completed": false,
      "priority": "high",
      "dueDate": "2025-12-31T00:00:00.000Z",
      "createdAt": "2025-11-17T18:55:52.000Z",
      "updatedAt": "2025-11-17T18:55:52.000Z"
    }
  ]
}
```

#### 2. Get Single Todo
```http
GET /api/todos/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "title": "Complete project",
    "description": "Finish the todo app",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-11-17T18:55:52.000Z"
  }
}
```

#### 3. Create Todo
```http
POST /api/todos
```

**Request Body:**
```json
{
  "title": "New Todo",
  "description": "Todo description (optional)",
  "completed": false,
  "priority": "medium",
  "dueDate": "2025-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "65abc123...",
    "title": "New Todo",
    "completed": false,
    "priority": "medium",
    "createdAt": "2025-11-17T18:55:52.000Z"
  }
}
```

#### 4. Update Todo
```http
PUT /api/todos/:id
```

**Request Body:**
```json
{
  "title": "Updated Todo",
  "completed": true,
  "priority": "low"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "65abc123...",
    "title": "Updated Todo",
    "completed": true,
    "priority": "low"
  }
}
```

#### 5. Delete Todo
```http
DELETE /api/todos/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {}
}
```

#### 6. Get Todo Statistics
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

## 📊 Data Schema

```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  completed: Boolean (default: false),
  priority: String ['low', 'medium', 'high'] (default: 'medium'),
  dueDate: Date (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🛡️ Error Handling

All errors return a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Server Error

## 🚀 Deployment

### Deploy to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com/)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set environment variables in Render dashboard
6. Deploy!

### Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables
5. Deploy!

### Deploy to Cyclic

1. Go to [Cyclic](https://www.cyclic.sh/)
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy!

## 🧪 Testing the API

**Using cURL:**
```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","completed":false}'
```

**Using Postman:**
- Import the endpoints into Postman
- Test each endpoint with different parameters

## 📝 Environment Variables

```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**HeyVikas5**

---

**Happy Coding! 🎉**