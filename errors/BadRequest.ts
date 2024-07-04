import HttpError from './HttpError';
import { HttpStatus } from './HttpStatus';

export default class BadRequest extends HttpError {
  constructor(message: string = "Não foi possível encontrar o item.") {
    const statusCode = HttpStatus.BAD_REQUEST;
    super(statusCode, message);
  }
}
