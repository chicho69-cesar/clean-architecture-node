import type { AuthRepository } from '../../repositories/auth.repository';

interface LogoutUserUseCase {
  execute(userId: string): Promise<void>;
}

export class LogoutUser implements LogoutUserUseCase {
  public constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  public async execute(userId: string): Promise<void> {
    await this.authRepository.logout(userId);
  }
}
