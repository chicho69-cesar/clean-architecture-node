import { BcryptAdapter, JwtAdapter } from '../../config/index';
import {
  CustomError,
  type AuthDataSource,
  type LoginUserDto,
  type RegisterUserDto,
  type UserDataSource,
  type UserEntity,
} from '../../domain/index';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;
type SignToken = (
  payload: Object,
  duration?: Parameters<typeof JwtAdapter.generateToken>[1],
) => Promise<string | null>;

export class AuthDataSourceImpl implements AuthDataSource {
  public constructor(
    private readonly userDataSource: UserDataSource,
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  public async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userDataSource.findByEmail(email);
      if (!user) {
        throw CustomError.badRequest('Invalid email or password');
      }

      const matching = this.comparePassword(password, user.password);
      if (!matching) {
        throw CustomError.badRequest('Invalid email or password');
      }

      return user;
    } catch (error) {
      console.error('Error during login:', error);
      throw CustomError.internalServerError('An error occurred during login. Please try again later.');
    }
  }

  public async logout(userId: string): Promise<void> {
    try {
      const user = await this.userDataSource.findById(userId);
      if (!user) {
        throw CustomError.badRequest('User not found');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      throw CustomError.internalServerError('An error occurred during logout. Please try again later.');
    }
  }

  public async refreshToken(userId: string): Promise<string> {
    try {
      const user = await this.userDataSource.findById(userId);
      if (!user) {
        throw CustomError.badRequest('User not found');
      }

      const token = await this.signToken({ id: user.id }, '2h');
      if (!token) {
        throw CustomError.internalServerError('Error refreshing token');
      }

      return token;
    } catch (error) {
      console.error('Error during token refresh:', error);
      throw CustomError.internalServerError('An error occurred during token refresh. Please try again later.');
    }
  }

  public async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const alreadyExists = await this.userDataSource.findByEmail(email);
      if (alreadyExists) {
        throw CustomError.badRequest('Email is already in use');
      }

      return await this.userDataSource.create({
        name,
        email,
        password: this.hashPassword(password),
      });
    } catch (error) {
      console.error('Error during registration:', error);
      throw CustomError.internalServerError('An error occurred during registration. Please try again later.');
    }
  }
}
