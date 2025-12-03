# TechLearn - Mentorship Platform

## Overview
TechLearn is a comprehensive mentorship platform that connects students with mentors and recruiters for collaborative learning and career development. The platform features real-time messaging, community features, and role-based dashboards.

## Project Architecture

### Technology Stack
- **Frontend**: React 19.1.1 + Vite 7.1.7 + Tailwind CSS 4.1.13
- **Backend**: Microservices architecture with Node.js + Express
- **Database**: MongoDB (MongoDB Atlas recommended)
- **API Gateway**: Express with http-proxy-middleware
- **Real-time**: Socket.io for chat functionality

### Microservices Architecture
The application uses a microservices architecture with the following components:

1. **API Gateway** (Port 8000)
   - Routes all client requests to appropriate microservices
   - Handles CORS and request logging
   - Location: `Mentorship-Project-server-main/api-gateway/`

2. **Student Service** (Port 3001)
   - Manages student registration, login, and profiles
   - Handles course and review data
   - Location: `Mentorship-Project-server-main/services/student-service/`

3. **Auth Service** (Port 3002)
   - Handles user authentication and JWT token generation
   - Manages user accounts across roles
   - Location: `Mentorship-Project-server-main/services/auth-service/`

4. **Mentor Service** (Port 3003)
   - Manages mentor registration and profiles
   - Handles mentor-specific features
   - Location: `Mentorship-Project-server-main/services/mentor-services/`

5. **Frontend** (Port 5000)
   - React-based SPA served via Vite
   - Proxies API requests to the API Gateway
   - Location: `client/`

## Project Structure
```
.
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── Components/              # React components
│   │   ├── Pages/                   # Page components
│   │   ├── assets/                  # Images and static assets
│   │   └── main.jsx                 # Application entry point
│   ├── public/                      # Public assets
│   └── vite.config.js              # Vite configuration
├── Mentorship-Project-server-main/  # Backend services
│   ├── api-gateway/                 # API Gateway service
│   └── services/
│       ├── student-service/         # Student microservice
│       ├── auth-service/            # Authentication microservice
│       └── mentor-services/         # Mentor microservice
├── start-all.js                     # Unified startup script
└── package.json                     # Root package.json
```

## Environment Variables

### Required Environment Variables
The following environment variables must be set in the Replit environment (shared):

- `MONGO_URI`: MongoDB connection string
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - Or local: `mongodb://localhost:27017/mentorship_db`
  
- `JWT_SECRET`: Secret key for JWT token generation
  - Any secure random string

### Setting Environment Variables
Environment variables are configured in the Replit Secrets tab and automatically passed to all microservices via the startup script.

## Running the Application

### Development Mode
The application uses a unified startup script that launches all services simultaneously:

```bash
npm start
```

This command:
1. Starts the API Gateway on port 8000
2. Starts all three microservices (Student, Auth, Mentor)
3. Starts the Vite development server on port 5000
4. Automatically passes environment variables to all services

### Accessing the Application
- **Frontend**: Accessible via the Replit webview on port 5000
- **API Gateway**: http://localhost:8000
- **Health Check**: http://localhost:8000/api/ping

## Features

### User Roles
1. **Students**
   - Register and create profiles
   - Browse mentors and recruiters
   - Join community discussions
   - Access personalized dashboard
   - Send and receive messages

2. **Mentors**
   - Register with expertise and bio
   - Create detailed profiles
   - Connect with students
   - Access mentor dashboard

3. **Recruiters**
   - Browse student profiles
   - Post opportunities
   - Connect with potential candidates
   - Access recruiter dashboard

### Core Features
- User authentication with JWT
- Role-based access control
- Real-time messaging (Socket.io)
- Community chat rooms
- Profile management
- Responsive design with Tailwind CSS

## Database Schema

### Collections
1. **Users** (Auth Service)
   - email, password, role
   - Used for authentication across all user types

2. **Students** (Student Service)
   - email, password, university, course
   - Student-specific profile data

