
# Deployment Guide for Hospital Management System

## Supported Platforms

### Railway
1. Connect your repository to Railway
2. Add a PostgreSQL database service
3. Environment variables are automatically set by Railway
4. Deploy using: `npm run build && npm start`

### Heroku
1. Create a new Heroku app
2. Add Heroku Postgres add-on: `heroku addons:create heroku-postgresql:mini`
3. Deploy using Git push or GitHub integration
4. Run migrations: `heroku run npm run db:push`

### Vercel
1. Connect your repository to Vercel
2. Add Vercel Postgres database
3. Set POSTGRES_URL in environment variables
4. Deploy automatically on push

### Render
1. Create a new Web Service on Render
2. Add PostgreSQL database
3. Set DATABASE_URL environment variable
4. Deploy using: `npm run build && npm start`

### Fly.io
1. Install Fly CLI and login
2. Run `fly launch` to create app
3. Add PostgreSQL: `fly postgres create`
4. Connect database: `fly postgres attach <db-name>`
5. Deploy: `fly deploy`

## Manual Configuration

If deploying to a custom platform, set one of these environment variables:

### Option 1: Complete DATABASE_URL
```
DATABASE_URL=postgresql://username:password@host:port/database
```

### Option 2: Individual Components (Railway style)
```
PGHOST=your-host
PGUSER=your-username
PGPASSWORD=your-password
PGDATABASE=your-database
PGPORT=5432
```

## Build Commands
- Build: `npm run build`
- Start: `npm start`
- Database Migration: `npm run db:push`

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
