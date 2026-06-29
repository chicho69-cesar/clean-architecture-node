import { eq } from 'drizzle-orm';
import { PostgresDatabase, usersTable } from '../../data/postgresql';
import { CustomError, type CreateUserData, type UserDataSource, type UserEntity } from '../../domain';
import { UserMapper } from '../mappers/user.mapper';

export class PostgresUserDataSourceImpl implements UserDataSource {
  public async findById(userId: string): Promise<UserEntity | null> {
    const [user] = await PostgresDatabase.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, parseInt(userId)));
    return user ? UserMapper.entityFromObject(user) : null;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const [user] = await PostgresDatabase.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return user ? UserMapper.entityFromObject(user) : null;
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await PostgresDatabase.db.select().from(usersTable);
    return users.map(UserMapper.entityFromObject);
  }

  public async create(userData: CreateUserData): Promise<UserEntity> {
    try {
      const [newUser] = await PostgresDatabase.db
        .insert(usersTable)
        .values({ ...userData, roles: ['USER_ROLE'] })
        .returning();
      return UserMapper.entityFromObject(newUser);
    } catch (error) {
      throw CustomError.internalServerError('An error occurred while creating the user.');
    }
  }
}
