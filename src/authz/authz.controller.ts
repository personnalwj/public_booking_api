import { Controller, Get, Req } from '@nestjs/common';

@Controller('/authz')
export class AppController {
  //   constructor(private readonly appService: AppService) {}

  @Get('/profile')
  getUser(@Req() req: Request): string {
    return 'Hello World user!';
  }
}
