import type { Request, Response } from 'express';
import { CustomError, UserRepository } from '../../../domain';

export class UsersController {
  public constructor(
    private readonly userRepository: UserRepository,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  public getAll = (req: Request, res: Response) => {
    this.userRepository.findAll()
      .then((users) => res.json(users))
      .catch((error) => this.handleError(error, res));
  }

  public getById = (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    this.userRepository.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
      })
      .catch((error) => this.handleError(error, res));
  }
}
