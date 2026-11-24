import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 1. Honour an id the caller already sent, or make one
    const id = (req.headers['x-request-id'] as string) ?? randomUUID();

    // 2. Attach it to the request so the Exception Filter can read it
    req.headers['x-request-id'] = id;

    // 3. Set it on the response so the client can quote it
    res.setHeader('x-request-id', id);

    // 4. ALWAYS call next()
    next();
  }
}
