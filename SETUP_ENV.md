# Environment Setup Guide

## Step 1: Create .env file in root directory

Create a file named `.env` in `client-server/` folder with this content:

```env
MONGO_URI=mongodb://localhost:27017/mentorship
JWT_SECRET=mentorship_secret_key_2024_change_in_production
```

## Step 2: Copy .env to each service (if needed)

You can also create `.env` files in each service directory, or they will use the root one.

## Step 3: Make sure MongoDB is running

**Windows:**
```bash
# Check if MongoDB is running
net start MongoDB

# If not installed, download from: https://www.mongodb.com/try/download/community
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

## Step 4: Start all services

```bash
cd client-server
node start-all.js
```

## Troubleshooting

- If MongoDB connection fails, check your MONGO_URI
- Default MongoDB URI: `mongodb://localhost:27017/mentorship`
- If using MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/mentorship`



