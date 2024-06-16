import { Request, Response, NextFunction, json } from 'express';
import { NestMiddleware } from '@nestjs/common';

/**
 * Custom middleware to handle invalid JSON payloads e.g webhook requests
 * https://github.com/nestjs/nest/issues/405#issuecomment-466807834
 */
export class BodyParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jsonparseMiddleware = json();
    jsonparseMiddleware(req, res, next);
  }
}
