import { Router } from 'express';
import { AuthRoutes } from '../auth/routes/auth.routes';
import { UserRoutes } from '../users/routes/users.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/users', UserRoutes.routes);

    return router;
  }
}
