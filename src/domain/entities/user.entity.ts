export class UserEntity {
  public constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
  ) {}
}
