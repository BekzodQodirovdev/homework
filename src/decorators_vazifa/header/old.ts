import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'];
    if (!apiKey) {
      return res.status(401).json({ message: 'Header API kalit kerak!' });
    }
    console.log(`API Key: ${apiKey}`);
    next();
  }
}
