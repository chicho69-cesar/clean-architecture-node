import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './models/user.model';

interface PostgresOptions {
  connectionString: string;
}

export class PostgresDatabase {
  public static db: NodePgDatabase<typeof schema>;

  public static async connect(options: PostgresOptions): Promise<boolean> {
    const pool = new Pool({ connectionString: options.connectionString });

    try {
      await pool.query('SELECT 1');
      PostgresDatabase.db = drizzle(pool, { schema });
      console.log('Connected to PostgreSQL');
      return true;
    } catch (error) {
      console.error('Error connecting to PostgreSQL:', error);
      return false;
    }
  }
}
