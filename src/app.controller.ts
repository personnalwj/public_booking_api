import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthzGuard } from './authz/guards/authz.guard';
import { PermissionsGuard } from './authz/guards/permisions.guard';
import { Permissions } from './authz/decorators/permissions.decorators';
import KindeService from './services/kinde/kinde.service';
import MailerSendClient from './services/mailersend/mailersend.client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kindeService: KindeService,
  ) {}

  @Get('/home')
  @Permissions(['congregation:read'])
  @UseGuards(AuthzGuard, PermissionsGuard)
  async getHello(): Promise<string> {
    return 'hello home!';
  }

  @Get('/')
  async getUser(): Promise<any> {
    return 'Hello World!';
  }
}
