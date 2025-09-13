import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import { Pool as PgPool } from 'pg';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure for different deployment environments
function getDatabaseUrl(): string {
  // Check for explicit DATABASE_URL first
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Check for Railway's default environment variables
  if (process.env.PGHOST && process.env.PGUSER && process.env.PGPASSWORD && process.env.PGDATABASE) {
    const port = process.env.PGPORT || '5432';
    return `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${port}/${process.env.PGDATABASE}`;
  }

  // Check for Heroku Postgres
  if (process.env.HEROKU_POSTGRESQL_ADDON_URI) {
    return process.env.HEROKU_POSTGRESQL_ADDON_URI;
  }

  // Check for Vercel Postgres (Neon-backed)
  if (process.env.POSTGRES_URL) {
    return process.env.POSTGRES_URL;
  }

  // Check for Supabase
  if (process.env.SUPABASE_DB_URL) {
    return process.env.SUPABASE_DB_URL;
  }

  // For development, try to use local defaults
  if (process.env.NODE_ENV === 'development') {
    console.warn('No DATABASE_URL found, using default local PostgreSQL connection');
    return 'postgresql://postgres:postgres@localhost:5432/hospital_management';
  }

  throw new Error(
    "No database connection URL found. Please set one of the following environment variables:\n" +
    "- DATABASE_URL (recommended)\n" +
    "- PGHOST, PGUSER, PGPASSWORD, PGDATABASE (Railway/generic PostgreSQL)\n" +
    "- HEROKU_POSTGRESQL_ADDON_URI (Heroku)\n" +
    "- POSTGRES_URL (Vercel)\n" +
    "- SUPABASE_DB_URL (Supabase)\n\n" +
    "For Railway deployment, ensure your PostgreSQL add-on is properly configured."
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