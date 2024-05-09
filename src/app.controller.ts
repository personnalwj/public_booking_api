import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { KindeClient } from './authz/kinde.client';
import { AuthzGuard } from './authz/guards/authz.guard';
import { PermissionsGuard } from './authz/guards/permisions.guard';
import { Permissions } from './authz/decorators/permissions.decorators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kindeClient: KindeClient,
  ) {}

  @Get('/home')
  @Permissions(['congregation:read'])
  @UseGuards(AuthzGuard, PermissionsGuard)
  async getHello(): Promise<string> {
    return 'hello home!';
  }

  @Get('/')
  getUser(): string {
    return 'Hello World user!';
  }
}
