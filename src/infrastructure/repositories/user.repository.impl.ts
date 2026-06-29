import type { UserDataSource, UserEntity, UserRepository } from '../../domain/index';

export class UserRepositoryImpl implements UserRepository {
  public constructor(
    private readonly userDataSource: UserDataSource,
  ) {}

  public findAll(): Promise<UserEntity[]> {
    return this.userDataSource.findAll();
  }

  public findById(userId: string): Promise<UserEntity | null> {
    return this.userDataSource.findById(userId);
  }
}
