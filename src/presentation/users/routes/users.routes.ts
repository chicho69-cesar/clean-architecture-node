import { Router } from 'express';
import { DataSourceFactory, UserRepositoryImpl } from '../../../infrastructure/index';
import { AuthMiddleware } from '../../auth/middlewares/auth.middleware';
import { UsersController } from '../controllers/users.controller';

export class UserRoutes {
  public static get routes(): Router {
    const routes = Router();

    const userDataSource = DataSourceFactory.getUserDataSource();
    const userRepository = new UserRepositoryImpl(userDataSource);
    const userController = new UsersController(userRepository);

    routes.post(
      '/',
      [AuthMiddleware.authenticate(userDataSource)],
      userController.getAll
    );
    routes.get(
      '/:id',
      [AuthMiddleware.authenticate(userDataSource)],
      userController.getById
    );

    return routes;
  }
}
