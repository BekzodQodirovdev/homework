import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckQueryMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.query.token) {
      return res.status(400).json({ message: 'Query token kerak!' });
    }
    console.log(`Query Token: ${req.query.token}`);
    next();
  }
}
