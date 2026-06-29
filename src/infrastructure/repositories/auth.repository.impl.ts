import type { AuthDataSource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain/index';

export class AuthRepositoryImpl implements AuthRepository {
  public constructor(
    private readonly authDataSource: AuthDataSource,
  ) {}

  public login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDataSource.login(loginUserDto);
  }

  public logout(userId: string): Promise<void> {
    return this.authDataSource.logout(userId);
  }

  public refreshToken(userId: string): Promise<string> {
    return this.authDataSource.refreshToken(userId);
  }

  public register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDto);
  }
}
