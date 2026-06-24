import type { UserEntity } from '../entities/user.entity';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export abstract class UserDataSource {
  public abstract findById(userId: string): Promise<UserEntity | null>;
  public abstract findByEmail(email: string): Promise<UserEntity | null>;
  public abstract findAll(): Promise<UserEntity[]>;
  public abstract create(userData: CreateUserData): Promise<UserEntity>;
}
