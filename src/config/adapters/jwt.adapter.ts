import jwt from 'jsonwebtoken';
import { envs } from './envs.adapter';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  public static async generateToken(
    payload: Object,
    duration: jwt.SignOptions['expiresIn'] = '2h'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) resolve(null);
        resolve(token!);
      });
    });
  }

  public static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
