import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();
const app = express();

// ✅ CORS configuration
const ALLOWED_ORIGINS = [
  "https://client-944o.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        ALLOWED_ORIGINS.includes(origin) ||
        origin.includes(".replit.dev")
      ) {
        callback(null, true);
      } else {
        console.warn(`[Gateway] Blocked CORS request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Gateway Service Operational",
    time: new Date().toISOString(),
  });
});

app.get("/api/ping", (req, res) => {
  res.send("Gateway is live");
});

// Logger
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});

// Proxy helper
const createServiceProxy = (target, serviceName, ws = false) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    timeout: 15000,
    proxyTimeout: 15000,
    ws,
    cookieDomainRewrite: "",
    onError: (err, req, res) => {
      console.error(`[Gateway] ${serviceName} proxy error:`, err.message);
      if (!res.headersSent) {
        res.status(502).json({
          error: "Gateway proxy error",
          service: serviceName,
          message: err.message,
        });
      }
    },
  });

app.use("/api/student", createServiceProxy("http://localhost:3001", "Student"));
app.use("/api/auth", createServiceProxy("http://localhost:3002", "Auth"));
app.use("/api/mentor", createServiceProxy("http://localhost:3003", "Mentor"));
app.use("/api/chat", createServiceProxy("http://localhost:3004", "Chat", true));

// Temporary recruiter route
app.get("/api/recruiter/browse", (req, res) => {
  res.status(200).json([]);
});

// Legacy messages support
app.use(
  "/api/messages",
  createProxyMiddleware({
    target: "http://localhost:3004",
    changeOrigin: true,
    pathRewrite: { "^/api/messages": "/api/chat" },
    ws: true,
    cookieDomainRewrite: "",
  })
);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
