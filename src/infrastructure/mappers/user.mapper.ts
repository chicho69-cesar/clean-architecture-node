import { CustomError, UserEntity } from '../../domain/index';

export class UserMapper {
  public static entityFromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password, roles } = object;

    const entityId = (_id ?? id)?.toString();

    if (!entityId) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!email) throw CustomError.badRequest('Missing email');
    if (!password) throw CustomError.badRequest('Missing password');
    if (!roles) throw CustomError.badRequest('Missing roles');

    return new UserEntity(entityId, name, email, password, roles);
  }
}
