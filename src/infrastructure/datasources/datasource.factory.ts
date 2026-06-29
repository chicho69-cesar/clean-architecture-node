import { envs } from '../../config';
import type { UserDataSource } from '../../domain';
import { MongoUserDataSourceImpl } from './mongo-user.datasource.impl';
import { MySQLUserDataSourceImpl } from './mysql-user.datasource.impl';
import { PostgresUserDataSourceImpl } from './postgres-user.datasource.impl';

export class DataSourceFactory {
  public static getUserDataSource(): UserDataSource {
    switch (envs.DB_TYPE) {
      case 'postgres': return new PostgresUserDataSourceImpl();
      case 'mysql': return new MySQLUserDataSourceImpl();
      default: return new MongoUserDataSourceImpl();
    }
  }
}
