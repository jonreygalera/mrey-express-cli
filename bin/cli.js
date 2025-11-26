#!/usr/bin/env node
const { execSync } = require('child_process');
const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

const TEMPLATE_REPO = "https://github.com/jonreygalera/mrey-express.git";

const program = new Command();
program
  .name("mrey-express")
  .version("1.0.0");

// ---------------------
// NEW PROJECT COMMAND
// ---------------------
program
  .command("new <projectName>")
  .description("Generate a new Express TypeScript project")
  .action((projectName) => {
    const targetPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetPath)) {
      console.error(`>> ❌ Directory "${projectName}" already exists`);
      process.exit(1);
    }

    console.log(">> 📥 Cloning template...");
    execSync(`git clone ${TEMPLATE_REPO} ${projectName}`, { stdio: "inherit" });

    fs.removeSync(path.join(targetPath, ".git"));

    console.log(">> 📦 Installing dependencies...");
    execSync("npm install", { cwd: targetPath, stdio: "inherit", shell: true });

    // ---------------------
    // AUTO ENV SETUP
    // ---------------------
    const envExamplePath = path.join(targetPath, '.env.example');
    const envPath = path.join(targetPath, '.env');

    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log(">> 🔑 .env file created from .env.example");

      // Generate APP_KEY
      let envContent = fs.readFileSync(envPath, 'utf-8');
      const key = crypto.randomBytes(32).toString('base64');
      const appKeyLine = `APP_KEY=${key}`;

      if (envContent.includes('APP_KEY=')) {
        envContent = envContent.replace(/APP_KEY=.*/, appKeyLine);
      } else {
        envContent += `\n${appKeyLine}\n`;
      }

      fs.writeFileSync(envPath, envContent);
      console.log(`>> ✅ APP_KEY generated and set in .env`);
    }

    console.log(">> ✅ Project created!");
    console.log(`>> cd ${projectName}`);
    console.log(">> npm run dev");
  });

program.parse();
