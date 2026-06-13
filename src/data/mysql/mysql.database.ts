import { Sequelize } from 'sequelize';
import { initUserModel } from './models/user.model';

interface MySQLOptions {
  connectionString: string;
}

export class MySQLDatabase {
  public static sequelize: Sequelize;

  public static async connect(options: MySQLOptions): Promise<boolean> {
    try {
      MySQLDatabase.sequelize = new Sequelize(options.connectionString, {
        dialect: 'mysql',
        logging: false,
      });
      initUserModel(MySQLDatabase.sequelize);
      await MySQLDatabase.sequelize.authenticate();
      await MySQLDatabase.sequelize.sync({ alter: true });
      console.log('Connected to MySQL');
      return true;
    } catch (error) {
      console.error('Error connecting to MySQL:', error);
      return false;
    }
  }
}
