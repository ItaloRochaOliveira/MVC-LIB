import { HttpStatus } from './HttpStatus';
import HttpError from './HttpError';

export default class Unauthorized extends HttpError {
  constructor(message: string) {
    const statusCode = HttpStatus.UNAUTHORIZED;
    super(statusCode, message);
  }
}
