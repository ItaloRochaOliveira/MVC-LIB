import { type NextFunction, type Response } from 'express';
import { type RequestPagination} from './APITypes/IPRequesteInterface'

export default (req: RequestPagination, _res: Response, next: NextFunction): void => {
  const pageAsNumber = Number.parseInt(req.query.init as string, 10);
  const sizeAsNumber = Number.parseInt(req.query.limit as string, 10);

  let init = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    init = pageAsNumber;
  }

  let limit = 999;
  if (!Number.isNaN(sizeAsNumber) && !(sizeAsNumber < 1)) {
    limit = sizeAsNumber;
  }

  req.pagination = {
    init,
    limit,
  };

  next();
};
