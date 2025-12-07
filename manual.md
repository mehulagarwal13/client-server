# Mentorship Platform – Monorepo

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

bash
Copy code
npm run install-all
This will run npm install in:

server/api-gateway

server/services/student-service

server/services/mentor-services

client

If you don’t have the script yet, add this to your root package.json:

json
Copy code
{
  "scripts": {
    "install-all": "node install-all.js",
    "dev-all": "node start-all.js"
  }
}
🚀 Running the Project
🟢 Option 1 – Start EVERYTHING with one command
From the project root:

bash
Copy code
npm run dev-all
This will:

Start API Gateway on PORT_GATEWAY (e.g. http://localhost:8000)

Start Student Service on PORT_STUDENT

Start Mentor Service on PORT_MENTOR

Start Frontend dev server (often http://localhost:5173 or similar)

You should see logs like:

text
Copy code
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
bash
Copy code
cd server/api-gateway
npm run dev
2️⃣ Student Service
bash
Copy code
cd server/services/student-service
npm run dev
3️⃣ Mentor Service
bash
Copy code
cd server/services/mentor-services
npm run dev
4️⃣ Frontend
bash
Copy code
cd client
npm run dev
🧪 Testing
(Add this section if you have tests)

Example:

bash
Copy code
# Inside a service
cd server/api-gateway
npm test
👥 Contributing
Create a new branch:

bash
Copy code
git checkout -b feature/your-feature-name
Make your changes and commit:

bash
Copy code
git add .
git commit -m "Add <short description>"
Push your branch:

bash
Copy code
git push -u origin feature/your-feature-name
Open a Pull Request to main.

📧 Contact
GitHub: @deepak108-sudo