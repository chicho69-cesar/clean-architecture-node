import { Router } from 'express';
import { AuthDataSourceImpl, AuthRepositoryImpl, DataSourceFactory } from '../../../infrastructure/index';
import { AuthController } from '../controllers/auth.controller';

export class AuthRoutes {
  public static get routes(): Router {
    const routes = Router();

    const userDataSource = DataSourceFactory.getUserDataSource();
    const authDataSource = new AuthDataSourceImpl(userDataSource);

    const authRepository = new AuthRepositoryImpl(authDataSource);

    const authController = new AuthController(authRepository);

    routes.post('/login', authController.loginUser);
    routes.post('/register', authController.registerUser);
    routes.post('/logout', authController.logoutUser);
    routes.post('/refresh-token', authController.refreshToken);

    return routes;
  }
}
