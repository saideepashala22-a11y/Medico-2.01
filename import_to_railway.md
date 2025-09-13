# Railway Database Migration Guide

## 1. Create Schema on Railway
```bash
# Once your Railway app is running with DATABASE_URL:
railway run npm run db:push
```

## 2. Import Your Data
```bash
# Upload your hospital_backup_20240913.sql file to Railway
# Then run this command:
railway run psql $DATABASE_URL -f hospital_backup_20240913.sql
```

## 3. Alternative Import Method
If the above doesn't work, use individual table imports:

```bash
# Connect to Railway PostgreSQL
railway run psql $DATABASE_URL

# Inside psql, copy and paste content from hospital_backup_20240913.sql
# Or upload file to Railway and run:
\i hospital_backup_20240913.sql
```

## 4. Verify Migration
```bash
# Check if all tables have data:
railway run psql $DATABASE_URL -c "
SELECT 
  schemaname,
  tablename,
  n_tup_ins as row_count
FROM pg_stat_user_tables 
ORDER BY tablename;
"
```

## 5. Test Your Application
- Log into your Railway app
- Check if all data appears correctly
- Test creating new records
- Verify all existing data is accessible

## 6. Common Issues
- **Permission errors**: Ensure Railway PostgreSQL user has full access
- **Foreign key constraints**: Data imports in correct order (users first, then dependent tables)
- **Sequence reset**: After import, you may need to reset auto-increment sequences

## Reset Sequences (if needed)
```sql
-- Reset sequences for auto-incrementing fields
SELECT setval(pg_get_serial_sequence('table_name', 'id'), MAX(id)) FROM table_name;
```