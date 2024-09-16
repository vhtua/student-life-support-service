import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: String(process.env.PG_DB_USER),
  host: String(process.env.PG_DB_HOST),
  password: String(process.env.PG_DB_PASSWORD),
  port: Number(process.env.PG_DB_PORT),
  database: String(process.env.PG_DB_DATABASE),
});

export default pool;