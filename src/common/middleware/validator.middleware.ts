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

    if (page) {
      if (+page < 1) {
        return res.json({ error: 'Page value must be at least 1' });
      }
    }

    if (limit) {
      if (+limit < 5 || +limit > 20) {
        return res.json({ error: 'Limit must be in interval of [5, 20]' });
      }
    }

    next();
  }
}
