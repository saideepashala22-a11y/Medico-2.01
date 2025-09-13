import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import { Pool as PgPool } from 'pg';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure for different deployment environments
function getDatabaseUrl(): string {
  // Log available environment variables for debugging (in production)
  if (process.env.NODE_ENV === 'production') {
    console.log('🔍 Available environment variables:', {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DATABASE_PUBLIC_URL: !!process.env.DATABASE_PUBLIC_URL,
      PGHOST: !!process.env.PGHOST,
      PGUSER: !!process.env.PGUSER,
      PGPASSWORD: !!process.env.PGPASSWORD,
      PGDATABASE: !!process.env.PGDATABASE,
      POSTGRES_DB: !!process.env.POSTGRES_DB,
      POSTGRES_URL: !!process.env.POSTGRES_URL,
      RAILWAY_PRIVATE_DOMAIN: !!process.env.RAILWAY_PRIVATE_DOMAIN,
    });
  }

  // Check for explicit DATABASE_URL first (standard)
  if (process.env.DATABASE_URL) {
    console.log('🔗 Using DATABASE_URL');
    return process.env.DATABASE_URL;
  }

  // Check for Railway's DATABASE_PUBLIC_URL (external access)
  if (process.env.DATABASE_PUBLIC_URL) {
    console.log('🔗 Using Railway DATABASE_PUBLIC_URL');
    return process.env.DATABASE_PUBLIC_URL;
  }

  // Check for standard PostgreSQL environment variables
  const pgHost = process.env.PGHOST;
  const pgUser = process.env.PGUSER;
  const pgPassword = process.env.PGPASSWORD;
  const pgDatabase = process.env.PGDATABASE || process.env.POSTGRES_DB; // Railway uses POSTGRES_DB sometimes
  
  if (pgHost && pgUser && pgPassword && pgDatabase) {
    const port = process.env.PGPORT || '5432';
    const url = `postgresql://${pgUser}:${pgPassword}@${pgHost}:${port}/${pgDatabase}`;
    console.log('🔗 Using individual PostgreSQL environment variables');
    return url;
  }

  // Check for Heroku Postgres
  if (process.env.HEROKU_POSTGRESQL_ADDON_URI) {
    console.log('🔗 Using Heroku PostgreSQL');
    return process.env.HEROKU_POSTGRESQL_ADDON_URI;
  }

  // Check for Vercel Postgres (Neon-backed)
  if (process.env.POSTGRES_URL) {
    console.log('🔗 Using Vercel Postgres');
    return process.env.POSTGRES_URL;
  }

  // Check for Supabase
  if (process.env.SUPABASE_DB_URL) {
    console.log('🔗 Using Supabase');
    return process.env.SUPABASE_DB_URL;
  }

  // For development, try to use local defaults
  if (process.env.NODE_ENV === 'development') {
    console.warn('No DATABASE_URL found, using default local PostgreSQL connection');
    return 'postgresql://postgres:postgres@localhost:5432/hospital_management';
  }

  // Enhanced error message with environment debugging
  const availableVars = Object.keys(process.env)
    .filter(key => key.includes('PG') || key.includes('DATABASE') || key.includes('POSTGRES'))
    .sort();
    
  throw new Error(
    "❌ No database connection URL found.\n\n" +
    "🔍 Expected environment variables:\n" +
    "- DATABASE_URL (recommended)\n" +
    "- DATABASE_PUBLIC_URL (Railway external)\n" +
    "- PGHOST, PGUSER, PGPASSWORD, PGDATABASE/POSTGRES_DB (standard PostgreSQL)\n" +
    "- HEROKU_POSTGRESQL_ADDON_URI (Heroku)\n" +
    "- POSTGRES_URL (Vercel)\n" +
    "- SUPABASE_DB_URL (Supabase)\n\n" +
    "🔍 Available database-related environment variables:\n" +
    (availableVars.length > 0 ? availableVars.join(', ') : 'None found') + "\n\n" +
    "💡 For Railway:\n" +
    "1. Ensure PostgreSQL service is added to your project\n" +
    "2. Check that services are properly linked\n" +
    "3. Verify deployment is connected to the database service\n" +
    "4. Railway should automatically set DATABASE_URL when PostgreSQL is connected"
  );
}

// Determine if we should use Neon driver or standard PostgreSQL driver
function isNeonProvider(url: string): boolean {
  return url.includes('neon.tech') || 
         url.includes('neon.dev') || 
         url.includes('vercel.postgres') ||
         process.env.POSTGRES_URL === url; // Vercel Postgres
}

// Get SSL configuration for non-Neon providers
function getSSLConfig() {
  if (process.env.PGSSL === 'true' || process.env.NODE_ENV === 'production') {
    return { rejectUnauthorized: false };
  }
  return false;
}

const databaseUrl = getDatabaseUrl();

// Use appropriate driver based on provider
let pool: NeonPool | PgPool;
let db: ReturnType<typeof drizzle> | ReturnType<typeof drizzlePg>;

if (isNeonProvider(databaseUrl)) {
  // Use Neon driver for Neon and Vercel Postgres
  neonConfig.webSocketConstructor = ws;
  pool = new NeonPool({ connectionString: databaseUrl });
  db = drizzle({ client: pool, schema });
  console.log('🔗 Using Neon/Vercel PostgreSQL driver');
} else {
  // Use standard PostgreSQL driver for Railway, Heroku, Render, etc.
  const sslConfig = getSSLConfig();
  pool = new PgPool({ 
    connectionString: databaseUrl,
    ssl: sslConfig
  });
  db = drizzlePg(pool, { schema });
  console.log('🔗 Using standard PostgreSQL driver with SSL:', !!sslConfig);
}

export { pool, db };