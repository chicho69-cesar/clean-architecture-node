import { compareSync, hashSync } from 'bcryptjs';

/* Creamos nuestra clase adapter para la librería bcrypt */
export class BcryptAdapter {
  // Static method para hacer hashing de un valor
  public static hash(value: string): string {
    return hashSync(value, 10);
  }

  // Static method para comparar un valor con un hash
  public static compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
