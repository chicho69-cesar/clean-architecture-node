import { userModel } from '../../data/mongodb/index';
import { CustomError, type CreateUserData, type UserDataSource, type UserEntity } from '../../domain/index';
import { UserMapper } from '../mappers/user.mapper';

export class MongoUserDataSourceImpl implements UserDataSource {
  public async findById(userId: string): Promise<UserEntity | null> {
    const user = await userModel.findById(userId);
    if (!user) {
      return null;
    }

    return UserMapper.entityFromObject(user);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await userModel.findOne({ email });
    if (!user) {
      return null;
    }

    return UserMapper.entityFromObject(user);
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await userModel.find();
    return users.map(UserMapper.entityFromObject);
  }

  public async create(userData: CreateUserData): Promise<UserEntity> {
    try {
      const newUser = await userModel.create(userData);
      await newUser.save();

      return UserMapper.entityFromObject(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw CustomError.internalServerError('An error occurred while creating the user.');
    }
  }
}
