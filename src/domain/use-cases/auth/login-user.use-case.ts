import { JwtAdapter } from '../../../config/index';
import type { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { CustomError } from '../../errors/custom.errors';
import type { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

type SignToken = (payload: Object, duration?: string | any) => Promise<string | null>;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  public constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  public async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id }, '2h');

    if (!token) {
      throw CustomError.internalServerError('Error logging in user');
    }

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
