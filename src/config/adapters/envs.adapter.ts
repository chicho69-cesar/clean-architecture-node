import 'dotenv/config';
import { get } from 'env-var';

/* Adaptador para las variables de entorno usando la librería env-var, para acceder a las envs
solo necesitaremos acceder a las keys de este objeto */
export const envs = {
  PORT: get('PORT')
    .required()
    .asPortNumber(),

  DB_TYPE: get('DB_TYPE')
    .default('mongo')
    .asEnum(['mongo', 'postgres', 'mysql']),

  MONGO_URL: get('MONGO_URL').asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').asString(),

  POSTGRES_URL: get('POSTGRES_URL').asString(),

  MYSQL_URL: get('MYSQL_URL').asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),
};
