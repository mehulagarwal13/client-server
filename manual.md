Follow these steps to run the entire project:

### 🚀 Quick Start Summary

### Step 1: Go to the project root
cd CLIENT-SERVER

### Step 2: Install root-level dependencies
npm install

### Step 3: Install all dependencies (frontend + backend)
npm run install-all

### Step 4: Add your .env file to the project root
### (Place the file manually — no command for this)

### Step 5: Start all services
npm run dev

### Step 6: Open the localhost URL shown in the terminal

### You can go below for more info.....

1. **Make sure you are in the project root folder**
   ```bash
   cd CLIENT-SERVER


Install root dependencies

npm install  ----->   Install all backend + frontend dependencies

npm run install-all


Add the .env file provided by the owner
Place it inside the root folder (same level as start-all.js).

Start all services

npm run dev


Open the local development URL
Click on the localhost link displayed in the terminal (e.g. http://localhost:5173 or http://localhost:8000 depending on frontend/server).

🎉 You can now Sign Up, Sign In, and use the application.

DONE...
You can follow below one for more info

# Mentorship Platform - Microservices

This is a full-stack mentorship platform built with:

- **Node.js + Express** microservices (API Gateway, Student Service, Mentor Service)
- **MongoDB** as the database
- **React/Vite (or similar)** for the frontend
- A root runner script (`start-all.js`) to start all services at once
- A root installer script (`install-all.js`) to install all dependencies at once

---

## 📂 Project Structure

```bash
.
├── server
│   ├── api-gateway         # Main API gateway / backend entry
│   └── services
│       ├── student-service # Student microservice
│       └── mentor-services # Mentor microservice
├── client                  # Frontend (React/Vite/etc.)
├── start-all.js            # Starts all services together
├── install-all.js          # Installs dependencies for all services
└── .env                    # Root environment variables (NOT committed)
✅ Prerequisites
Make sure you have:

Node.js (LTS recommended)

npm (comes with Node)

MongoDB running locally or a hosted Mongo URI

🔐 Environment Variables
All services share a single root .env file.

Create a .env file in the project root (same level as start-all.js):
Note: Given by me (Deepak Kumar)

📦 Install Dependencies (All Services at Once)
From the project root, run:

npm run install-all
This will run npm install in:

server/api-gateway

server/services/student-service

server/services/mentor-services

client

If you don’t have the script yet, add this to your root package.json:

{
  "scripts": {
    "install-all": "node install-all.js",
    "dev-all": "node start-all.js"
  }
}

🚀 Running the Project
🟢 Option 1 – Start EVERYTHING with one command
From the project root:

npm run dev-all
This will:

Start API Gateway on PORT_GATEWAY (e.g. http://localhost:8000)

Start Student Service on PORT_STUDENT

Start Mentor Service on PORT_MENTOR

Start Frontend dev server (often http://localhost:5173 or similar)

You should see logs like:


📋 Loaded Environment Variables:
...

🚀 Starting all services...

✅ Started API Gateway
✅ Started Student Service
✅ Started Mentor Service
✅ Started Frontend

📝 All services started. Press Ctrl+C to stop.
🟠 Option 2 – Run Services Individually (for debugging)
You can also run services one by one:

1️⃣ API Gateway
cd server/api-gateway
npm run dev
2️⃣ Student Service
cd server/services/student-service
npm run dev
3️⃣ Mentor Service

cd server/services/mentor-services
npm run dev
4️⃣ Frontend

cd client
npm run dev
🧪 Testing
(Add this section if you have tests)

Example:

# Inside a service
cd server/api-gateway
npm test
👥 Contributing
Create a new branch:


git checkout -b feature/your-feature-name
Make your changes and commit:


git add .
git commit -m "Add <short description>"
Push your branch:

git push -u origin feature/your-feature-name
Open a Pull Request to main.

📧 Contact
GitHub: @deepak108-sudo