import { HttpStatus } from './HttpStatus';
import HttpError from './HttpError';

export default class Forbidden extends HttpError {
  constructor(message: string) {
    const statusCode = HttpStatus.FORBIDDEN;
    super(statusCode, message);
  }
}
