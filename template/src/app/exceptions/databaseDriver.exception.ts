export default class DatabaseDriverException extends Error {
  public statusCode: number;

  constructor(message: string = 'Database driver not found', statusCode: number = 404) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}