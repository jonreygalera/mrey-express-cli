#!/usr/bin/env node
const { execSync } = require('child_process');
const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const TEMPLATE_REPO = "https://github.com/jonreygalera/mrey-express.git";

const program = new Command();
program
  .name("mrey-express")
  .version("1.0.0")
  .command("new <projectName>")
  .action((projectName) => {
    const targetPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetPath)) {
      console.error(`❌ Directory "${projectName}" already exists`);
      process.exit(1);
    }

    console.log("📥 Cloning template...");
    execSync(`git clone ${TEMPLATE_REPO} ${projectName}`, { stdio: "inherit" });

    // Remove the cloned .git folder so the new project isn't a git repo from your template
    fs.removeSync(path.join(targetPath, ".git"));

    console.log(">> 📦 Installing dependencies...");
    execSync("npm install", { cwd: targetPath, stdio: "inherit", shell: true });

    console.log(">> ✅ Project created!");
    console.log(`>> cd ${projectName}`);
    console.log(">> npm run dev");
  });

program.parse();
