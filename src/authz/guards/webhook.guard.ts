import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class WebhookGuard extends AuthGuard('jwt') {
  private logger = new Logger('webhookGuard');

  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log('context', context);
    return super.canActivate(context);
  }

  handleRequest(err, webhook, info) {
    if (err || !webhook) {
      this.logger.log(info);
      throw err || new UnauthorizedException();
    }
    this.logger.log('user is authorized ');
    return webhook;
  }
}
