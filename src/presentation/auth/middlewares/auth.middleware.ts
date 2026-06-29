import type { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../config';
import type { UserDataSource } from '../../../domain';

type VerifyToken = <T>(token: string) => Promise<T | null>;

export class AuthMiddleware {
  public static authenticate(
    userDataSource: UserDataSource,
    verifyToken: VerifyToken = JwtAdapter.verifyToken,
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.header('Authorization');

      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res
          .status(401)
          .json({ message: 'Unauthorized' });
      }

      const token = authorization.split(' ')[1] || '';

      try {
        const payload = await verifyToken<{ id: string }>(token);
        if (!payload) {
          return res
            .status(401)
            .json({ message: 'Unauthorized' });
        }

        const user = await userDataSource.findById(payload.id);
        if (!user) {
          return res
            .status(401)
            .json({ message: 'Unauthorized' });
        }

        req.body.user = user;
        return next();
      } catch (error) {
        console.error('Error during authentication:', error);
        return res
          .status(500)
          .json({ message: 'Internal Server Error' });
      }
    };
  }
}
