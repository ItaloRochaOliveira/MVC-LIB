import { type Request } from 'express';

export interface RequestPagination extends Request {
    pagination?: {
      init: number;
      limit: number;
    };
  }