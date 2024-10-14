import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import KindeService from './services/auth/kinde.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kindeService: KindeService,
  ) {}

  @Get('/home')
  async getHello(): Promise<string> {
    return 'hello home!';
  }

  @Get('/')
  async getUser(): Promise<any> {
    return this.kindeService.getUserData();
  }
}
