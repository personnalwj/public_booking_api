import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('/authz')
export class AppController {
  //   constructor(private readonly appService: AppService) {}

  @Get('/callback')
  getUser(@Req() req: Request): string {
    console.log('******* request header *********\n', req.headers);
    return 'Hello World user!';
  }
}
