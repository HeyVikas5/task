# 🚀 Deploy Todo App to Render

## Prerequisites
- GitHub account with the repository pushed
- MongoDB Atlas account (free tier)
- Render account (free tier)

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free M0 tier)
4. Go to **Database Access** → Create a database user
   - Username: `todouser` (or your choice)
   - Password: Generate a secure password
   - Save these credentials!
5. Go to **Network Access** → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for Render to connect
6. Go to **Database** → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Should look like: `mongodb+srv://todouser:yourpassword@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority`

## Step 2: Deploy Backend to Render

### Option A: Deploy via Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `todo-api` (or your choice)
   - **Region**: Oregon (US West) or closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend/todo-app/backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add these variables:
     ```
     NODE_ENV = production
     MONGODB_URI = mongodb+srv://todouser:yourpassword@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
     PORT = 5000
     FRONTEND_URL = https://your-frontend-url.netlify.app
     ```

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. Once deployed, copy your backend URL (e.g., `https://todo-api-xxxx.onrender.com`)

### Option B: Deploy via Blueprint (render.yaml)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the repository with `render.yaml`
5. Configure environment variables when prompted
6. Click **"Apply"**

## Step 3: Deploy Frontend to Netlify

1. Update frontend API URL:
   - Edit `frontend/js/app.js`
   - Change `API_BASE_URL` to your Render backend URL:
     ```javascript
     const API_BASE_URL = 'https://todo-api-xxxx.onrender.com/api';
     ```

2. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin main
   ```

3. Go to [Netlify](https://app.netlify.com/)
4. Click **"Add new site"** → **"Import an existing project"**
5. Choose GitHub and select your repository
6. Configure build settings:
   - **Base directory**: `backend/todo-app/frontend`
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (current directory)
7. Click **"Deploy site"**
8. Once deployed, copy your frontend URL

4. Update Render environment variable:
   - Go back to Render dashboard
   - Open your backend service
   - Go to **Environment** tab
   - Update `FRONTEND_URL` with your Netlify URL
   - Save changes (service will redeploy)

## Step 4: Test Your Deployment

1. Visit your Netlify frontend URL
2. Try creating a new todo
3. Check if it appears in the list
4. Test all CRUD operations (Create, Read, Update, Delete)

## Important Notes

### Free Tier Limitations

**Render Free Tier:**
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 50+ seconds
- 750 hours/month free (enough for one service)

**Solutions:**
- Upgrade to paid plan ($7/month) for always-on service
- Use a uptime monitor service (like UptimeRobot) to ping every 10 minutes
- Accept the cold start delay

### Troubleshooting

**Backend not responding:**
- Check Render logs: Dashboard → Your Service → Logs
- Verify MongoDB connection string is correct
- Ensure MongoDB Network Access allows all IPs

**CORS errors:**
- Verify `FRONTEND_URL` environment variable is set correctly
- Check backend CORS configuration in `server.js`

**Frontend can't connect to backend:**
- Verify API_BASE_URL in `app.js` matches your Render URL
- Check browser console for errors
- Ensure backend is deployed and running

### Environment Variables Checklist

Backend (Render):
- ✅ NODE_ENV = production
- ✅ MONGODB_URI = (your MongoDB connection string)
- ✅ PORT = 5000
- ✅ FRONTEND_URL = (your Netlify URL)

### Useful Commands

Check backend health:
```bash
curl https://your-render-url.onrender.com/health
```

Check API endpoint:
```bash
curl https://your-render-url.onrender.com/api/todos
```

Create a todo via API:
```bash
curl -X POST https://your-render-url.onrender.com/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","completed":false}'
```

## Alternative: Deploy Both on Render

You can also deploy the frontend as a static site on Render:

1. Create new Static Site on Render
2. Connect your repository
3. Configure:
   - **Root Directory**: `backend/todo-app/frontend`
   - **Build Command**: (leave empty)
   - **Publish Directory**: `.`
4. Deploy

## Keep Backend Alive (Optional)

To prevent Render free tier from spinning down:

1. Sign up for [UptimeRobot](https://uptimerobot.com/) (free)
2. Add new monitor:
   - Type: HTTP(s)
   - URL: `https://your-render-url.onrender.com/health`
   - Monitoring interval: 5 minutes
3. This will ping your backend every 5 minutes keeping it alive

## Cost Summary

**Free Option:**
- MongoDB Atlas: Free M0 tier
- Render Backend: Free tier (with spin-down)
- Netlify Frontend: Free tier
- **Total: $0/month**

**Recommended Option:**
- MongoDB Atlas: Free M0 tier
- Render Backend: Starter plan ($7/month)
- Netlify Frontend: Free tier
- **Total: $7/month**

## Success! 🎉

Your todo app is now live and accessible from anywhere in the world!

- Frontend: `https://your-app.netlify.app`
- Backend API: `https://todo-api-xxxx.onrender.com`
- Database: MongoDB Atlas

## Need Help?

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Netlify Documentation](https://docs.netlify.com/)
