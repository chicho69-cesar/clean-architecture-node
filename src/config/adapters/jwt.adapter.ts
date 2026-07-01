import jwt from 'jsonwebtoken';
import { envs } from './envs.adapter';

// Usamos el adaptador de envs para obtener la semilla de JWT
const JWT_SEED = envs.JWT_SEED;

/* Creamos una clase para una adaptador de json web tokens */
export class JwtAdapter {
  // Static method para generar un token con un payload y una duración opcional
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

  // Static method para verificar un token y obtener su payload decodificado
  public static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
