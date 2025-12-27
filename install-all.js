import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folders where npm install should run
const folders = [
  path.join(__dirname, "server", "api-gateway"),
  path.join(__dirname, "server", "services", "student-service"),
  path.join(__dirname, "server", "services", "mentor-services"),
  path.join(__dirname, "server", "services", "chat-service"),
  path.join(__dirname, "client"),
];

// Check if folder exists
function checkFolder(folder) {
  if (!fs.existsSync(folder)) {
    console.error(`❌ Folder not found: ${folder}`);
    return false;
  }
  return true;
}

// Install dependencies in each folder
function installDependencies(folder) {
  if (!checkFolder(folder)) return;

  console.log(`\n📦 Installing dependencies in: ${folder}\n`);

  const proc = spawn("npm", ["install"], {
    cwd: folder,
    stdio: "inherit",
    shell: true,
  });

  proc.on("exit", (code) => {
    if (code === 0) {
      console.log(`\n✅ Completed: ${folder}\n`);
    } else {
      console.error(
        `\n❌ Failed installing in: ${folder} (exit code ${code})\n`
      );
    }
  });
}

// Run installation for all folders
console.log("🚀 Starting installation for all services...\n");

folders.forEach(installDependencies);
