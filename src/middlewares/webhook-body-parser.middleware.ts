import { Request, Response, NextFunction, text } from 'express';
import { NestMiddleware } from '@nestjs/common';

/**
 * Custom middleware to handle invalid JSON payloads e.g webhook requests
 * https://github.com/nestjs/nest/issues/405#issuecomment-466807834
 */
export class WebhookBodyParser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const parser = text({
      type: 'application/json',
    });
    parser(req, res, next);
  }
}
