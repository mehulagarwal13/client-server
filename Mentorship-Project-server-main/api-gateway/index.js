import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();

// CORS configuration for Replit and local development
const ALLOWED_ORIGINS = [
  "https://client-944o.vercel.app",
  "http://localhost:5173",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (ALLOWED_ORIGINS.indexOf(origin) !== -1 || (origin && origin.includes('.replit.dev'))) {
        callback(null, true);
      } else if (!origin) {
        callback(null, false);
      } else {
        console.warn(`[Gateway] Blocked CORS request from unauthorized origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// 2. GET / FIX: Simple health check for the root path
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Gateway Service Operational",
    message: "Access proxy routes at /api/gateway",
    time: new Date().toISOString(),
  });
});

// Health check route (optional)
app.get("/api/ping", express.json(), (req, res) => {
  res.send("Gateway is live ");
});

// Log incoming requests (for debugging)
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});

// ---STUDENT SERVICE PROXY---
app.use(
  "/api/student",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    timeout: 15000,
    proxyTimeout: 15000,
    onError: (err, req, res) => {
      console.error(`[Gateway] Student Service proxy error:`, err);
      if (!res.headersSent) {
        res.status(502).json({
          error: "Gateway proxy error",
          message: err.message,
          details: "Cannot connect to student service on port 3001",
        });
      }
    },
  })
);

// ---AUTH SERVICE PROXY---
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    timeout: 15000,
    proxyTimeout: 15000,
    onError: (err, req, res) => {
      console.error(`[Gateway] Auth Service proxy error:`, err);
      if (!res.headersSent) {
        res.status(502).json({
          error: "Gateway proxy error",
          message: err.message,
          details: "Cannot connect to auth service on port 3002",
        });
      }
    },
  })
);

// ---MENTOR SERVICE PROXY---
app.use(
  "/api/mentor",
  createProxyMiddleware({
    target: "http://localhost:3003",
    changeOrigin: true,
    timeout: 15000,
    proxyTimeout: 15000,
    onError: (err, req, res) => {
      console.error(`[Gateway] Mentor Service proxy error:`, err);
      if (!res.headersSent) {
        res.status(502).json({
          error: "Gateway proxy error",
          message: err.message,
          details: "Cannot connect to mentor service on port 3003",
        });
      }
    },
  })
);

// ---CHAT SERVICE PROXY---
app.use(
  "/api/chat",
  createProxyMiddleware({
    target: "http://localhost:3004",
    changeOrigin: true,
    timeout: 15000,
    proxyTimeout: 15000,
    onError: (err, req, res) => {
      console.error(`[Gateway] Chat Service proxy error:`, err);
      if (!res.headersSent) {
        res.status(502).json({
          error: "Gateway proxy error",
          message: err.message,
          details: "Cannot connect to chat service on port 3004",
        });
      }
    },
  })
);

// ---MESSAGES API PROXY (for legacy endpoints)---
app.use(
  "/api/messages",
  createProxyMiddleware({
    target: "http://localhost:3004",
    changeOrigin: true,
    pathRewrite: { '^/api/messages': '/api/chat' },
    timeout: 15000,
    proxyTimeout: 15000,
    onError: (err, req, res) => {
      console.error(`[Gateway] Messages proxy error:`, err);
      if (!res.headersSent) {
        res.status(502).json({
          error: "Gateway proxy error",
          message: err.message,
          details: "Cannot connect to chat service on port 3004",
        });
      }
    },
  })
);

// Start Gateway
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
