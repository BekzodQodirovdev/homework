import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckParamMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Parametr ID kerak!' });
    }
    console.log(`Parametr ID: ${req.params.id}`);
    next();
  }
}