3. **Mentors** (Mentor Service)
   - email, password, expertise, bio, university, course, passingYear
   - Mentor-specific profile data

4. **Courses** (Student Service)
   - title, description

5. **Reviews** (Student Service)
   - course (ref), student (ref), rating, comment

## API Endpoints

### Student Service (via /api/student)
- `POST /api/student/register` - Register new student
- `POST /api/student/login` - Student login
- `GET /api/student/profile` - Get student profile
- `PUT /api/student/profile` - Update student profile

### Auth Service (via /api/auth)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Mentor Service (via /api/mentor)
- `POST /api/mentor/register` - Register new mentor
- `POST /api/mentor/login` - Mentor login

## Configuration Details

### Vite Configuration
The Vite server is configured for Replit with:
- Host: `0.0.0.0` (required for Replit)
- Port: `5000` (required for Replit webview)
- Proxy: API requests to `http://localhost:8000`
- HMR client port: `5000`

### API Gateway Configuration
- CORS enabled for Replit domains and localhost
- Proxies requests to appropriate microservices
- Timeout: 15 seconds per request
- Error handling with detailed messages

## Deployment

### Production Deployment
The application is configured for autoscale deployment on Replit:
- Deployment type: `autoscale`
- Run command: `node start-all.js`
- All environment variables must be set in production environment

### ⚠️ Important Production Notes

**Current Setup**: The current configuration runs the Vite development server, which is suitable for development and testing in Replit.

**For Production Deployment**, you should:

1. **Build the Frontend**:
   ```bash
   cd client
   npm run build
   ```
   This creates optimized production files in `client/dist/`

2. **Serve Static Files**: Modify the API Gateway or create a separate static file server to serve the built frontend instead of running the Vite dev server.

3. **Update CORS**: Add your production domain to the `ALLOWED_ORIGINS` array in `Mentorship-Project-server-main/api-gateway/index.js`:
   ```javascript
   const ALLOWED_ORIGINS = [
     "https://your-production-domain.replit.app",
     "http://localhost:5000",
   ];
   ```

4. **Process Management**: Consider using PM2 or a similar process manager for better service monitoring and automatic restarts in production.

5. **Security Checklist**:
   - Ensure MongoDB URI uses a production database
   - Use a strong, unique JWT_SECRET
   - Enable rate limiting on API endpoints
   - Set up proper logging and monitoring
   - Review and restrict CORS origins to only necessary domains

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Verify `MONGO_URI` environment variable is set correctly
   - Check MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0)
   - Ensure database user has proper permissions

2. **Services Not Starting**
   - Check logs for specific service errors
   - Verify all dependencies are installed (`npm install` in each service)
   - Ensure ports are not in use

3. **Frontend Not Loading**
   - Verify Vite is running on port 5000
   - Check browser console for errors
   - Ensure API Gateway is accessible

4. **API Requests Failing**
   - Verify API Gateway is running on port 8000
   - Check that microservices are running on correct ports
   - Review CORS configuration

## Development Notes

### Code Modifications
- **RabbitMQ Removed**: The original auth service had RabbitMQ integration which was removed for simplicity
- **Vite Command**: Changed from `vite` to `node ./node_modules/vite/bin/vite.js` to fix permission issues
- **Port Configuration**: All services configured with specific ports to avoid conflicts

### Testing
- Test authentication flow with student/mentor/recruiter registration
- Verify API Gateway routing to all services
- Test real-time messaging features
- Verify role-based access control

## Recent Changes (December 3, 2025)
- Configured for Replit environment
- Created unified startup script for all services
- Updated Vite configuration for port 5000 with 0.0.0.0 host
- Configured API Gateway to route to local microservices
- Fixed MongoDB connection issues
- Removed RabbitMQ dependency
- Added environment variable propagation
- Configured deployment settings

## Support
For issues or questions about this deployment, check the service logs in the Replit console or refer to the documentation in the `Mentorship-Project-server-main/` directory.
