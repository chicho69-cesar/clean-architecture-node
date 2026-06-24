import type { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  public abstract findAll(): Promise<UserEntity[]>;
  public abstract findById(userId: string): Promise<UserEntity | null>;
}
