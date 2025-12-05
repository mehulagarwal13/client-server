import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create .env file in root if it doesn't exist
const envPath = join(__dirname, '.env');
const envContent = `# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/mentorship

# JWT Secret Key
JWT_SECRET=mentorship_secret_key_2024_change_in_production

# Service Ports
PORT=8000
CHAT_PORT=3004
`;

try {
  writeFileSync(envPath, envContent);
  console.log('✅ Created .env file at:', envPath);
  console.log('\n📝 Please update MONGO_URI if your MongoDB is not on localhost:27017\n');
} catch (error) {
  console.log('⚠️  Could not create .env file (may already exist):', error.message);
}

console.log('\n🚀 Next steps:');
console.log('1. Make sure MongoDB is running');
console.log('2. Update .env file with your MongoDB URI if needed');
console.log('3. Run: node start-all.js\n');



