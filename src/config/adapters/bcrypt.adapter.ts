import { compareSync, hashSync } from 'bcryptjs';

export class BcryptAdapter {
  public static hash(value: string): string {
    return hashSync(value, 10);
  }

  public static compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
