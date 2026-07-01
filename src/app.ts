import { envs } from './config';
import { MongoDatabase } from './data/mongodb';
import { MySQLDatabase } from './data/mysql';
import { PostgresDatabase } from './data/postgresql';
import { AppRoutes } from './presentation/routes/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  /* 
    Nos conectamos a la base de datos dependiendo del valor de DB_TYPE en las variables de entorno.
  */
  switch (envs.DB_TYPE) {
    case 'postgres':
      await PostgresDatabase.connect({
        connectionString: envs.POSTGRES_URL!,
      });
      break;
    case 'mysql':
      await MySQLDatabase.connect({
        connectionString: envs.MYSQL_URL!,
      });
      break;
    default:
      await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME!,
        mongoUrl: envs.MONGO_URL!,
      });
      break;
  }

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
