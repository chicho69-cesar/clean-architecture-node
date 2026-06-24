import type { LoginUserDto } from '../dtos/auth/login-user.dto';
import type { RegisterUserDto } from '../dtos/auth/register-user.dto';
import type { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  public abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
  public abstract logout(userId: string): Promise<void>;
  public abstract refreshToken(userId: string): Promise<string>;
  public abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
