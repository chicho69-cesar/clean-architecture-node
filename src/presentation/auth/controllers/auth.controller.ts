import type { Request, Response } from 'express';
import { CustomError, LoginUser, LoginUserDto, LogoutUser, RefreshToken, RegisterUser, RegisterUserDto, type AuthRepository } from '../../../domain';

export class AuthController {
  public constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
  public loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.fromObject(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((userToken) => res.json(userToken))
      .catch((error) => this.handleError(error, res));
  }

  public registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.fromObject(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  }

  public logoutUser = (req: Request, res: Response) => {
    const user = req.body.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    new LogoutUser(this.authRepository)
      .execute(user.id)
      .then(() => res.json({ message: 'Logged out successfully' }))
      .catch((error) => this.handleError(error, res));
  }

  public refreshToken = (req: Request, res: Response) => {
    const user = req.body.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    new RefreshToken(this.authRepository)
      .execute(user.id)
      .then((userToken) => res.json(userToken))
      .catch((error) => this.handleError(error, res));
  }
}
