import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { KindeClient } from './authz/kinde.client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kindeClient: KindeClient,
  ) {}

  @Get('/home')
  async getHello(): Promise<string> {
    return this.kindeClient.getAccessToken();
  }

  @Get('/')
  getUser(): string {
    return 'Hello World user!';
  }
}
