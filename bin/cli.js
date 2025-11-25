#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const { Command } = require('commander');

const program = new Command();

program
  .name('my-express-cli')
  .description('CLI to generate Express.js TypeScript projects')
  .version('1.0.0');

program
  .command('new <project-name>')
  .description('Generate a new Express.js TypeScript application')
  .action((projectName) => {
    if (!projectName) {
      console.error('❌ Project name is required');
      process.exit(1);
    }

    const templatePath = path.join(__dirname, '../template');
    const targetPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetPath)) {
      console.error(`❌ Directory "${projectName}" already exists`);
      process.exit(1);
    }

    console.log('🚀 Creating Express.js application...');
    fs.copySync(templatePath, targetPath);

    console.log('📦 Installing packages...');
    try {
      execSync('npm install', { cwd: targetPath, stdio: 'inherit', shell: true });
    } catch (error) {
      console.error('❌ Failed to install dependencies');
      process.exit(1);
    }

    console.log('✅ Application created successfully!');
    console.log('\nNext steps:');
    console.log(`  cd ${projectName}`);
    console.log('  npm run dev');

    process.exit(0);
  });

program.parse();
