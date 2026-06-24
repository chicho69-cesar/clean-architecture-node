export class CustomError extends Error {
  public constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
  }

  public static badRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  public static unauthorized(message: string): CustomError {
    return new CustomError(401, message);
  }

  public static forbidden(message: string): CustomError {
    return new CustomError(403, message);
  }

  public static notFound(message: string): CustomError {
    return new CustomError(404, message);
  }

  public static internalServerError(message: string): CustomError {
    return new CustomError(500, message);
  }
}
