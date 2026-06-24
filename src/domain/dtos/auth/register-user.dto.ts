import { Validators } from '../../../config/index';

export class RegisterUserDto {
  public constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  public static fromObject(
    obj: { [key: string]: any; }
  ): [string | undefined, RegisterUserDto | undefined] {
    const {
      name,
      email,
      password
    } = obj as { name: string; email: string; password: string };

    if (!name) return ['Name is required', undefined];
    if (!email) return ['Email is required', undefined];
    if (!Validators.email.test(email)) return ['Invalid email format', undefined];
    if (!password) return ['Password is required', undefined];
    if (password.length < 6) return ['Password must be at least 6 characters long', undefined];

    return [
      undefined,
      new RegisterUserDto(name, email, password)
    ];
  }
}
