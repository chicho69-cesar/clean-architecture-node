import { CustomError } from '../../errors/custom.errors';
import type { AuthRepository } from '../../repositories/auth.repository';

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface RefreshTokenUseCase {
  execute(userId: string): Promise<UserToken>;
}

export class RefreshToken implements RefreshTokenUseCase {
  public constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  public async execute(userId: string): Promise<UserToken> {
    const token = await this.authRepository.refreshToken(userId);

    if (!token) {
      throw CustomError.internalServerError('Error refreshing token');
    }

    return {
      token,
      user: {
        id: userId,
        name: '',
        email: '',
      },
    };
  }
}
