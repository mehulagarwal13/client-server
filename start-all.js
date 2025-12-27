import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // Load root .env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("📋 Loaded Environment Variables:");
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Missing");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Missing");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Missing");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Set" : "Missing");
console.log("\n");

// Define all services
const services = [
  {
    name: "API Gateway",
    cwd: path.join(__dirname, "server", "api-gateway"),
    command: "npm",
    args: ["run", "dev"],
    env: {
      PORT: process.env.PORT_GATEWAY,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
    },
  },
  {
    name: "Student Service",
    cwd: path.join(__dirname, "server", "services", "student-service"),
    command: "npm",
    args: ["run", "dev"],
    env: {
      PORT: process.env.PORT_STUDENT,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
    },
  },
  {
    name: "Mentor Service",
    cwd: path.join(__dirname, "server", "services", "mentor-services"),
    command: "npm",
    args: ["run", "dev"],
    env: {
      PORT: process.env.PORT_MENTOR,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
    },
  },
  {
    name: "Chat Service",
    cwd: path.join(__dirname, "server", "services", "chat-service"),
    command: "npm",
    args: ["run", "dev"],
    env: {
      PORT: process.env.PORT_CHAT,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
    },
  },
  {
    name: "Frontend",
    cwd: path.join(__dirname, "client"),
    command: "npm",
    args: ["run", "dev"],
    env: {
      VITE_API_URL: process.env.VITE_API_URL,
    },
  },
];

console.log("🚀 Starting all services...\n");

services.forEach((service) => {
  const env = { ...process.env, ...service.env };

  const proc = spawn(service.command, service.args, {
    cwd: service.cwd,
    env,
    stdio: "inherit",
    shell: true,
  });

  proc.on("error", (err) => {
    console.error(`❌ Error starting ${service.name}:`, err);
  });

  proc.on("exit", (code) => {
    if (code !== 0) {
      console.error(`❌ ${service.name} exited with code ${code}`);
    }
  });

  console.log(`✅ Started ${service.name}`);
});

console.log("\n📝 All services started. Press Ctrl+C to stop.\n");
