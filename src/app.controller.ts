import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './decorators/user.decorator';
import { KeycloakGuard } from './authz/keycloak.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/home')
  @UseGuards(KeycloakGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/')
  getUser(): string {
    return 'Hello World user!';
  }
}
