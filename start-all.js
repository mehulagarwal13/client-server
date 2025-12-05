import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default environment variables if not set
const DEFAULT_MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mentorship';
const DEFAULT_JWT_SECRET = process.env.JWT_SECRET || 'mentorship_secret_key_2024_change_in_production';

console.log('📋 Environment Configuration:');
console.log(`   MONGO_URI: ${DEFAULT_MONGO_URI}`);
console.log(`   JWT_SECRET: ${DEFAULT_JWT_SECRET ? 'Set' : 'Using default'}\n`);

const services = [
  {
    name: 'API Gateway',
    cwd: path.join(__dirname, 'Mentorship-Project-server-main', 'api-gateway'),
    command: 'npm',
    args: ['start'],
    env: { 
      PORT: '8000',
      MONGO_URI: DEFAULT_MONGO_URI,
      JWT_SECRET: DEFAULT_JWT_SECRET
    }
  },
  {
    name: 'Student Service',
    cwd: path.join(__dirname, 'Mentorship-Project-server-main', 'services', 'student-service'),
    command: 'npm',
    args: ['start'],
    env: { 
      PORT: '3001',
      MONGO_URI: DEFAULT_MONGO_URI,
      JWT_SECRET: DEFAULT_JWT_SECRET
    }
  },
  {
    name: 'Auth Service',
    cwd: path.join(__dirname, 'Mentorship-Project-server-main', 'services', 'auth-service'),
    command: 'npm',
    args: ['start'],
    env: { 
      PORT: '3002',
      MONGO_URI: DEFAULT_MONGO_URI,
      JWT_SECRET: DEFAULT_JWT_SECRET
    }
  },
  {
    name: 'Mentor Service',
    cwd: path.join(__dirname, 'Mentorship-Project-server-main', 'services', 'mentor-services'),
    command: 'npm',
    args: ['start'],
    env: { 
      PORT: '3003',
      MONGO_URI: DEFAULT_MONGO_URI,
      JWT_SECRET: DEFAULT_JWT_SECRET
    }
  },
  {
    name: 'Chat Service',
    cwd: path.join(__dirname, 'Mentorship-Project-server-main', 'services', 'chat-service'),
    command: 'npm',
    args: ['start'],
    env: { 
      CHAT_PORT: '3004',
      MONGO_URI: DEFAULT_MONGO_URI,
      JWT_SECRET: DEFAULT_JWT_SECRET
    }
  },
  {
    name: 'Frontend',
    cwd: path.join(__dirname, 'client'),
    command: 'npm',
    args: ['run', 'dev'],
    env: {}
  }
];

console.log('🚀 Starting all services...\n');

services.forEach(service => {
  const env = { ...process.env, ...service.env };
  
  const proc = spawn(service.command, service.args, {
    cwd: service.cwd,
    env: env,
    stdio: 'inherit',
    shell: true
  });

  proc.on('error', (err) => {
    console.error(`❌ Error starting ${service.name}:`, err);
  });

  proc.on('exit', (code, signal) => {
    if (code !== 0) {
      console.error(`❌ ${service.name} exited with code ${code}`);
    }
  });

  console.log(`✅ Started ${service.name}`);
});

console.log('\n📝 All services started. Press Ctrl+C to stop all services.\n');

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all services...');
  process.exit(0);
});
