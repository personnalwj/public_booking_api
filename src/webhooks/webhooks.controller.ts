import { Controller, Logger, Post, Req } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { Request } from 'express';

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('/kinde_access_request')
  async handleKindeAccessRequest(@Req() req: Request): Promise<any> {
    const event = await this.webhooksService.handleKindeAccessRequest(req.body);
    return event;
  }
}
