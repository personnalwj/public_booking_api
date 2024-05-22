import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { WebhookBodyParser } from 'src/middlewares/webhook-body-parser.middleware';

@Module({
  controllers: [WebhooksController],
  providers: [WebhooksService],
})
export class WebhooksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WebhookBodyParser).forRoutes('*');
  }
}
