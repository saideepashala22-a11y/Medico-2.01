#!/usr/bin/env node
/**
 * Deployment Setup Script for Hospital Management System
 * 
 * This script helps configure environment variables for different deployment platforms
 * and ensures the app can be deployed anywhere with ease.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const platforms = {
  railway: {
    name: 'Railway',
    envVars: ['PGHOST', 'PGUSER', 'PGPASSWORD', 'PGDATABASE', 'PGPORT'],
    generateDatabaseUrl: (env) => 
      `postgresql://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}:${env.PGPORT || '5432'}/${env.PGDATABASE}`
  },
  heroku: {
    name: 'Heroku',
    envVars: ['HEROKU_POSTGRESQL_ADDON_URI'],
    generateDatabaseUrl: (env) => env.HEROKU_POSTGRESQL_ADDON_URI
  },
  vercel: {
    name: 'Vercel',
    envVars: ['POSTGRES_URL'],
    generateDatabaseUrl: (env) => env.POSTGRES_URL
  },
  render: {
    name: 'Render',
    envVars: ['DATABASE_URL'],
    generateDatabaseUrl: (env) => env.DATABASE_URL
  },
  fly: {
    name: 'Fly.io',
    envVars: ['DATABASE_URL'],
    generateDatabaseUrl: (env) => env.DATABASE_URL
  }
};

function detectPlatform() {
  const env = process.env;
  
  // Check for Railway
  if (env.RAILWAY_ENVIRONMENT && (env.PGHOST || env.RAILWAY_PROJECT_ID)) {
    return 'railway';
  }
  
  // Check for Heroku
  if (env.DYNO || env.HEROKU_APP_NAME) {
    return 'heroku';
  }
  
  // Check for Vercel
  if (env.VERCEL || env.VERCEL_ENV) {
    return 'vercel';
  }
  
  // Check for Render
  if (env.RENDER || env.RENDER_SERVICE_ID) {
    return 'render';
  }
  
  // Check for Fly.io
  if (env.FLY_APP_NAME || env.FLY_REGION) {
    return 'fly';
  }
  
  return 'unknown';
}

function validateEnvironment() {
  const platform = detectPlatform();
  const config = platforms[platform];
  
  console.log(`🔍 Detected platform: ${config ? config.name : 'Unknown'}`);
  
  if (!config) {
    console.log('⚠️  Platform not automatically detected. Checking for DATABASE_URL...');
    if (process.env.DATABASE_URL) {
      console.log('✅ DATABASE_URL found');
      return true;
    } else {
      console.error('❌ No DATABASE_URL found. Please set it manually.');
      return false;
    }
  }
  
  // Check if required environment variables exist
  const missingVars = config.envVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`❌ Missing required environment variables for ${config.name}:`);
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    return false;
  }
  
  // Generate DATABASE_URL if not set
  if (!process.env.DATABASE_URL) {
    const databaseUrl = config.generateDatabaseUrl(process.env);
    console.log('🔧 Generated DATABASE_URL from platform variables');
    
    // Set the environment variable for current process
    process.env.DATABASE_URL = databaseUrl;
    
    return true;
  }
  
  console.log('✅ All environment variables configured');
  return true;
}

function generateDeploymentGuide() {
  const guide = `
# Deployment Guide for Hospital Management System

## Supported Platforms

### Railway
1. Connect your repository to Railway
2. Add a PostgreSQL database service
3. Environment variables are automatically set by Railway
4. Deploy using: \`npm run build && npm start\`

### Heroku
1. Create a new Heroku app
2. Add Heroku Postgres add-on: \`heroku addons:create heroku-postgresql:mini\`
3. Deploy using Git push or GitHub integration
4. Run migrations: \`heroku run npm run db:push\`

### Vercel
1. Connect your repository to Vercel
2. Add Vercel Postgres database
3. Set POSTGRES_URL in environment variables
4. Deploy automatically on push

### Render
1. Create a new Web Service on Render
2. Add PostgreSQL database
3. Set DATABASE_URL environment variable
4. Deploy using: \`npm run build && npm start\`

### Fly.io
1. Install Fly CLI and login
2. Run \`fly launch\` to create app
3. Add PostgreSQL: \`fly postgres create\`
4. Connect database: \`fly postgres attach <db-name>\`
5. Deploy: \`fly deploy\`

## Manual Configuration

If deploying to a custom platform, set one of these environment variables:

### Option 1: Complete DATABASE_URL
\`\`\`
DATABASE_URL=postgresql://username:password@host:port/database
\`\`\`

### Option 2: Individual Components (Railway style)
\`\`\`
PGHOST=your-host
PGUSER=your-username
PGPASSWORD=your-password
PGDATABASE=your-database
PGPORT=5432
\`\`\`

## Build Commands
- Build: \`npm run build\`
- Start: \`npm start\`
- Database Migration: \`npm run db:push\`

## Troubleshooting

### DATABASE_URL Error
If you see "DATABASE_URL must be set", ensure:
1. Your database service is properly provisioned
2. Environment variables are correctly set
3. Database is accessible from your deployment platform

### Connection Issues
- Verify database credentials
- Check if database allows external connections
- Ensure SSL settings match your database configuration
`;

  writeFileSync('DEPLOYMENT.md', guide);
  console.log('📝 Created DEPLOYMENT.md with platform-specific instructions');
}

function main() {
  console.log('🚀 Hospital Management System - Deployment Setup\n');
  
  const isValid = validateEnvironment();
  
  if (isValid) {
    console.log('✅ Environment is ready for deployment');
  } else {
    console.error('❌ Environment setup failed');
    console.log('\n📚 Generating deployment guide...');
    generateDeploymentGuide();
    process.exit(1);
  }
  
  // Always generate the guide for reference
  generateDeploymentGuide();
}

// Only run if this file is executed directly  
if (process.argv[1] && process.argv[1].endsWith('deploy-setup.js')) {
  main();
}

export { validateEnvironment, detectPlatform };