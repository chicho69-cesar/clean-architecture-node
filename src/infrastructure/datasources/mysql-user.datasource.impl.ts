import { UserModel } from '../../data/mysql';
import { CustomError, type CreateUserData, type UserDataSource, type UserEntity } from '../../domain';
import { UserMapper } from '../mappers/user.mapper';

export class MySQLUserDataSourceImpl implements UserDataSource {
  public async findById(userId: string): Promise<UserEntity | null> {
    const user = await UserModel.findByPk(userId);
    return user ? UserMapper.entityFromObject(user.toJSON()) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ where: { email } });
    return user ? UserMapper.entityFromObject(user.toJSON()) : null;
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await UserModel.findAll();
    return users.map(u => UserMapper.entityFromObject(u.toJSON()));
  }

  public async create(userData: CreateUserData): Promise<UserEntity> {
    try {
      const newUser = await UserModel.create({ ...userData, roles: ['USER_ROLE'] });
      return UserMapper.entityFromObject(newUser.toJSON());
    } catch (error) {
      throw CustomError.internalServerError('An error occurred while creating the user.');
    }
  }
}
