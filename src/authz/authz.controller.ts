import { Controller, Logger, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('authz')
export class AuthzController {
  private readonly logger: Logger = new Logger(AuthzController.name);
  @Post('access_request')
  handleAccessRequest(@Req() req: Request): string {
    return req.body;
  }
}
