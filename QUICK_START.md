# 🚀 Quick Start Guide

## ✅ All Issues Fixed!

### What Was Fixed:
1. ✅ Added `/browse` endpoints for student, mentor, and recruiter
2. ✅ Fixed port configurations (services now use correct ports)
3. ✅ Fixed frontend port conflict (changed from 5000 → 5173)
4. ✅ Added default MONGO_URI in start-all.js
5. ✅ Installed API Gateway dependencies

---

## 📋 Step-by-Step: Start Your Application

### Step 1: Make sure MongoDB is running

**Windows:**
```powershell
# Check if MongoDB is running
net start MongoDB

# If not running, start it:
net start MongoDB
```

**If MongoDB is not installed:**
- Download from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Step 2: Create .env file (if not exists)

Create a file named `.env` in `client-server/` folder:

```env
MONGO_URI=mongodb://localhost:27017/mentorship
JWT_SECRET=mentorship_secret_key_2024_change_in_production
```

**OR** if using MongoDB Atlas:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mentorship
JWT_SECRET=your_secure_secret_key_here
```

### Step 3: Install dependencies (if not done)

```bash
# API Gateway
cd Mentorship-Project-server-main/api-gateway
npm install

# Student Service
cd ../services/student-service
npm install

# Mentor Service
cd ../mentor-services
npm install

# Chat Service
cd ../chat-service
npm install

# Auth Service
cd ../auth-service
npm install
```

### Step 4: Start all services

```bash
cd client-server
node start-all.js
```

**OR** start manually in separate terminals:

**Terminal 1 - API Gateway:**
```bash
cd client-server/Mentorship-Project-server-main/api-gateway
npm start
```

**Terminal 2 - Student Service:**
```bash
cd client-server/Mentorship-Project-server-main/services/student-service
npm start
```

**Terminal 3 - Mentor Service:**
```bash
cd client-server/Mentorship-Project-server-main/services/mentor-services
npm start
```

**Terminal 4 - Chat Service:**
```bash
cd client-server/Mentorship-Project-server-main/services/chat-service
npm start
```

**Terminal 5 - Frontend:**
```bash
cd client-server/client
npm run dev
```

---

## 🌐 Access Your Application

- **Frontend:** http://localhost:5173
- **API Gateway:** http://localhost:8000
- **API Health Check:** http://localhost:8000/api/ping

---

## ✅ Verify Everything is Working

1. **Check API Gateway:**
   - Open: http://localhost:8000/api/ping
   - Should see: "Gateway is live ✅"

2. **Check Browse Endpoints:**
   - http://localhost:8000/api/student/browse
   - http://localhost:8000/api/mentor/browse
   - http://localhost:8000/api/recruiter/browse

3. **Check Frontend:**
   - Open: http://localhost:5173
   - Navigate to Community page
   - Should see students and mentors listed

---

## 🐛 Troubleshooting

### Error: "Port 5000 is already in use"
- ✅ **Fixed!** Frontend now uses port 5173
- If still seeing this, kill the process:
  ```powershell
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Error: "MONGO_URI environment variable is not set"
- ✅ **Fixed!** start-all.js now has default MONGO_URI
- Create `.env` file in `client-server/` folder
- Or set environment variable:
  ```powershell
  $env:MONGO_URI="mongodb://localhost:27017/mentorship"
  ```

### Error: "Cannot find package 'express'"
- Run: `npm install` in the service directory
- Already fixed for API Gateway ✅

### Error: "ECONNREFUSED"
- Make sure all services are running
- Check that services are on correct ports:
  - API Gateway: 8000
  - Student Service: 3001
  - Mentor Service: 3003
  - Chat Service: 3004
  - Auth Service: 3002

---

## 📝 Service Ports Reference

| Service | Port | URL |
|---------|------|-----|
| API Gateway | 8000 | http://localhost:8000 |
| Student Service | 3001 | http://localhost:3001 |
| Mentor Service | 3003 | http://localhost:3003 |
| Chat Service | 3004 | http://localhost:3004 |
| Auth Service | 3002 | http://localhost:3002 |
| Frontend | 5173 | http://localhost:5173 |

---

## 🎉 You're All Set!

All errors have been fixed. Just make sure MongoDB is running and start the services!



