import { Injectable, NestMiddleware, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidatorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { order, page, limit } = req.query;
    if (order) {
      if (+order !== 1 && +order !== -1) {
        return res.json({
          error: 'Order must have one of the following values: {-1, 1}',
        });
      }
    }
    next();
  }
}
