import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class AuthzGuard extends AuthGuard('jwt') {
  private logger = new Logger('auhtzGuard');

  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.log(info);
      throw err || new UnauthorizedException();
    }
    this.logger.log('user is authorized ');
    return user;
  }
}
